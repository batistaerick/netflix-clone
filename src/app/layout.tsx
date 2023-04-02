import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Netflix',
  description: 'Made by Erick',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
