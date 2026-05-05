import type { Metadata } from 'next';
import { Outfit, Fira_Code, Comforter } from 'next/font/google';
// import { / } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/NavBar';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});

const comforter = Comforter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-comforter',
});

export const metadata: Metadata = {
  title: 'Daniel Niedzwiedzki — Full Stack Software Engineer',
  description:
    'Software engineer based in New Jersey specializing in React, TypeScript, and building fast, accessible web experiences.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Daniel Niedzwiedzki — Full Stack Software Engineer',
    description:
      'Software engineer based in New Jersey specializing in React, TypeScript, and building fast, accessible web experiences.',
    url: 'https://danielniedzwiedzki.com',
    siteName: 'Daniel Niedzwiedzki',
    images: [
      {
        url: 'https://danielniedzwiedzki.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Daniel Niedzwiedzki Portfolio',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${firaCode.variable}  ${comforter.variable} h-full antialiased w-full overflow-x-hidden`}
    >
      <body className="min-h-full w-full flex flex-col overflow-x-hidden">
        <Navbar />

        {children}
      </body>
    </html>
  );
}
