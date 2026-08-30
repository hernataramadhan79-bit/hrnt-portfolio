import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const revalidate = 3600;

// Server-side in-memory cache (15 menit) untuk mencegah rate limit ke WakaTime API
let serverCache: { data: any; timestamp: number } | null = null;
const SERVER_CACHE_TTL = 15 * 60 * 1000;

// Verified real fallback data dari WakaTime akun resmi hernataramadhan79-bit
const FALLBACK_WAKATIME_DATA = {
    languages: [
        { name: 'TypeScript', percent: 60.0, color: '#3178C6' },
        { name: 'Python', percent: 12.9, color: '#3776AB' },
        { name: 'Markdown', percent: 10.2, color: '#083fa1' },
        { name: 'Bash', percent: 6.5, color: '#4EAA25' },
        { name: 'GLSL', percent: 3.2, color: '#5B4F96' },
        { name: 'CSS', percent: 2.9, color: '#1572B6' },
        { name: 'JSON', percent: 2.2, color: '#5b9bd5' },
        { name: 'SQL', percent: 2.1, color: '#336791' },
    ],
    totalTime: '71h 4m',
    dailyAverage: '1h 43m',
    bestDay: '8 hrs 11 mins on Mar 8, 2026',
    optimizationFactor: '+0%',
    isLoaded: true
};

export async function GET(request: Request) {
    const ip = getClientIp(request);
    const { allowed, retryAfter } = checkRateLimit(ip);

    // Sajikan dari cache server jika masih valid (< 15 menit)
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
        if (serverCache) {
            return NextResponse.json(serverCache.data, {
                headers: { 'X-Cache-Status': 'STALE-RATE-LIMITED' }
            });
        }
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, {
            status: 429,
            headers: { 'Retry-After': String(retryAfter) },
        });
    }

    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
        return NextResponse.json(FALLBACK_WAKATIME_DATA, {
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
        const tzOffsetMs = 7 * 60 * 60 * 1000;
        const nowWIB = new Date(Date.now() + tzOffsetMs);
        const endStr = nowWIB.toISOString().split('T')[0];
        const startStr = new Date(nowWIB.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const prevEnd = new Date(nowWIB.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const prevStart = new Date(nowWIB.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        // Fetch all_time_since_today, stats/all_time, and recent summaries in parallel
        const [allTimeRes, statsRes, summaryRes, prevRes] = await Promise.all([
            fetch('https://wakatime.com/api/v1/users/current/all_time_since_today', {
                headers: authHeader,
                next: { revalidate: 3600 }
            }).catch(() => null),
            fetch('https://wakatime.com/api/v1/users/current/stats/all_time', {
                headers: authHeader,
                next: { revalidate: 3600 }
            }).catch(() => null),
            fetch(`https://wakatime.com/api/v1/users/current/summaries?start=${startStr}&end=${endStr}&timezone=Asia%2FJakarta`, {
                headers: authHeader,
                next: { revalidate: 3600 }
            }).catch(() => null),
            fetch(`https://wakatime.com/api/v1/users/current/summaries?start=${prevStart}&end=${prevEnd}&timezone=Asia%2FJakarta`, {
                headers: authHeader,
                next: { revalidate: 3600 }
            }).catch(() => null)
        ]);

        let totalTimeText = '71h 4m';
        let dailyAverageText = '1h 43m';
        let bestDayText = '8 hrs 11 mins on Mar 8, 2026';
        let rawLanguages: any[] = [];

        // 1. Ambil All-Time Stats komprehensif
        if (statsRes && statsRes.ok) {
            const statsData = await statsRes.json();
            const d = statsData?.data;
            if (d) {
                if (d.human_readable_total) totalTimeText = d.human_readable_total;
                if (d.human_readable_daily_average) dailyAverageText = d.human_readable_daily_average;
                if (d.best_day?.text) {
                    const dateObj = d.best_day.date ? new Date(d.best_day.date) : null;
                    const dateLabel = dateObj && !isNaN(dateObj.getTime())
                        ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : d.best_day.date || '';
                    bestDayText = `${d.best_day.text} on ${dateLabel}`;
                }
                if (Array.isArray(d.languages) && d.languages.length > 0) {
                    rawLanguages = d.languages;
                }
            }
        }

        // 2. Jika all_time_since_today memiliki angka jam lebih mutakhir, pakai itu untuk total
        if (allTimeRes && allTimeRes.ok) {
            const allTimeData = await allTimeRes.json();
            const d = allTimeData?.data;
            if (d && (d.total_seconds || 0) > 0 && d.text) {
                totalTimeText = d.text;
            }
        }

        // 3. Hitung pertumbuhan mingguan dari summary
        let currentWeekSeconds = 0;
        if (summaryRes && summaryRes.ok) {
            const summaryData = await summaryRes.json();
            currentWeekSeconds = summaryData?.cumulative_total?.seconds || 0;
        }

        let growthFactor = '+0%';
        if (prevRes && prevRes.ok) {
            const prevData = await prevRes.json();
            const prevWeekSeconds: number = prevData?.cumulative_total?.seconds || 0;
            if (prevWeekSeconds > 0 && currentWeekSeconds > 0) {
                const growth = Math.round(((currentWeekSeconds - prevWeekSeconds) / prevWeekSeconds) * 100);
                growthFactor = (growth >= 0 ? '+' : '') + growth + '%';
            } else if (currentWeekSeconds > 0) {
                growthFactor = '+100%';
            }
        }

        // 4. Filter bahasa pemrograman riil (hilangkan noise seperti Git Config, Text, INI, Roff, SVG)
        const ignoredLanguages = new Set([
            'Git Config',
            'Text',
            'INI',
            'Roff',
            'Image (svg)',
            'Java Properties',
            'V shell',
            'Batchfile',
            'Other'
        ]);

        let filteredLangs = rawLanguages.filter(l => !ignoredLanguages.has(l.name));
        if (filteredLangs.length === 0) {
            filteredLangs = FALLBACK_WAKATIME_DATA.languages;
        }

        const topLanguages = filteredLangs.slice(0, 8);
        const totalCodeSeconds = topLanguages.reduce((acc, l) => acc + (l.total_seconds || l.percent || 0), 0);

        const languages = topLanguages.map(lang => {
            const val = lang.total_seconds || lang.percent || 0;
            const percent = totalCodeSeconds > 0
                ? parseFloat(((val / totalCodeSeconds) * 100).toFixed(1))
                : (lang.percent || 0);
            return {
                name: lang.name,
                percent,
                color: getLanguageColor(lang.name)
            };
        });

        const cleanText = (text: string) =>
            text
                .replace(/ hours?/g, 'h')
                .replace(/ mins?/g, 'm')
                .replace(/ secs?/g, 's')
                .replace(/ hrs?/g, 'h');

        const responseData = {
            languages: languages.length > 0 ? languages : FALLBACK_WAKATIME_DATA.languages,
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
        return NextResponse.json(FALLBACK_WAKATIME_DATA, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'X-Fallback': 'true'
            }
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
        'GLSL': '#5B4F96',
        'Svelte': '#FF3E00',
        'C++': '#00599C',
        'Rust': '#dea584',
        'Other': '#94a3b8'
    };
    return colors[name] || '#94a3b8';
}