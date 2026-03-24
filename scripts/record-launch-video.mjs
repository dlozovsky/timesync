/**
 * Records a ~30s browser tour of TimeSync for a launch / demo video.
 *
 * Prerequisites:
 *   1. Start the app: npm run dev (or set LAUNCH_VIDEO_URL to a running URL)
 *   2. Chromium for Playwright: npx playwright install chromium
 *
 * Run:
 *   LAUNCH_VIDEO_URL=http://localhost:3001 node scripts/record-launch-video.mjs
 *
 * Output: output/launch-video/*.webm (path printed at end)
 */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const baseURL = (process.env.LAUNCH_VIDEO_URL || "http://localhost:3000").replace(/\/$/, "");
const outDir = join(process.cwd(), "output", "launch-video");

mkdirSync(outDir, { recursive: true });

const width = 1920;
const height = 1080;

console.log(`Recording tour of ${baseURL} → ${outDir}`);
console.log("Using viewport", width, "x", height, "(~30s)\n");

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width, height },
  recordVideo: {
    dir: outDir,
    size: { width, height },
  },
});

const page = await context.newPage();

try {
  await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await delay(5000);

  await page.evaluate(() => window.scrollTo({ top: 480, behavior: "smooth" }));
  await delay(4500);

  await page.goto(`${baseURL}/convert`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await delay(6000);

  await page.evaluate(() => window.scrollTo({ top: 720, behavior: "smooth" }));
  await delay(5000);

  await page.goto(`${baseURL}/est-to-pst`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await delay(6000);

  await page.evaluate(() => window.scrollTo({ top: 400, behavior: "smooth" }));
  await delay(3500);

  await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await delay(4000);
} finally {
  await page.close();
  await context.close();
  await browser.close();
}

console.log("\nDone. Your video is a .webm file in:");
console.log(outDir);
console.log("\nTip: Convert to MP4 with FFmpeg:");
console.log('  ffmpeg -i "output/launch-video/<file>.webm" -c:v libx264 -crf 18 -preset medium launch.mp4');
console.log("\nAdd voiceover / music in CapCut, iMovie, or DaVinci Resolve.");
