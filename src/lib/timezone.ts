export function getUtcOffsetMinutes(timezone: string, date: Date = new Date()): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'longOffset',
    });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    if (!tzPart) return 0;
    if (tzPart.value === 'GMT') return 0;
    const match = tzPart.value.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
    if (!match) return 0;
    const sign = match[1] === '+' ? 1 : -1;
    return sign * (parseInt(match[2]) * 60 + parseInt(match[3] || '0'));
  } catch {
    return 0;
  }
}

export function formatTime(timezone: string, date: Date = new Date(), hour12: boolean = true): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12,
    }).format(date);
  } catch {
    return '--:--';
  }
}

export function formatDate(timezone: string, date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return '';
  }
}

export function getTimezoneAbbr(timezone: string, date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short',
    });
    const parts = formatter.formatToParts(date);
    return parts.find(p => p.type === 'timeZoneName')?.value || '';
  } catch {
    return '';
  }
}

export function getOffsetLabel(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${h}${m ? `:${m.toString().padStart(2, '0')}` : ''}`;
}

export function isBusinessHour(hour: number): boolean {
  return hour >= 9 && hour < 17;
}

export function isSleepHour(hour: number): boolean {
  return hour >= 22 || hour < 7;
}

export function getLocalHourFromRef(refHour: number, refTimezone: string, targetTimezone: string, date: Date = new Date()): number {
  const refOffset = getUtcOffsetMinutes(refTimezone, date);
  const targetOffset = getUtcOffsetMinutes(targetTimezone, date);
  const diff = (targetOffset - refOffset) / 60;
  return ((refHour + diff) % 24 + 24) % 24;
}

export function findOverlapHours(timezones: string[], date: Date = new Date()): number[] {
  if (timezones.length < 2) return [];
  const refTz = timezones[0];
  const overlapping: number[] = [];
  for (let h = 0; h < 24; h++) {
    const allWork = timezones.every(tz => {
      const localH = Math.floor(getLocalHourFromRef(h, refTz, tz, date));
      return isBusinessHour(localH);
    });
    if (allWork) overlapping.push(h);
  }
  return overlapping;
}

export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getDateInZone(timezone: string, date: Date = new Date()): { hours: number; minutes: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(date);
    const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
    const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
    return { hours, minutes };
  } catch {
    return { hours: 0, minutes: 0 };
  }
}
