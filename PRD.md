# Product Requirements Document (PRD)

**Product:** TimeSync  
**Type:** Web application (time zone converter & meeting planner)  
**Stack:** Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui  
**Document version:** 1.0  
**Last updated:** March 2026  

---

## 1. Executive summary

TimeSync is a free, client-first web app that helps remote workers and distributed teams compare times across cities, spot overlapping business hours, and share or export proposed meeting times—without creating an account. The product emphasizes speed, clarity (visual timeline + clocks), and shareable URLs for collaboration.

---

## 2. Problem statement

Coordinating meetings across time zones is error-prone: mental math fails around DST, static tables do not show “what if we meet at 4pm their time?”, and copying times into email or calendar is tedious. Users need a fast, trustworthy view of multiple zones at once, plus an easy way to send the same setup to others.

---

## 3. Goals

| Goal | Description |
|------|-------------|
| **G1** | Let users compare **multiple cities** (on the order of 2–10) with live, DST-aware local times. |
| **G2** | Make **overlap / business-hour context** visible without manual calculation. |
| **G3** | Support **shareable links** that restore city set and reference time via URL query parameters. |
| **G4** | Enable **calendar handoff** (e.g. Google Calendar, Outlook, `.ics` download). |
| **G5** | Achieve **organic discovery** via SEO landing pages for common conversions and “time in city now” queries. |
| **G6** | Ship with **clear legal/help** surfaces (Help, Terms of Use, Privacy). |

### Success metrics (indicative)

- Time-to-first-use: user reaches a meaningful multi-city view in under ~1 minute without signup.  
- Share URL usage: measurable clicks/returns via `zones` / `time` query usage (analytics, if added).  
- SEO: indexable routes, valid `sitemap.xml` / `robots.txt`, stable Core Web Vitals on key templates.  
- Qualitative: low support burden (Help page covers primary flows).

---

## 4. Target users & personas

1. **Remote individual** — schedules 1:1s or small group calls across 2–4 time zones.  
2. **Team lead / ops** — proposes a few recurring windows and shares a link in Slack/email.  
3. **Freelancer / consultant** — compares client regions quickly and exports to personal calendar.  
4. **Searcher (SEO)** — lands on a pre-filled pair (e.g. EST ↔ PST) or “time in London now” from search.

---

## 5. Scope

### 5.1 In scope (current product)

- **Marketing home** (`/`): value proposition, feature highlights, CTAs to converter.  
- **Core converter** (`/convert`): city search & selection, clock grid, draggable timeline, overlap indicator, reset-to-now, share link, calendar export.  
- **URL-driven state**: `?zones=City1,City2,...` and optional `?time=ISO8601` to hydrate the converter.  
- **SEO program pages** (static slugs from `SEO_ROUTES`): pre-seeded cities and long-form copy per slug; server metadata (`title`, `description`, canonical, Open Graph, Twitter).  
- **Information architecture**: Help, Terms of Use, Privacy policy pages.  
- **Global chrome**: header navigation, footer with popular links + legal.  
- **Branding**: favicon / app icon, OG image for social previews.  
- **Technical**: sitemap, robots, `metadataBase` / `NEXT_PUBLIC_SITE_URL` for environment-aware absolute URLs.

### 5.2 Out of scope (explicit)

- User accounts, saved preferences sync, or server-side storage of user city lists.  
- Guaranteed legal/financial accuracy of times (disclaimers apply).  
- Native mobile apps (web-first).  
- Paid billing / subscription flows in product UI (future “Pro” may be marketed but not required for MVP delivery in this PRD).

### 5.3 Future considerations (backlog / roadmap hints)

- **Pro tier** (as teased on marketing): unlimited favorites, custom work hours, widgets, API, ad-free—requires separate PRD for auth, billing, and data model.  
- Optional **analytics** (privacy-preserving) for conversion funnels and SEO validation.  
- **Accessibility audit** (WCAG 2.1 AA) and keyboard-first timeline interactions.  
- **i18n** / localized city names and UI copy.

