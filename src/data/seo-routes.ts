export interface SEORoute {
  slug: string;
  zones: string[];
  title: string;
  description: string;
  heading: string;
  content: string;
}

function conv(from: string, to: string, fromAbbr: string, toAbbr: string, diff: string): SEORoute {
  return {
    slug: `${fromAbbr.toLowerCase()}-to-${toAbbr.toLowerCase()}`,
    zones: [from, to],
    title: `${fromAbbr} to ${toAbbr} — Convert Time Zones Instantly | TimeSync`,
    description: `Convert ${fromAbbr} to ${toAbbr} instantly. Visual timeline with business hour overlap for ${from} and ${to}.`,
    heading: `${fromAbbr} to ${toAbbr} Time Conversion`,
    content: `The time difference between ${from} (${fromAbbr}) and ${to} (${toAbbr}) is typically ${diff}. This is a popular conversion for remote workers coordinating across these regions. Use the interactive timeline above to drag and find optimal meeting windows where business hours overlap. TimeSync handles DST transitions automatically for accurate year-round conversions. Share your proposed meeting time with a single link or export directly to your calendar.`,
  };
}

function city(from: string, to: string): SEORoute {
  const slug = `${from.toLowerCase().replace(/\s+/g, '-')}-to-${to.toLowerCase().replace(/\s+/g, '-')}`;
  return {
    slug,
    zones: [from, to],
    title: `${from} to ${to} Time Converter | TimeSync`,
    description: `Convert time between ${from} and ${to}. See current times, business hour overlap, and schedule meetings.`,
    heading: `${from} to ${to} Time`,
    content: `Planning a meeting between ${from} and ${to}? Use TimeSync's visual timeline to instantly see the time difference and find overlapping business hours. Whether you're scheduling a client call, team standup, or virtual coffee chat, our converter makes it easy to coordinate across these two cities. Drag the timeline slider to explore different meeting times and see at a glance when both locations are in business hours. Share the link with colleagues or export to Google Calendar and Outlook.`,
  };
}

function timeNow(cityName: string): SEORoute {
  const slug = `time-in-${cityName.toLowerCase().replace(/\s+/g, '-')}-now`;
  return {
    slug,
    zones: [cityName],
    title: `Current Time in ${cityName} — What Time Is It Now? | TimeSync`,
    description: `See the current time in ${cityName} right now. Live clock with timezone info. Convert to other time zones instantly.`,
    heading: `Current Time in ${cityName}`,
    content: `The current local time in ${cityName} is shown above with a live updating clock. Use TimeSync to compare the current time in ${cityName} with any other city worldwide. Add more cities using the search bar to see time differences and find the best meeting times across time zones. Our tool automatically handles Daylight Saving Time so you always see accurate results.`,
  };
}

export const SEO_ROUTES: SEORoute[] = [
  // Timezone abbreviation conversions
  conv("New York", "Los Angeles", "EST", "PST", "3 hours"),
  conv("Los Angeles", "New York", "PST", "EST", "3 hours"),
  conv("New York", "London", "EST", "GMT", "5 hours"),
  conv("London", "New York", "GMT", "EST", "5 hours"),
  conv("New York", "Berlin", "EST", "CET", "6 hours"),
  conv("Berlin", "New York", "CET", "EST", "6 hours"),
  conv("Los Angeles", "London", "PST", "GMT", "8 hours"),
  conv("London", "Los Angeles", "GMT", "PST", "8 hours"),
  conv("New York", "Mumbai", "EST", "IST", "10.5 hours"),
  conv("Mumbai", "New York", "IST", "EST", "10.5 hours"),
  conv("Los Angeles", "Mumbai", "PST", "IST", "13.5 hours"),
  conv("New York", "Tokyo", "EST", "JST", "14 hours"),
  conv("Tokyo", "New York", "JST", "EST", "14 hours"),
  conv("Los Angeles", "Tokyo", "PST", "JST", "17 hours"),
  conv("Tokyo", "Los Angeles", "JST", "PST", "17 hours"),
  conv("London", "Berlin", "GMT", "CET", "1 hour"),
  conv("Berlin", "London", "CET", "GMT", "1 hour"),
  conv("London", "Mumbai", "GMT", "IST", "5.5 hours"),
  conv("Mumbai", "London", "IST", "GMT", "5.5 hours"),
  conv("London", "Tokyo", "GMT", "JST", "9 hours"),
  conv("Tokyo", "London", "JST", "GMT", "9 hours"),
  conv("London", "Sydney", "GMT", "AEST", "10-11 hours"),
  conv("Sydney", "London", "AEST", "GMT", "10-11 hours"),
  conv("Berlin", "Mumbai", "CET", "IST", "4.5 hours"),
  conv("Berlin", "Tokyo", "CET", "JST", "8 hours"),
  conv("Los Angeles", "Berlin", "PST", "CET", "9 hours"),
  conv("New York", "Dubai", "EST", "GST", "9 hours"),
  conv("London", "Dubai", "GMT", "GST", "4 hours"),
  conv("New York", "Singapore", "EST", "SGT", "13 hours"),
  conv("London", "Singapore", "GMT", "SGT", "8 hours"),
  // City pair conversions
  city("New York", "London"),
  city("London", "New York"),
  city("Seattle", "London"),
  city("San Francisco", "Tokyo"),
  city("Chicago", "Berlin"),
  city("Los Angeles", "Sydney"),
  city("Toronto", "London"),
  city("New York", "Paris"),
  city("San Francisco", "London"),
  city("New York", "Tokyo"),
  // Time in city now
  timeNow("New York"),
  timeNow("London"),
  timeNow("Tokyo"),
  timeNow("Sydney"),
  timeNow("Dubai"),
  timeNow("Singapore"),
  timeNow("Paris"),
  timeNow("Berlin"),
  timeNow("Mumbai"),
  timeNow("Hong Kong"),
  timeNow("Toronto"),
  timeNow("Los Angeles"),
  timeNow("Chicago"),
  timeNow("Seoul"),
  timeNow("Shanghai"),
  timeNow("São Paulo"),
  timeNow("Moscow"),
  timeNow("Istanbul"),
  timeNow("Bangkok"),
  timeNow("Auckland"),
];

export function getSeoRouteBySlug(slug: string): SEORoute | undefined {
  return SEO_ROUTES.find((r) => r.slug === slug);
}
