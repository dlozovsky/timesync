import type { City } from "@/data/cities";
import { findOverlapHours, getTimezoneAbbr } from "@/lib/timezone";
import { Clock } from "lucide-react";

interface OverlapIndicatorProps {
  zones: City[];
  referenceTime: Date;
}

const OverlapIndicator = ({ zones, referenceTime }: OverlapIndicatorProps) => {
  if (zones.length < 2) return null;

  const overlap = findOverlapHours(
    zones.map(z => z.timezone),
    referenceTime
  );
  const refAbbr = getTimezoneAbbr(zones[0].timezone, referenceTime);

  if (overlap.length === 0) {
    return (
      <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm">
        <p className="text-destructive font-medium">No overlapping business hours found between selected zones.</p>
        <p className="text-destructive/70 text-xs mt-1">Try adjusting your selected cities or consider async communication.</p>
      </div>
    );
  }

  // Find contiguous ranges
  const ranges: [number, number][] = [];
  let start = overlap[0];
  for (let i = 1; i <= overlap.length; i++) {
    if (i === overlap.length || overlap[i] !== overlap[i - 1] + 1) {
      ranges.push([start, overlap[i - 1] + 1]);
      if (i < overlap.length) start = overlap[i];
    }
  }

  const formatH = (h: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:00 ${ampm}`;
  };

  return (
    <div className="rounded-lg bg-overlap-hours/10 border border-overlap-hours/20 p-4">
      <div className="flex items-center gap-2 text-sm font-medium mb-1.5">
        <Clock className="h-4 w-4 text-overlap-hours" />
        <span>{overlap.length}h business hour overlap</span>
      </div>
      <div className="text-xs text-muted-foreground space-y-0.5">
        {ranges.map(([s, e], i) => (
          <p key={i}>
            {formatH(s)} – {formatH(e)} {refAbbr}
          </p>
        ))}
      </div>
    </div>
  );
};

export default OverlapIndicator;
