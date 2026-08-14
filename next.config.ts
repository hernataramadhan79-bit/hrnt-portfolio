import type { NextConfig } from 'next';

let nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
            },
        ],
    },
    async rewrites() {
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'forum-portfolio';
        return [
            {
                source: '/__/auth/:path*',
                destination: `https://${projectId}.firebaseapp.com/__/auth/:path*`,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseio.com https://*.googleapis.com https://apis.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; connect-src 'self' https://api.github.com https://wakatime.com https://api.web3forms.com https://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://github-contributions-api.deno.dev https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.cloudflareinsights.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://*.firebaseapp.com https://apis.google.com https://accounts.google.com;",
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin-allow-popups',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
};

if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
    });
    nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;