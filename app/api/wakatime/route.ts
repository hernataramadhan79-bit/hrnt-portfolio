import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const revalidate = 3600;

// Server-side in-memory cache (10 menit) untuk mencegah spam ke WakaTime API
let serverCache: { data: any; timestamp: number } | null = null;
const SERVER_CACHE_TTL = 10 * 60 * 1000;

export async function GET(request: Request) {
    const ip = getClientIp(request);
    const { allowed, retryAfter } = checkRateLimit(ip);

    // Jika ada cache server yang valid, sajikan langsung bahkan jika rate limit client tercapai
    const now = Date.now();
    if (serverCache && (now - serverCache.timestamp < SERVER_CACHE_TTL)) {
        return NextResponse.json(serverCache.data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'X-Cache-Status': 'HIT'
            }
        });
    }

    if (!allowed) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, {
            status: 429,
            headers: { 'Retry-After': String(retryAfter) },
        });
    }

    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
        return NextResponse.json({
            languages: [
                { name: 'TypeScript', percent: 46.5, color: '#3178C6' },
                { name: 'React', percent: 26.2, color: '#61DAFB' },
                { name: 'Next.js', percent: 15.8, color: '#FFFFFF' },
                { name: 'Tailwind CSS', percent: 11.5, color: '#38B2AC' }
            ],
            totalTime: '248h 30m',
            dailyAverage: '3h 45m',
            bestDay: '7h 12m on Oct 14',
            optimizationFactor: '+18%',
            isLoaded: true
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'X-Fallback': 'true'
            }
        });
    }

    const encodedKey = Buffer.from(`${apiKey}:`).toString('base64');
    const authHeader = {
        'Authorization': `Basic ${encodedKey}`,
        'Accept': 'application/json'
    };

    try {
        const allTimeRes = await fetch(
            'https://wakatime.com/api/v1/users/current/all_time_since_today',
            { headers: authHeader, next: { revalidate: 3600 } }
        );

        const tzOffsetMs = 7 * 60 * 60 * 1000;
        const nowWIB = new Date(Date.now() + tzOffsetMs);
        const endStr = nowWIB.toISOString().split('T')[0];
        const startStr = new Date(nowWIB.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const summaryRes = await fetch(
            `https://wakatime.com/api/v1/users/current/summaries?start=${startStr}&end=${endStr}&timezone=Asia%2FJakarta`,
            { headers: authHeader, next: { revalidate: 3600 } }
        );

        const prevEnd = new Date(nowWIB.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const prevStart = new Date(nowWIB.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const prevRes = await fetch(
            `https://wakatime.com/api/v1/users/current/summaries?start=${prevStart}&end=${prevEnd}&timezone=Asia%2FJakarta`,
            { headers: authHeader, next: { revalidate: 3600 } }
        );

        let allTimeTotalText = '';
        if (allTimeRes.ok) {
            const allTimeData = await allTimeRes.json();
            const d = allTimeData?.data;
            if (d && (d.total_seconds || 0) > 0) {
                allTimeTotalText = d.text || d.human_readable_total || '';
            }
        }

        let dailyAverageText = '0 mins';
        let bestDayText = 'N/A';
        let currentWeekSeconds = 0;
        const languagesMap: { [key: string]: { name: string; total_seconds: number } } = {};
        let langTotalSeconds = 0;

        let totalTimeText = allTimeTotalText;

        if (summaryRes.ok) {
            const summaryData = await summaryRes.json();
            const summaries: any[] = summaryData.data || [];

            dailyAverageText =
                summaryData.daily_average?.text_including_other_language ||
                summaryData.daily_average?.text ||
                '0 mins';

            currentWeekSeconds = summaryData.cumulative_total?.seconds || 0;

            if (!totalTimeText && summaryData.cumulative_total?.text) {
                totalTimeText = summaryData.cumulative_total.text + ' (7d)';
            }

            let bestDaySeconds = 0;
            summaries.forEach((day: any) => {
                const dayTotal: number = day?.grand_total?.total_seconds || 0;
                if (dayTotal > bestDaySeconds) {
                    bestDaySeconds = dayTotal;
                    const dateLabel = new Date(day.range?.date || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    bestDayText = `${day.grand_total?.text || ''} on ${dateLabel}`;
                }

                (day.languages || []).forEach((lang: any) => {
                    if (!languagesMap[lang.name]) {
                        languagesMap[lang.name] = { name: lang.name, total_seconds: 0 };
                    }
                    languagesMap[lang.name].total_seconds += lang.total_seconds || 0;
                    langTotalSeconds += lang.total_seconds || 0;
                });
            });
        } else {
            console.error('WakaTime summary failed:', summaryRes.status);
        }

        if (!totalTimeText) totalTimeText = '0 mins';

        let growthFactor = '+0%';
        if (prevRes.ok) {
            const prevData = await prevRes.json();
            const prevWeekSeconds: number = prevData?.cumulative_total?.seconds || 0;

            if (prevWeekSeconds > 0 && currentWeekSeconds > 0) {
                const growth = Math.round(((currentWeekSeconds - prevWeekSeconds) / prevWeekSeconds) * 100);
                growthFactor = (growth >= 0 ? '+' : '') + growth + '%';
            } else if (currentWeekSeconds > 0) {
                growthFactor = '+100%';
            }
        }

        const languages = Object.values(languagesMap)
            .sort((a, b) => b.total_seconds - a.total_seconds)
            .slice(0, 8)
            .map(lang => ({
                name: lang.name,
                percent: langTotalSeconds > 0
                    ? parseFloat(((lang.total_seconds / langTotalSeconds) * 100).toFixed(1))
                    : 0,
                color: getLanguageColor(lang.name)
            }));

        const cleanText = (text: string) =>
            text
                .replace(/ hours?/g, 'h')
                .replace(/ mins?/g, 'm')
                .replace(/ secs?/g, 's')
                .replace(/ hrs?/g, 'h');

        console.log('WakaTime OK | total:', totalTimeText, '| avg:', dailyAverageText, '| best:', bestDayText, '| growth:', growthFactor);

        const responseData = {
            languages,
            totalTime: cleanText(totalTimeText),
            dailyAverage: cleanText(dailyAverageText),
            bestDay: bestDayText,
            optimizationFactor: growthFactor,
            isLoaded: true
        };

        // Simpan ke in-memory server cache
        serverCache = {
            data: responseData,
            timestamp: Date.now()
        };

        return NextResponse.json(responseData, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'X-Cache-Status': 'MISS'
            }
        });

    } catch (error: any) {
        console.error('WakaTime route error:', error?.message || error);
        if (serverCache) {
            return NextResponse.json(serverCache.data, {
                headers: { 'X-Cache-Status': 'STALE-FALLBACK' }
            });
        }
        return NextResponse.json({
            languages: [],
            totalTime: '0h 0m',
            dailyAverage: '0h 0m',
            bestDay: 'N/A',
            optimizationFactor: '+0%',
            isLoaded: true,
            error: error?.message || 'Unknown error'
        });
    }
}

function getLanguageColor(name: string): string {
    const colors: { [key: string]: string } = {
        'TypeScript': '#3178C6',
        'TSX': '#3178C6',
        'JavaScript': '#F7DF1E',
        'JSX': '#F7DF1E',
        'HTML': '#E34F26',
        'CSS': '#1572B6',
        'SCSS': '#CC6699',
        'Tailwind CSS': '#38B2AC',
        'Tailwind': '#38B2AC',
        'Node.js': '#339933',
        'Python': '#3776AB',
        'PHP': '#777BB4',
        'Vue.js': '#4FC08D',
        'Vue': '#4FC08D',
        'Next.js': '#FFFFFF',
        'PostgreSQL': '#336791',
        'SQL': '#336791',
        'Docker': '#2496ED',
        'Git': '#F05032',
        'Bash': '#4EAA25',
        'Shell Script': '#4EAA25',
        'Markdown': '#083fa1',
        'JSON': '#5b9bd5',
        'YAML': '#cb171e',
        'Other': '#94a3b8'
    };
    return colors[name] || '#94a3b8';
}