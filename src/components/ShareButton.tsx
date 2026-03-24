import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { City } from "@/data/cities";
import { toast } from "@/hooks/use-toast";

interface ShareButtonProps {
  cities: City[];
  referenceTime: Date;
}

const ShareButton = ({ cities, referenceTime }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const params = new URLSearchParams();
    params.set("zones", cities.map(c => c.name).join(","));
    params.set("time", referenceTime.toISOString());
    const url = `${window.location.origin}/convert?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: "Link copied!", description: "Shareable link copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Share"}
    </Button>
  );
};

export default ShareButton;
