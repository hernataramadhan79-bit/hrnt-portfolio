import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.UMAMI_API_KEY?.trim();
    const websiteId = process.env.UMAMI_WEBSITE_ID?.trim();

    if (!apiKey || !websiteId) {
        console.error('Umami env missing:', { hasKey: !!apiKey, hasId: !!websiteId });
        return NextResponse.json({ error: 'Umami configuration missing' }, { status: 500 });
    }

    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 12000);

        // Get all-time stats (from year 2020 to now) to match dashboard summary
        const startAt = new Date('2020-01-01').getTime();
        const endAt = Date.now();

        let stats = null;
        try {
            const statsRes = await fetch(
                `https://api.umami.is/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}&unit=day`,
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Accept': 'application/json'
                    },
                    signal: controller.signal,
                    next: { revalidate: 300 }
                }
            );
            if (statsRes.ok) {
                stats = await statsRes.json();
            } else {
                const errBody = await statsRes.text();
                console.error(`Umami stats API error: ${statsRes.status} (ID: ${websiteId.substring(0, 8)}...) - ${errBody}`);
            }
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
                    activeCount = activeData[0].x ?? activeData[0] ?? 0;
                } else if (activeData && typeof activeData === 'object' && 'x' in activeData) {
                    activeCount = activeData.x || 0;
                } else if (typeof activeData === 'number') {
                    activeCount = activeData;
                }
            }
        } catch (e) {
            console.error('Umami active fetch failed:', e);
        }

        clearTimeout(id);

        return NextResponse.json({
            stats,
            active: Number(activeCount) || 0
        });
    } catch (error: any) {
        console.error('Umami route full crash:', error);
        return NextResponse.json({
            error: 'Failed to fetch Umami stats',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
