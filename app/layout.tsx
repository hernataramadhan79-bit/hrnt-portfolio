import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
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
    'Official portfolio of Hernata Ramadhan, Full-Stack Developer specializing in high-performance web applications, Next.js, React, TypeScript, and modern UI/UX engineering.',
  keywords: [
    'Hernata',
    'Hernata Ramadhan',
    'Full-Stack Developer',
    'Software Engineer Portfolio',
    'Next.js Developer',
    'React Developer',
    'TypeScript Engineer',
    'Frontend Engineer',
    'Web Application Developer',
    'Creative Developer',
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
      'Explore web applications, performance metrics, and modern tech stacks engineered by Hernata Ramadhan.',
    url: siteUrl,
    siteName: 'Hernata Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hernata - Full-Stack Software Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hernata | Full-Stack Software Developer',
    description:
      'Explore web applications, performance metrics, and modern tech stacks engineered by Hernata Ramadhan.',
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
  other: {
    'copyright': '© 2023-2026 Hernata Ramadhan. All Rights Reserved.',
    'rights': 'Copyright © 2023-2026 Hernata Ramadhan. All intellectual property, UI/UX design, custom assets, and source code are protected.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  copyrightYear: 2026,
  copyrightHolder: {
    '@type': 'Person',
    name: 'Hernata Ramadhan',
    url: siteUrl,
  },
  license: `${siteUrl}/LICENSE`,
  mainEntity: {
    '@type': 'Person',
    name: 'Hernata Ramadhan',
    alternateName: 'Hernata',
    jobTitle: 'Full-Stack Developer & Software Engineer',
    description:
      'Full-Stack Developer specializing in modern web architecture, Next.js, React, TypeScript, and high-performance user interfaces.',
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    sameAs: [
      'https://github.com/hernataramadhan79-bit',
      'https://www.linkedin.com/in/hernata-ramadhan-176b68338',
      'https://www.instagram.com/hrnt.dev/',
    ],
    knowsAbout: [
      'Full-Stack Development',
      'Web Application Architecture',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL',
      'Cloud Architecture',
      'UI/UX Design Systems',
      'REST & GraphQL APIs',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}