import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hernata.web.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hernata Ramadhan (HRNT) — Full-Stack Software Engineer',
    template: '%s | Hernata Ramadhan',
  },
  description:
    'Official portfolio of Hernata Ramadhan (HRNT), Full-Stack Software Engineer. High-performance web architecture, React 19, Next.js 16, TypeScript, sub-second telemetry, and defense-in-depth security.',
  keywords: [
    'Hernata',
    'Hernata Ramadhan',
    'HRNT',
    'Full-Stack Developer',
    'Software Engineer',
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Bento Grid Portfolio',
  ],
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
    title: 'Hernata Ramadhan (HRNT) — Full-Stack Software Engineer',
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
    title: 'Hernata Ramadhan (HRNT) — Full-Stack Software Engineer',
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
  themeColor: '#09090b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-[#09090b] text-[#f4f4f5] font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300 min-h-screen">
        {children}
      </body>
    </html>
  );
}
