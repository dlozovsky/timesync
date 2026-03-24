import { Calendar, Download, Copy, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { City } from "@/data/cities";
import { formatTime, getTimezoneAbbr } from "@/lib/timezone";
import { toast } from "@/hooks/use-toast";

interface CalendarExportProps {
  cities: City[];
  referenceTime: Date;
}

const CalendarExport = ({ cities, referenceTime }: CalendarExportProps) => {
  const fmtISO = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const title = `Meeting: ${cities.map(c => c.name).join(", ")}`;
  const desc = cities
    .map(c => `${c.name}: ${formatTime(c.timezone, referenceTime)} ${getTimezoneAbbr(c.timezone, referenceTime)}`)
    .join("\n");

  const startISO = fmtISO(referenceTime);
  const endTime = new Date(referenceTime.getTime() + 3600000);
  const endISO = fmtISO(endTime);

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startISO}/${endISO}&details=${encodeURIComponent(desc)}`;

  const outlookUrl = `https://outlook.live.com/calendar/0/action/compose?subject=${encodeURIComponent(title)}&startdt=${referenceTime.toISOString()}&enddt=${endTime.toISOString()}&body=${encodeURIComponent(desc)}`;

  const downloadIcal = () => {
    const ical = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TimeSync//EN",
      "BEGIN:VEVENT",
      `DTSTART:${startISO}`,
      `DTEND:${endISO}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc.replace(/\n/g, "\\n")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ical], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meeting.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyAsText = async () => {
    const text = cities
      .map(c => `${c.name.padEnd(20)} ${formatTime(c.timezone, referenceTime)} ${getTimezoneAbbr(c.timezone, referenceTime)}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied!", description: "Meeting times copied as text." });
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          Export
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => window.open(googleUrl, "_blank")}>
          <Calendar className="h-4 w-4 mr-2" /> Google Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(outlookUrl, "_blank")}>
          <Calendar className="h-4 w-4 mr-2" /> Outlook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadIcal}>
          <Download className="h-4 w-4 mr-2" /> Download .ics
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyAsText}>
          <Copy className="h-4 w-4 mr-2" /> Copy as Text
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarExport;
