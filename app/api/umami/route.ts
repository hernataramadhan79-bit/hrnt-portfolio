import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.UMAMI_API_KEY;
    const websiteId = process.env.UMAMI_WEBSITE_ID;

    if (!apiKey || !websiteId) {
        return NextResponse.json({ error: 'Umami configuration missing' }, { status: 500 });
    }

    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 12000);

        // Get stats for the last 24 hours
        const now = Date.now();
        const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

        let stats = null;
        try {
            const statsRes = await fetch(
                `https://api.umami.is/v1/websites/${websiteId}/stats?startAt=${twentyFourHoursAgo}&endAt=${now}`,
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Accept': 'application/json'
                    },
                    signal: controller.signal,
                    next: { revalidate: 300 }
                }
            );
            if (statsRes.ok) stats = await statsRes.json();
        } catch (e) {
            console.error('Umami stats fetch failed:', e);
        }

        let activeCount = 0;
        try {
            const activeRes = await fetch(
                `https://api.umami.is/v1/websites/${websiteId}/active`,
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Accept': 'application/json'
                    },
                    signal: controller.signal
                }
            );

            if (activeRes.ok) {
                const activeData = await activeRes.json();
                if (Array.isArray(activeData) && activeData.length > 0) {
                    activeCount = activeData[0].x || 0;
                } else if (activeData && typeof activeData === 'object' && 'x' in activeData) {
                    activeCount = activeData.x || 0;
                }
            }
        } catch (e) {
            console.error('Umami active fetch failed:', e);
        }

        clearTimeout(id);

        return NextResponse.json({
            stats,
            active: activeCount
        });
    } catch (error: any) {
        console.error('Umami fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch Umami stats', details: error.message }, { status: 500 });
    }
}
