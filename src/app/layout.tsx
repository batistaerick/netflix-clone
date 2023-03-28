import './globals.css';

export const metadata = {
  title: 'Netflix',
  description: 'Made by Erick',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
