import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import IsoLevelWarp from "@/components/ui/isometric-wave-grid-background";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSY — Agência criativa",
  description:
    "Branding, conteúdo e performance pra marcas que querem ser lembradas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IsoLevelWarp color="255, 255, 255" density={60} speed={0.5} />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
