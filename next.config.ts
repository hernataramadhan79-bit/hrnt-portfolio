import type { NextConfig } from 'next';

let nextConfig: NextConfig = {
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
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
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; connect-src 'self' https://api.github.com https://wakatime.com https://api.web3forms.com https://www.googleapis.com https://*.googleapis.com https://googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://github-contributions-api.deno.dev https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.cloudflareinsights.com https://stats.g.doubleclick.net; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://*.firebaseapp.com https://apis.google.com https://accounts.google.com;",
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
                    {
                        key: 'X-Copyright',
                        value: 'Copyright (c) 2023-2026 Hernata Ramadhan. All Rights Reserved.',
                    },
                ],
            },
            {
                // Firebase Auth iframe — override frame restriction & disable ALL caches (including Cloudflare)
                source: '/__/auth/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                    },
                    {
                        // Cloudflare-specific: bypass CDN cache entirely
                        key: 'CDN-Cache-Control',
                        value: 'no-store',
                    },
                    {
                        // Cloudflare-specific: bypass Cloudflare edge cache
                        key: 'Cloudflare-CDN-Cache-Control',
                        value: 'no-store',
                    },
                    {
                        // Surrogate control for Vercel edge
                        key: 'Surrogate-Control',
                        value: 'no-store',
                    },
                    {
                        // Allow Firebase to embed this in an iframe
                        key: 'X-Frame-Options',
                        value: 'ALLOWALL',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.googleapis.com; connect-src 'self' https://www.googleapis.com https://*.googleapis.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com; frame-src 'self' https://*.firebaseapp.com https://apis.google.com;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
