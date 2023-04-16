import Provider from '@/components/Provider';
import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Netflix',
  description: 'Made by Erick',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>{' '}
      </body>
    </html>
  );
}
