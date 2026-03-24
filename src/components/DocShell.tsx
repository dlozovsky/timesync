import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface DocShellProps {
  title: string;
  children: React.ReactNode;
}

const DocShell = ({ title, children }: DocShellProps) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">{title}</h1>
      <div className="prose prose-invert prose-sm max-w-none text-muted-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground [&_a]:text-primary [&_ul]:marker:text-muted-foreground">
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default DocShell;
