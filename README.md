# Realm Space Properties: website

Marketing and listings site for Realm Space Properties Ltd, Kampala. The look follows `reference/design.jpg` (colours were sampled from it). Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, `next/font` and `next/image`. Dark theme only, with one accent colour.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Production build (also typechecks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck only (run `npx next typegen` first on a fresh clone) |
| `node scripts/screenshots.mjs http://localhost:3000` | Full-page screenshots at 390, 768 and 1440 px into `screenshots/` |

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical URLs, Open Graph, sitemap, JSON-LD |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | International format, e.g. `+256700000000`. Used by every WhatsApp link |
| `RESEND_API_KEY` | For email | [Resend](https://resend.com) API key |
| `INQUIRY_TO_EMAIL` | For email | Inbox for enquiries. Comma-separate several addresses |
| `INQUIRY_FROM_EMAIL` | Optional | Sender on a domain verified in Resend. Defaults to Resend's test sender |

Without `RESEND_API_KEY` and `INQUIRY_TO_EMAIL`:
- In **development**, form submissions are printed to the terminal and the form still shows success.
- In **production**, the API returns an error and asks the visitor to use WhatsApp, so enquiries are never silently lost.

## Where things live

```
app/                    Pages (App Router), API route, sitemap, robots, icon
  api/inquiry/route.ts  Form endpoint: zod validation, honeypot, Resend email
  fonts.ts              Display and body fonts (swap here)
  globals.css           Design tokens (colours, fonts, motion)
components/
  layout/               Header, Footer, Logo, PageHeader, WhatsApp button
  listings/             Cards, filters, gallery, map, detail-page layout
  forms/                InquiryForm (all four forms) and field primitives
  ui/                   Buttons, stat blocks, ghost text, Photo, FadeUp, icons
data/
  site.ts               Business details, nav, stats, services, testimonials, page copy
  land.ts | apartments.ts | stays.ts   Listings (typed by data/types.ts)
lib/                    Validation schemas, formatting, SEO helpers
public/images/          Photos + CREDITS.md
```

## Placeholder content

Everything invented for the build (phone, email, address, registration number, stats, testimonials, founder, fees, all listings and reviews) is marked **PLACEHOLDER**. Find it all with:

```bash
grep -rn "PLACEHOLDER\|REPLACE" data app components
```

## Adding a listing

1. Put the photos in `public/images/` with descriptive names, e.g. `land-07.jpg`. Landscape photos around 1600 px wide work best.
2. Open `data/land.ts`, `data/apartments.ts` or `data/stays.ts`, copy an existing entry and edit it:
   - `slug`: unique, lowercase, hyphenated. It becomes the URL (`/land/<slug>`).
   - `images`: the first image is the card and social-share image. Write a real `alt` description for each.
   - `geo`: in Google Maps, right-click the location and click the coordinates to copy them.
   - Prices are in UGX as plain numbers (`85_000_000`).
   - Apartments: never add owner names or contacts. Enquiries always go through Realm Space.
   - Stays: set `airbnbUrl` to the listing's Airbnb link, or `""` to hide the button.
   - Set `featured: true` to make it eligible for the Home page "Featured Properties" row.
3. Save. The listing page, detail page, sitemap entry and JSON-LD are generated automatically.

The data files are shaped like CMS collections (see `data/types.ts`), so they can later be replaced by CMS queries without changing the components.

## Swapping fonts

Edit `app/fonts.ts`. Replace `Unbounded` (display) and/or `Quicksand` (body) with any other `next/font/google` family, keeping the `variable` names (`--font-display-face`, `--font-body-face`). Nothing else needs to change.

## Swapping photos

All photos are plain files in `public/images/`. Replace a file with one of the **same name** and it updates everywhere. The site applies the same grading to every photo (`.photo-grade` in `globals.css`, plus a dark gradient in `components/ui/Photo.tsx`), so new photos blend in. Moody dusk or overcast shots with warm interior light work best. Update `public/images/CREDITS.md` when you replace a photo.

The current photos come from Unsplash under the Unsplash License. Replace them with the client's own photos before launch where possible, and always for real listings.

## Forms

One component, `components/forms/InquiryForm.tsx`, renders all four forms via `variant`:

| Variant | leadType | Used on |
|---|---|---|
| `owner` | `owner` | Home CTA band, /owners (file upload: up to 5 files, 5 MB each) |
| `listing` | `buyer` | Land and apartment detail pages (hidden property title and slug) |
| `stay` | `guest` | Short-stay detail pages |
| `contact` | `general` | /contact |

The same zod schemas (`lib/inquiry.ts`) validate in the browser (inline errors) and on the server. A hidden `company_website` honeypot field silently drops bot submissions. After a successful send, visitors get a "Continue on WhatsApp" button prefilled with their details.

> **Hosting note:** serverless hosts limit request bodies (Vercel: about 4.5 MB). Large owner uploads can exceed that. If owners regularly send big files, move uploads to direct-to-storage uploads (e.g. Vercel Blob or S3 presigned URLs) and email the links instead.

## SEO

- Per-page `metadata` with Open Graph and Twitter cards (`lib/seo.tsx`)
- `app/sitemap.ts` and `app/robots.ts`, built from `NEXT_PUBLIC_SITE_URL`
- JSON-LD: `RealEstateAgent` sitewide; `Residence` for apartments and stays; `Place` with an offer for land plots

## Accessibility and motion

Semantic landmarks, a skip link, visible focus rings, labelled form errors, and a keyboard-navigable full-screen mobile menu (focus trap, Escape to close). The hero zoom, fade-ups and card hover effects are switched off under `prefers-reduced-motion`.
