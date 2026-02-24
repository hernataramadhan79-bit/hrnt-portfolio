import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const username = 'hernataramadhan79-bit'; // From Library.tsx constant

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

        // 1. Fetch User Profile
        try {
            const userRes = await fetch(`https://api.github.com/users/${username}`, fetchOptions);
            if (userRes.ok) userData = await userRes.json();
        } catch (e) {
            console.error('GitHub profile fetch failed:', e);
        }

        // 2. Fetch Repositories
        try {
            const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, fetchOptions);
            if (repoRes.ok) repos = await repoRes.json();
        } catch (e) {
            console.error('GitHub repos fetch failed:', e);
        }

        // 3. Fetch Contributions
        try {
            const contribRes = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
                signal: controller.signal,
                next: { revalidate: 3600 }
            });
            if (contribRes.ok) contribData = await contribRes.json();
        } catch (e) {
            console.error('GitHub contributions fetch failed:', e);
        }

        clearTimeout(id);

        let totalStars = 0;
        let topRepos: any[] = [];

        if (Array.isArray(repos)) {
            totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
            topRepos = [...repos]
                .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
                .slice(0, 5)
                .map(r => ({
                    id: r.id,
                    name: r.name,
                    html_url: r.html_url,
                    description: r.description,
                    language: r.language,
                    stargazers_count: r.stargazers_count,
                    forks_count: r.forks_count
                }));
        }

        return NextResponse.json({
            profile: {
                repos: userData.public_repos || 0,
                followers: userData.followers || 0,
                totalContributions: contribData?.totalContributions || contribData?.total || 116,
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
