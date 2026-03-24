import { formatTime, formatDate, getUtcOffsetMinutes, getOffsetLabel, getTimezoneAbbr } from "@/lib/timezone";
import type { City } from "@/data/cities";

interface ClockCardProps {
  city: City;
  referenceTime: Date;
}

const ClockCard = ({ city, referenceTime }: ClockCardProps) => {
  const time = formatTime(city.timezone, referenceTime);
  const date = formatDate(city.timezone, referenceTime);
  const offset = getUtcOffsetMinutes(city.timezone, referenceTime);
  const abbr = getTimezoneAbbr(city.timezone, referenceTime);

  return (
    <div className="glass rounded-xl p-4 hover:shadow-glow transition-shadow duration-300">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-sm">{city.name}</h3>
          <p className="text-xs text-muted-foreground">{city.country}</p>
        </div>
        <span className="text-[10px] rounded-full bg-primary/10 text-primary px-2 py-0.5 font-mono">
          {getOffsetLabel(offset)}
        </span>
      </div>
      <div className="font-mono text-2xl font-bold tracking-tight">{time}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-muted-foreground">{date}</span>
        <span className="text-xs text-muted-foreground font-mono">{abbr}</span>
      </div>
    </div>
  );
};

export default ClockCard;
