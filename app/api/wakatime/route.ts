import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
        return NextResponse.json({
            error: 'WakaTime API key missing.'
        }, { status: 500 });
    }

    const encodedKey = Buffer.from(`${apiKey}:`).toString('base64');
    const authHeader = {
        'Authorization': `Basic ${encodedKey}`,
        'Accept': 'application/json'
    };

    try {
        // === 1. All-Time Stats ===
        const allTimeRes = await fetch(
            'https://wakatime.com/api/v1/users/current/all_time_since_today',
            { headers: authHeader, cache: 'no-store' }
        );

        // === 2. Last 7 Days Summary ===
        // Use WIB (UTC+7) timezone-aware dates to match WakaTime dashboard
        const tzOffsetMs = 7 * 60 * 60 * 1000; // UTC+7 (WIB)
        const nowWIB = new Date(Date.now() + tzOffsetMs);
        const endStr = nowWIB.toISOString().split('T')[0];
        const startStr = new Date(nowWIB.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const summaryRes = await fetch(
            `https://wakatime.com/api/v1/users/current/summaries?start=${startStr}&end=${endStr}&timezone=Asia%2FJakarta`,
            { headers: authHeader, cache: 'no-store' }
        );

        // === 3. Previous 7 Days (for growth) ===
        const prevEnd = new Date(nowWIB.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const prevStart = new Date(nowWIB.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const prevRes = await fetch(
            `https://wakatime.com/api/v1/users/current/summaries?start=${prevStart}&end=${prevEnd}&timezone=Asia%2FJakarta`,
            { headers: authHeader, cache: 'no-store' }
        );


        // --- Parse All-Time (optional, may return 0 while WakaTime is "calculating") ---
        let allTimeTotalText = '';
        if (allTimeRes.ok) {
            const allTimeData = await allTimeRes.json();
            const d = allTimeData?.data;
            // Only use if WakaTime is not still calculating
            if (d && (d.total_seconds || 0) > 0) {
                allTimeTotalText = d.text || d.human_readable_total || '';
            }
        }

        // --- Parse 7-Day Summary ---
        let dailyAverageText = '0 mins';
        let bestDayText = 'N/A';
        let currentWeekSeconds = 0;
        const languagesMap: { [key: string]: { name: string; total_seconds: number } } = {};
        let langTotalSeconds = 0;

        // Total time: prefer all_time if available, fallback to 7-day cumulative
        let totalTimeText = allTimeTotalText;

        if (summaryRes.ok) {
            const summaryData = await summaryRes.json();
            const summaries: any[] = summaryData.data || [];

            // Daily average from WakaTime's own calculation
            dailyAverageText =
                summaryData.daily_average?.text_including_other_language ||
                summaryData.daily_average?.text ||
                '0 mins';

            // Use cumulative_total from summary
            currentWeekSeconds = summaryData.cumulative_total?.seconds || 0;

            // If all_time is not available (still calculating), use 7-day cumulative as total
            if (!totalTimeText && summaryData.cumulative_total?.text) {
                totalTimeText = summaryData.cumulative_total.text + ' (7d)';
            }

            // Find best day & accumulate languages
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

        // --- Parse Previous Week ---
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

        // --- Build Languages Array ---
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

        // --- Format helper ---
        const cleanText = (text: string) =>
            text
                .replace(/ hours?/g, 'h')
                .replace(/ mins?/g, 'm')
                .replace(/ secs?/g, 's')
                .replace(/ hrs?/g, 'h');

        console.log('WakaTime OK | total:', totalTimeText, '| avg:', dailyAverageText, '| best:', bestDayText, '| growth:', growthFactor);

        return NextResponse.json({
            languages,
            totalTime: cleanText(totalTimeText),
            dailyAverage: cleanText(dailyAverageText),
            bestDay: bestDayText,
            optimizationFactor: growthFactor,
            isLoaded: true
        });

    } catch (error: any) {
        console.error('WakaTime route error:', error?.message || error);
        return NextResponse.json({ error: 'Internal sync error: ' + (error?.message || 'unknown') }, { status: 500 });
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
