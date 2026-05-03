import type { Metadata } from 'next';
import { Outfit, Fira_Code } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Daniel Niedzwiedzki',
  description: "Daniel's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${firaCode.variable} h-full antialiased w-full overflow-x-hidden`}
    >
      <body className="min-h-full w-full flex flex-col overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
