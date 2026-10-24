import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hernata.web.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hernata Ramadhan (HRNT) | Full-Stack Software Engineer',
    template: '%s | Hernata Ramadhan',
  },
  description:
    'Official portfolio of Hernata Ramadhan (HRNT), Full-Stack Software Engineer. Scalable web architectures, performant systems, interactive visual engineering, and reliable backends.',
  keywords: [
    'Hernata',
    'Hernata Ramadhan',
    'HRNT',
    'Full-Stack Developer',
    'Software Engineer',
    'Web Architecture',
    'Systems Engineering',
    'Bento Grid Portfolio',
  ],
  alternates: { canonical: '/' },
  authors: [{ name: 'Hernata Ramadhan', url: siteUrl }],
  creator: 'Hernata Ramadhan',
  publisher: 'Hernata Ramadhan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Hernata Ramadhan (HRNT) | Full-Stack Software Engineer',
    description:
      'Engineering high-performance web architectures, end to end. Explore projects, telemetry, and verified credentials.',
    siteName: 'Hernata Ramadhan (HRNT) Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hernata Ramadhan (HRNT) Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hernata Ramadhan (HRNT) | Full-Stack Software Engineer',
    description:
      'Engineering high-performance web architectures, end to end. Explore projects, telemetry, and verified credentials.',
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
  icons: {
    icon: '/profile.jpg',
    shortcut: '/profile.jpg',
    apple: '/profile.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#090A0D',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Hernata Ramadhan (HRNT) Portfolio',
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Hernata Ramadhan',
      alternateName: 'HRNT',
      jobTitle: 'Full-Stack Software Engineer',
      url: siteUrl,
      image: `${siteUrl}/profile.jpg`,
      sameAs: ['https://github.com/hernataramadhan79-bit'],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Entrance hidden-states apply only once scripts run, so content never stays hidden */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="bg-[#090A0D] text-[#F1F5F9] font-sans antialiased selection:bg-[#A8C7FA]/25 selection:text-[#D3E3FD] min-h-screen">
        {children}
      </body>
    </html>
  );
}
