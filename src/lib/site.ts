/**
 * Canonical site origin for metadata, sitemap, and robots.
 * Override in staging/preview with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://timesync.app";
  return raw.replace(/\/$/, "");
}

/** Absolute canonical URL for a path (e.g. "/" or "/convert"). */
export function canonicalUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/" || path === "") {
    return `${base}/`;
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Open Graph / Twitter image path (relative to metadataBase). */
export const ogImagePath = "/og-image.png";
