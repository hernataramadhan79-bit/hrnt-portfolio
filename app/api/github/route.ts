import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const revalidate = 3600;

export async function GET(request: Request) {
    const ip = getClientIp(request);
    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, {
            status: 429,
            headers: { 'Retry-After': String(retryAfter) },
        });
    }

    const token = process.env.GITHUB_TOKEN;
    const username = 'hernataramadhan79-bit';

    if (!token) {
        return NextResponse.json({ error: 'GitHub token missing' }, { status: 500 });
    }

    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 12000);

        const fetchOptions: RequestInit = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-App'
            },
            signal: controller.signal,
            next: { revalidate: 3600 }
        };

        let userData: any = {};
        let repos: any[] = [];
        let contribData: any = {};

        try {
            const userRes = await fetch(`https://api.github.com/users/${username}`, fetchOptions);
            if (userRes.ok) userData = await userRes.json();
        } catch (e) {
            console.error('GitHub profile fetch failed:', e);
        }

        try {
            const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, fetchOptions);
            if (repoRes.ok) repos = await repoRes.json();
        } catch (e) {
            console.error('GitHub repos fetch failed:', e);
        }

        const from = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
        const to = new Date().toISOString();

        try {
            const contribRes = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Portfolio-App'
                },
                body: JSON.stringify({
                    query: `query ($login: String!, $from: DateTime!, $to: DateTime!) {
                        user(login: $login) {
                            contributionsCollection(from: $from, to: $to) {
                                contributionCalendar {
                                    totalContributions
                                    weeks {
                                        contributionDays {
                                            date
                                            contributionCount
                                        }
                                    }
                                }
                            }
                        }
                    }`,
                    variables: { login: username, from, to }
                }),
                signal: controller.signal,
                next: { revalidate: 3600 }
            });
            if (contribRes.ok) {
                const contribJson = await contribRes.json();
                const calendar = contribJson?.data?.user?.contributionsCollection?.contributionCalendar;
                if (calendar) {
                    contribData = {
                        totalContributions: calendar.totalContributions || 0,
                        contributions: (calendar.weeks || []).map((week: any) =>
                            (week.contributionDays || []).map((day: any) => ({
                                date: day.date,
                                count: day.contributionCount || 0
                            }))
                        )
                    };
                }
            }
        } catch (e) {
            console.error('GitHub contributions fetch failed:', e);
        }

        clearTimeout(id);

        let totalStars = 0;
        let topRepos: any[] = [];

        if (Array.isArray(repos)) {
            totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
            topRepos = [...repos]
                .sort((a, b) => {
                    const scoreA = (a.stargazers_count || 0) + (a.forks_count || 0);
                    const scoreB = (b.stargazers_count || 0) + (b.forks_count || 0);
                    if (scoreB !== scoreA) return scoreB - scoreA;
                    return new Date(b.pushed_at || b.updated_at || 0).getTime() -
                           new Date(a.pushed_at || a.updated_at || 0).getTime();
                })
                .slice(0, 10)
                .map(r => ({
                    id: r.id,
                    name: r.name,
                    html_url: r.html_url,
                    description: r.description,
                    language: r.language,
                    stargazers_count: r.stargazers_count || 0,
                    forks_count: r.forks_count || 0,
                    pushed_at: r.pushed_at
                }));
        }

        return NextResponse.json({
            profile: {
                repos: userData.public_repos || 0,
                followers: userData.followers || 0,
                totalContributions: contribData?.totalContributions || 0,
                stars: totalStars,
            },
            topRepos,
            contributions: contribData?.contributions || []
        });

    } catch (error: any) {
        console.error('GitHub API route error:', error);
        return NextResponse.json({
            error: 'Failed to fetch GitHub data',
            details: error.message
        }, { status: 500 });
    }
}