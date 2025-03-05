import { auth } from '@/libs/auth';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const geistSans: NextFontWithVariable = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono: NextFontWithVariable = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Netflix clone',
  description: 'Made by Erick',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session: Session | null = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