---

## 6. Functional requirements

### 6.1 Converter

| ID | Requirement | Priority |
|----|-------------|----------|
| F-1 | User can add/remove cities from a searchable catalog (`CITIES`). | P0 |
| F-2 | App displays a clock card per selected city for a **reference time** (default: “now”, updating every minute until overridden). | P0 |
| F-3 | User can change reference time via **timeline slider** (manual mode stops auto “now” updates until reset). | P0 |
| F-4 | **Reset to now** restores live clock behavior. | P0 |
| F-5 | **Overlap / business hours** visualization reflects reference time across selected zones. | P0 |
| F-6 | **Share** copies a URL including `zones` and `time` (origin from `window.location`). | P0 |
| F-7 | **Export** offers Google Calendar, Outlook, and `.ics` download for the proposed slot. | P0 |
| F-8 | Initialization order: URL query **>** SEO page props (`defaultZones`) **>** auto-detect user timezone with fallback city set. | P0 |

### 6.2 SEO & content

| ID | Requirement | Priority |
|----|-------------|----------|
| S-1 | Each configured slug is a static route with unique metadata and optional body copy below the tool. | P0 |
| S-2 | Unknown slugs return 404 (`dynamicParams = false` where applicable). | P0 |
| S-3 | Sitemap lists home, converter, help, legal, and all SEO slugs. | P0 |
| S-4 | Robots allow crawling and reference the sitemap URL. | P0 |

### 6.3 Trust & policy

| ID | Requirement | Priority |
|----|-------------|----------|
| L-1 | Help explains sharing, export, DST caveats, and links to Terms/Privacy. | P0 |
| L-2 | Terms of Use and Privacy policy are published and linked from footer (and Help where relevant). | P0 |

---

## 7. Non-functional requirements

| ID | Category | Requirement |
|----|----------|-------------|
| N-1 | Performance | Production build optimized; avoid unnecessary client JS on static marketing-only surfaces where feasible. |
| N-2 | SEO | Valid HTML titles/descriptions; canonical URLs; social preview images. |
| N-3 | Security | No sensitive server-side storage of user picks; clipboard/share flows fail gracefully with user-visible toast. |
| N-4 | Compatibility | Modern evergreen browsers; responsive layout for desktop-first use with usable mobile layout. |
| N-5 | Maintainability | Typed TS, ESLint (incl. Next core-web-vitals), Vitest for unit tests where valuable. |
| N-6 | Deploy | Configurable public site URL via `NEXT_PUBLIC_SITE_URL` for previews/staging. |

---

## 8. User journeys (summary)

1. **Land → convert:** Home → “Start converting” → add cities → adjust time → share or export.  
2. **Deep link:** Open shared `/convert?zones=...&time=...` → same state restored.  
3. **SEO:** Search → land on `/est-to-pst` (example) → adjust timeline → share.  
4. **Support:** Footer → Help / Terms / Privacy.

---

## 9. Dependencies & constraints

- **Time zone data** relies on browser `Intl` and bundled city → IANA zone mapping; DST edge cases must be communicated in Help.  
- **Third-party calendar links** depend on Google/Outlook URL schemes; `.ics` is the offline-friendly fallback.  
- **No backend** for core converter state: share links are the persistence mechanism.

---

## 10. Open questions

1. Official support contact (email/form) to replace placeholder copy in Terms/Privacy.  
2. Whether to add analytics and, if so, which regions require consent banners.  
3. Roadmap and scope for **Pro** (auth provider, payments, feature flags).  
4. Target locales/languages if expanding beyond English.

---

## 11. Glossary

| Term | Meaning |
|------|---------|
| **Reference time** | The instant in time the UI uses to render all zone clocks and the timeline. |
| **SEO slug** | A static path (e.g. `/time-in-london-now`) with configured zones and marketing copy. |
| **DST** | Daylight Saving Time transitions affecting offsets. |

---

*This PRD describes the product intent and requirements as implemented in the repository; change control should update this document when scope shifts materially.*
