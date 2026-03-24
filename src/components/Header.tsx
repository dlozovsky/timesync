import Link from "next/link";
import { Clock, Zap } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-50 glass">
    <div className="container flex h-14 items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
        <Clock className="h-5 w-5 text-primary" />
        <span>Time<span className="text-primary">Sync</span></span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Help
        </Link>
        <Link href="/convert" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Converter
        </Link>
        <Link
          href="/convert"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary hover:bg-primary/20 transition-colors"
        >
          <Zap className="h-3.5 w-3.5" />
          Try Free
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
