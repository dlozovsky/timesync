import type { Metadata } from "next";
import { canonicalUrl, ogImagePath } from "@/lib/site";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "TimeSync — Free Time Zone Converter",
  description:
    "Convert time zones instantly with visual timeline, business hour overlap detection, and shareable meeting links. Free time zone converter for remote teams.",
  alternates: {
    canonical: canonicalUrl("/"),
  },
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

export default function HomePage() {
  return <Index />;
}
