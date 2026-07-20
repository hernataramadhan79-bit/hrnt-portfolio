import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'HRNT | Creative Developer',
  description: 'HRNT - Creative Developer Portfolio. Engineering digital experiences with precision and imagination.',
  icons: {
    icon: '/profile.jpg',
    apple: '/profile.jpg',
  },
  openGraph: {
    title: 'HRNT | Creative Developer',
    description: 'HRNT - Creative Developer Portfolio. Engineering digital experiences with precision and imagination.',
    type: 'website',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 800,
        alt: 'HRNT - Creative Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HRNT | Creative Developer',
    description: 'HRNT - Creative Developer Portfolio. Engineering digital experiences with precision and imagination.',
    images: ['/profile.jpg'],
  },
};

export const viewport = {
  themeColor: '#020617',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://esm.sh" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id={process.env.UMAMI_WEBSITE_ID || '8558da82-ef6e-4f73-a6cb-89fc8671dbb2'}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function () {
                document.addEventListener('contextmenu', function (e) {
                  if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                  }
                }, { passive: false });

                document.addEventListener('dragstart', function (e) {
                  if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                  }
                }, { passive: false });

                document.addEventListener('keydown', function (e) {
                  if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                      const range = selection.getRangeAt(0);
                      const container = range.commonAncestorContainer;
                      const parent = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
                      if (parent && parent instanceof HTMLElement && parent.querySelector('img')) {
                        e.preventDefault();
                      }
                    }
                  }
                });
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
