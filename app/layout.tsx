import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import SkipLink from '@/components/__a11y/SkipLink';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hernata.web.id';

export const viewport: Viewport = {
  themeColor: '#020205',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hernata | Full-Stack Software Developer',
    template: '%s | Hernata',
  },
  description:
    'Portfolio resmi Hernata Ramadhan, Full-Stack Developer spesialis modern web application, Next.js, React, TypeScript, dan performa tinggi.',
  keywords: [
    'Hernata',
    'Hernata Ramadhan',
    'Full-Stack Developer Indonesia',
    'Web Developer Madiun',
    'Next.js Developer',
    'React Developer',
    'Software Engineer Portfolio',
  ],
  authors: [{ name: 'Hernata Ramadhan', url: siteUrl }],
  creator: 'Hernata Ramadhan',
  publisher: 'Hernata Ramadhan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/profile.jpg',
    apple: '/profile.jpg',
  },
  openGraph: {
    title: 'Hernata | Full-Stack Software Developer',
    description:
      'Koleksi proyek web, studi kasus performa, dan tech stack modern oleh Hernata.',
    url: siteUrl,
    siteName: 'Hernata Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hernata - Full-Stack Developer Portfolio',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hernata | Full-Stack Software Developer',
    description: 'Koleksi proyek web dan tech stack modern oleh Hernata.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Hernata Ramadhan',
    alternateName: 'Hernata',
    jobTitle: 'Full-Stack Developer',
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    sameAs: [
      'https://github.com/hernataramadhan79-bit',
      'https://www.linkedin.com/in/hernata-ramadhan-176b68338',
      'https://www.instagram.com/hrnt.dev/',
    ],
    knowsAbout: [
      'Web Development',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Full-Stack Engineering',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="anonymous" />
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