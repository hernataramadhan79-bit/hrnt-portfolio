/**
 * DevTools Console Splash Screen & Terminal Architecture Signature
 * Inspired by OpenCode and Claude Code CLI interfaces.
 */

export function printDevToolsBanner(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
    return;
  }

  // Prevent duplicate logs across hot reloads in development
  const bannerKey = '__HRNT_DEVTOOLS_BANNER_LOGGED__';
  if ((window as unknown as Record<string, boolean>)[bannerKey]) {
    return;
  }
  (window as unknown as Record<string, boolean>)[bannerKey] = true;

  // 1. Exact 1:1 Navbar Wordmark Typography & Cyan Diamond
  console.log(
    '%cHRNT %c◇',
    'font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 32px; font-weight: 900; color: #ffffff; letter-spacing: -2px; line-height: 1.2;',
    'font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 24px; font-weight: 900; color: #22d3ee; margin-left: 2px; text-shadow: 0 0 12px rgba(34,211,238,0.8);'
  );

  // 2. OpenCode / Claude Code Perfectly Aligned Terminal Box (Exact 78-char grid)
  const terminalBox = [
    '╭────────────────────────────────────────────────────────────────────────────╮',
    '│  Hernata Ramadhan (HRNT)                                                   │',
    '│  Full-Stack Software Engineer                                              │',
    '│                                                                            │',
    '│  Stack   : Next.js 16 • React 19 • TypeScript • Tailwind CSS • Node.js     │',
    '│  Website : https://hernata.web.id                                          │',
    '│  GitHub  : https://github.com/hernataramadhan79-bit                        │',
    '│  Contact : hernataramadhan79@gmail.com                                     │',
    '│                                                                            │',
    '├────────────────────────────────────────────────────────────────────────────┤',
    '│                                                                            │',
    '│  Copyright (c) 2023-2026 Hernata Ramadhan. All Rights Reserved.            │',
    '│  All UI/UX design, visual assets, and source architecture are protected.   │',
    '│  Unauthorized cloning, scraping, or commercial reproduction is prohibited. │',
    '╰────────────────────────────────────────────────────────────────────────────╯',
  ].join('\n');

  console.log(
    `%c${terminalBox}\n`,
    'color: #38bdf8; font-family: "Cascadia Code", "Fira Code", "Consolas", "Courier New", monospace; font-size: 11px; line-height: 1.35;'
  );
}
