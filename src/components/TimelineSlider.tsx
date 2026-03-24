import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import type { City } from "@/data/cities";
import {
  getUtcOffsetMinutes,
  isBusinessHour,
  isSleepHour,
  getLocalHourFromRef,
  getDateInZone,
  formatTime,
} from "@/lib/timezone";
import { cn } from "@/lib/utils";

interface TimelineSliderProps {
  zones: City[];
  referenceTime: Date;
  onTimeChange: (date: Date) => void;
}

const TimelineSlider = ({ zones, referenceTime, onTimeChange }: TimelineSliderProps) => {
  const barsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // All computed values use useMemo to avoid recalculation
  const refTz = useMemo(() => zones[0]?.timezone ?? "UTC", [zones]);
  const refTime = useMemo(() => getDateInZone(refTz, referenceTime), [refTz, referenceTime]);
  const markerPos = useMemo(() => ((refTime.hours * 60 + refTime.minutes) / 1440) * 100, [refTime]);
  const nowTime = useMemo(() => getDateInZone(refTz), [refTz]);
  const nowPos = useMemo(() => ((nowTime.hours * 60 + nowTime.minutes) / 1440) * 100, [nowTime]);

  // Overlap computation
  const overlapSet = useMemo(() => {
    const set = new Set<number>();
    if (zones.length >= 2) {
      for (let h = 0; h < 24; h++) {
        const allWork = zones.every(z => {
          const localH = Math.floor(getLocalHourFromRef(h, refTz, z.timezone, referenceTime));
          return isBusinessHour(localH);
        });
        if (allWork) set.add(h);
      }
    }
    return set;
  }, [zones, refTz, referenceTime]);

  const handlePointerEvent = useCallback(
    (clientX: number) => {
      if (!barsRef.current) return;
      const rect = barsRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const totalMin = Math.round((pct * 1440) / 15) * 15;
      const targetH = Math.floor(totalMin / 60) % 24;
      const targetM = totalMin % 60;

      const current = getDateInZone(refTz, referenceTime);
      const currentMin = current.hours * 60 + current.minutes;
      const targetMin = targetH * 60 + targetM;
      const diffMin = targetMin - currentMin;

      onTimeChange(new Date(referenceTime.getTime() + diffMin * 60000));
    },
    [refTz, referenceTime, onTimeChange]
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => handlePointerEvent(e.clientX);
    const onTouchMove = (e: TouchEvent) => handlePointerEvent(e.touches[0].clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handlePointerEvent]);

  const getSegmentColor = useCallback((hour: number, timezone: string) => {
    const localH = Math.floor(getLocalHourFromRef(hour, refTz, timezone, referenceTime));
    if (overlapSet.has(hour)) return "bg-overlap-hours";
    if (isBusinessHour(localH)) return "bg-work-hours";
    if (isSleepHour(localH)) return "bg-sleep-hours";
    return "bg-transition-hours";
  }, [refTz, referenceTime, overlapSet]);

  const onPointerDown = (clientX: number) => {
    setIsDragging(true);
    handlePointerEvent(clientX);
  };

  if (zones.length === 0) return null;

  return (
    <div className="space-y-1.5">
      {/* Hour labels */}
      <div className="flex text-[10px] text-muted-foreground font-mono">
        {[0, 3, 6, 9, 12, 15, 18, 21].map(h => (
          <span key={h} className="flex-1">
            {h.toString().padStart(2, "0")}
          </span>
        ))}
      </div>

      {/* Timeline bars + markers */}
      <div className="flex gap-1.5">
        {/* Zone labels (desktop) */}
        <div className="hidden md:flex flex-col shrink-0 w-24">
          {zones.map((zone, idx) => (
            <div key={`label-${idx}`} className="h-9 mb-1 flex items-center justify-end pr-2">
              <span className="text-xs font-medium truncate">{zone.name}</span>
            </div>
          ))}
        </div>

        {/* Bars container */}
        <div
          ref={barsRef}
          className="flex-1 relative cursor-ew-resize select-none"
          onMouseDown={e => onPointerDown(e.clientX)}
          onTouchStart={e => onPointerDown(e.touches[0].clientX)}
        >
          {zones.map((zone, idx) => (
            <div key={`bar-${idx}`} className="flex h-9 mb-1 rounded-md overflow-hidden">
              {Array.from({ length: 24 }, (_, h) => {
                const localH = Math.floor(getLocalHourFromRef(h, refTz, zone.timezone, referenceTime));
                return (
                  <div
                    key={h}
                    className={cn(
                      "flex-1 border-r border-background/20 flex items-end justify-center transition-colors",
                      getSegmentColor(h, zone.timezone),
                      "hover:brightness-125"
                    )}
                    title={`${zone.name}: ${localH}:00`}
                  >
                    <span className="text-[8px] text-foreground/40 mb-0.5 hidden lg:block">
                      {localH}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Reference time marker */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-primary z-10 pointer-events-none"
            style={{ left: `${markerPos}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-primary text-primary-foreground px-1.5 py-0.5 rounded whitespace-nowrap">
              {formatTime(refTz, referenceTime)}
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </div>

          {/* Now marker (if different from reference) */}
          {Math.abs(nowPos - markerPos) > 2 && (
            <div
              className="absolute top-0 bottom-0 w-px bg-foreground/20 z-5 pointer-events-none"
              style={{ left: `${nowPos}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-muted-foreground whitespace-nowrap">
                now
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile zone labels */}
      <div className="md:hidden flex flex-wrap gap-1">
        {zones.map((zone, idx) => (
          <span key={`mlabel-${idx}`} className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary">
            {zone.name}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-3 text-[10px] text-muted-foreground mt-1">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-work-hours" /> Work (9–5)</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-sleep-hours" /> Sleep</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-transition-hours" /> Other</span>
        {zones.length >= 2 && (
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-overlap-hours" /> Overlap</span>
        )}
      </div>
    </div>
  );
};

export default TimelineSlider;
