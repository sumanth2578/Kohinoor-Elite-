import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kohinooreliteliving.com"),
  title: "Kohinoor | Elite Living",
  description: "Experience the pinnacle of nutrition and wellness with Kohinoor Elite Living. Personalized nutrition plans and premium superfoods delivered in Hyderabad.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/Updated Logo w_ background 1.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kohinoor | Elite Living",
    description: "Experience the pinnacle of nutrition and wellness with Kohinoor Elite Living.",
    url: "https://kohinooreliteliving.com",
    siteName: "Kohinoor Elite Living",
    images: [
      {
        url: "/Updated Logo w_ background 1.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kohinoor Elite Living",
              "url": "https://kohinooreliteliving.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kohinooreliteliving.com/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kohinoor Elite Living",
              "url": "https://kohinooreliteliving.com",
              "logo": "https://kohinooreliteliving.com/Updated%20Logo%20w_%20background%201.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9491337052",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body style={{ position: 'relative' }}>
        <IntroAnimation />
        <StickyLogo />
        {children}
      </body>
    </html>
  );
}
