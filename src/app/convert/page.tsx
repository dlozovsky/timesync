import { Suspense } from "react";
import type { Metadata } from "next";
import { canonicalUrl, ogImagePath } from "@/lib/site";
import Converter from "@/views/Converter";

const title = "Time Zone Converter | TimeSync";
const description =
  "Compare cities, drag the timeline, and find overlapping business hours. Share links and export to your calendar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl("/convert"),
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonicalUrl("/convert"),
    images: [{ url: ogImagePath }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@timesync",
    title,
    description,
    images: [ogImagePath],
  },
};

export default function ConvertPage() {
  return (
    <Suspense fallback={null}>
      <Converter />
    </Suspense>
  );
}
