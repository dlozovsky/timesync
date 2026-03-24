import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { canonicalUrl, getSiteUrl, ogImagePath } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  verification: {
    google: "cURlvVNu3zQKlF8JZiT_ficlsSTCxvKsOzqqa8Gxh30",
  },
  title: "TimeSync — Free Time Zone Converter",
  description:
    "Convert time zones instantly with visual timeline, business hour overlap detection, and shareable meeting links. Free time zone converter for remote teams.",
  authors: [{ name: "TimeSync" }],
  openGraph: {
    title: "TimeSync — Free Time Zone Converter",
    description:
      "Convert time zones instantly with visual timeline, business hour overlap detection, and shareable meeting links.",
    type: "website",
    url: canonicalUrl("/"),
    images: [{ url: ogImagePath }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@timesync",
    title: "TimeSync — Free Time Zone Converter",
    description:
      "Convert time zones instantly with visual timeline, business hour overlap detection.",
    images: [ogImagePath],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
