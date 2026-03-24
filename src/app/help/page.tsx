import type { Metadata } from "next";
import Link from "next/link";
import DocShell from "@/components/DocShell";
import { canonicalUrl, ogImagePath } from "@/lib/site";

const title = "Help | TimeSync";
const description =
  "Learn how to use TimeSync: compare time zones, share meeting links, export to your calendar, and understand DST behavior.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/help") },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonicalUrl("/help"),
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

export default function HelpPage() {
  return (
    <DocShell title="Help">
      <p>
        TimeSync is a free time zone converter with a visual timeline, business-hour overlap hints, and tools to share or
        export proposed meeting times. This page explains the basics.
      </p>

      <h2>Getting started</h2>
      <ul>
        <li>
          Open the <strong>Converter</strong> and search for cities to add them to your comparison (up to several at once).
        </li>
        <li>
          The <strong>timeline</strong> at the bottom lets you drag to pick a reference time; clocks and overlap
          indicators update to match.
        </li>
        <li>
          Use <strong>Reset to now</strong> when you have adjusted the time manually and want to jump back to the current
          moment.
        </li>
      </ul>

      <h2>Shareable links</h2>
      <p>
        <strong>Share</strong> copies a link that includes your selected cities and the chosen time in the URL. Anyone
        with the link can open the same setup in their browser. Links are generated client-side; we do not store your
        selections on our servers.
      </p>

      <h2>Calendar export</h2>
      <p>
        Use <strong>Export</strong> to add the proposed time block to Google Calendar, Outlook, or download an{" "}
        <code className="text-primary">.ics</code> file. You may need to confirm time zone details in your calendar app
        after import.
      </p>

      <h2>Daylight saving time (DST)</h2>
      <p>
        TimeSync uses your browser&apos;s date/time APIs, which account for DST rules for the zones we support. Edge
        cases can still occur around transition windows or if a region changes rules. Always double-check critical
        meetings in an official source or your calendar provider.
      </p>

      <h2>Accuracy</h2>
      <p>
        Displayed times and overlap ranges are for planning assistance only. We do not guarantee accuracy for legal,
        financial, or safety-critical decisions.
      </p>

      <h2>More information</h2>
      <p>
        For rules governing use of the site, see{" "}
        <Link href="/terms">Terms of use</Link>. For data practices, see{" "}
        <Link href="/privacy">Privacy</Link>.
      </p>
    </DocShell>
  );
}
