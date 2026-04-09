import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kohinoor | Elite Living",
  description: "Experience the pinnacle of nutrition and wellness with Kohinoor Elite Living. Personalized nutrition plans and premium superfoods delivered in Hyderabad.",
};

import { StickyLogo } from "@/components/StickyLogo";
import { IntroAnimation } from "@/components/IntroAnimation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable}`}>
      <body style={{ position: 'relative' }}>
        <IntroAnimation />
        <StickyLogo />
        {children}
      </body>
    </html>
  );
}
