import type { Metadata } from "next";
import DocShell from "@/components/DocShell";
import { canonicalUrl, ogImagePath } from "@/lib/site";

const title = "Terms of use | TimeSync";
const description = "Terms and conditions for using the TimeSync time zone converter website.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/terms") },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonicalUrl("/terms"),
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

export default function TermsPage() {
  return (
    <DocShell title="Terms of use">
      <p className="text-sm">Last updated: {effective}</p>

      <p>
        These terms of use (&quot;Terms&quot;) govern your access to and use of the TimeSync website and related
        services (collectively, the &quot;Service&quot;). By using the Service, you agree to these Terms. If you do not
        agree, do not use the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        TimeSync provides a client-side tool to compare times across time zones, visualize overlaps, generate shareable
        links, and export calendar data. The Service is offered for general information and planning purposes only.
      </p>

      <h2>2. No accounts</h2>
      <p>
        The Service does not require registration. Functionality runs largely in your browser; we do not operate a
        login system for core converter features as described in our Privacy policy.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service in violation of applicable law or third-party rights.</li>
        <li>Attempt to disrupt, overload, or reverse engineer the Service except as permitted by law.</li>
        <li>Use automated means to scrape or abuse the Service in a way that impairs others&apos; use.</li>
      </ul>

      <h2>4. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER
        EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT. WE DO NOT WARRANT THAT TIMES, DST BEHAVIOR, OR OVERLAP INDICATORS ARE ERROR-FREE OR SUITABLE
        FOR ANY SPECIFIC PURPOSE.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, TIMESYNC AND ITS OPERATORS WILL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM
        YOUR USE OF THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIM
        ARISING OUT OF THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US TO USE THE
        SERVICE IN THE TWELVE MONTHS BEFORE THE CLAIM (TYPICALLY ZERO FOR FREE USE) OR (B) FIFTY U.S. DOLLARS (USD $50).
      </p>

      <h2>6. Changes</h2>
      <p>
        We may modify the Service or these Terms at any time. We will update the &quot;Last updated&quot; date above
        when we make material changes. Continued use after changes constitutes acceptance of the revised Terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions about these Terms, contact us through the channels listed on the site or your hosting provider for
        this deployment.
      </p>
    </DocShell>
  );
}
