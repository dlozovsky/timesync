import Link from "next/link";
import { Clock } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-3">
            <Clock className="h-4 w-4 text-primary" />
            TimeSync
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The fastest way to convert time zones and find meeting overlaps for remote teams.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">Popular Conversions</h4>
          <div className="grid grid-cols-2 gap-1">
            {["est-to-pst", "est-to-gmt", "pst-to-jst", "gmt-to-cet"].map(slug => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase"
              >
                {slug.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">Time Right Now</h4>
          <div className="grid grid-cols-2 gap-1">
            {["new-york", "london", "tokyo", "sydney"].map(city => (
              <Link
                key={city}
                href={`/time-in-${city}-now`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors capitalize"
              >
                {city.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border/30">
        <div className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          <h2 className="text-base font-medium text-foreground mb-2">Free Time Zone Converter</h2>
          <p className="mb-2">
            TimeSync is a free online time zone converter designed for remote workers, international teams, and freelancers.
            Instantly compare times across multiple cities with our visual timeline slider and business hour overlap detection.
            Whether you&apos;re scheduling a meeting between New York and London, or coordinating with team members in Tokyo and Sydney,
            TimeSync makes it effortless to find the perfect meeting time.
          </p>
          <p>
            Our tool automatically handles Daylight Saving Time (DST) transitions, supports 100+ cities worldwide,
            and lets you share proposed meeting times with a single link. Export to Google Calendar, Outlook, or copy
            formatted tables for Slack and email. No signup required — start converting time zones instantly.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground/60">
          <p>© {new Date().getFullYear()} TimeSync. All times are approximate and may vary during DST transitions.</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Legal and help">
            <Link href="/help" className="hover:text-primary transition-colors">
              Help
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of use
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
