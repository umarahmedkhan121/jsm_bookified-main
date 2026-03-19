import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";
import "./globals.css";

// Using IBM Plex Serif for the main serif font
const ibmPlexSerif = IBM_Plex_Serif({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-serif',
  display: 'swap',
});

// Using Inter as a drop-in replacement from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-mona-sans', // Keeping this variable name so your CSS doesn't break
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bookified - Talk to your books",
  description: "Transform your books into interactive AI conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${ibmPlexSerif.variable} ${inter.variable} font-sans antialiased bg-[var(--bg-primary)]`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}