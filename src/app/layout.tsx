import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vicious Offline',
  description: 'AI-assisted local text workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
