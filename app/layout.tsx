import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import SkipLink from '@/components/__a11y/SkipLink';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hrnt-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'HRNT | Creative Developer',
  description: 'HRNT - Creative Developer Portfolio. Engineering digital experiences with precision and imagination.',
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/profile.jpg',
    apple: '/profile.jpg',
  },
  openGraph: {
    title: 'HRNT | Creative Developer',
    description: 'HRNT - Creative Developer Portfolio. Engineering digital experiences with precision and imagination.',
    type: 'website',
    url: siteUrl,
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Hernata Ramadhan',
      givenName: 'Hernata',
      familyName: 'Ramadhan',
      jobTitle: 'Creative Developer',
      url: siteUrl,
      image: `${siteUrl}/profile.jpg`,
      sameAs: [
        'https://github.com/hernataramadhan79-bit',
        'https://www.linkedin.com/in/hernata-ramadhan-176b68338',
        'https://www.instagram.com/hrnt.dev/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'HRNT | Creative Developer',
      description: 'HRNT - Creative Developer Portfolio. Engineering digital experiences with precision and imagination.',
      publisher: { '@id': `${siteUrl}/#person` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <SkipLink />
        <Script id="image-protection" strategy="lazyOnload">
          {`
            document.addEventListener('contextmenu', function (e) {
              if (e.target.tagName === 'IMG') e.preventDefault();
            }, { passive: false });

            document.addEventListener('dragstart', function (e) {
              if (e.target.tagName === 'IMG') e.preventDefault();
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
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}