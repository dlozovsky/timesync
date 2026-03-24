import type { Metadata } from "next";
import DocShell from "@/components/DocShell";
import { canonicalUrl, ogImagePath } from "@/lib/site";

const title = "Privacy | TimeSync";
const description =
  "How TimeSync handles information when you use our time zone converter, including local processing and optional analytics.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/privacy") },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonicalUrl("/privacy"),
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

const effective = "March 24, 2026";

export default function PrivacyPage() {
  return (
    <DocShell title="Privacy policy">
      <p className="text-sm">Last updated: {effective}</p>

      <p>
        This policy describes how TimeSync (&quot;we,&quot; &quot;us&quot;) handles information when you visit or use
        our website (the &quot;Service&quot;). We aim to be transparent and keep data collection minimal.
      </p>

      <h2>1. What the Service does</h2>
      <p>
        TimeSync helps you compare time zones, build shareable URLs, and export calendar data. Core converter features
        run in your browser; your city selections and shared links are not stored on our servers as part of normal
        operation.
      </p>

      <h2>2. Information we may collect</h2>
      <h3>2.1 Information you provide</h3>
      <p>
        We do not require an account to use the converter. If you contact us by email or a form, we receive whatever you
        choose to send.
      </p>
      <h3>2.2 Technical data</h3>
      <p>
        Like most websites, our hosting provider and infrastructure may automatically log technical data such as IP
        address, browser type, referring URLs, and timestamps when you request pages. We use this for security,
        reliability, and aggregate statistics where applicable.
      </p>
      <h3>2.3 Cookies and local storage</h3>
      <p>
        We may use cookies or similar technologies for essential site operation, preferences (such as theme), or
        analytics if enabled for this deployment. You can control cookies through your browser settings.
      </p>

      <h2>3. How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Operate, maintain, and secure the Service.</li>
        <li>Understand aggregate usage to improve performance and content.</li>
        <li>Respond to lawful requests and enforce our Terms.</li>
      </ul>

      <h2>4. Sharing</h2>
      <p>
        We do not sell your personal information. We may share data with vendors that help us host or analyze the site
        (e.g., cloud hosting, analytics), subject to their policies and our instructions, or when required by law.
      </p>

      <h2>5. Children</h2>
      <p>
        The Service is not directed at children under 13, and we do not knowingly collect personal information from
        them. If you believe we have collected such information, contact us so we can delete it.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, or restrict processing of personal
        data, or to object to certain processing. Contact us to exercise applicable rights.
      </p>

      <h2>7. International users</h2>
      <p>
        If you access the Service from outside the country where our servers are located, your information may be
        transferred to and processed in that country or others where we or our vendors operate.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update this policy from time to time. We will adjust the &quot;Last updated&quot; date when we do.
        Continued use after changes means you accept the revised policy.
      </p>

      <h2>9. Contact</h2>
      <p>
        For privacy questions, use the contact method published on this site for your deployment (e.g., site operator
        email or support form).
      </p>
    </DocShell>
  );
}
