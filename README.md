# Pulliam Sheetrock Service

Static marketing site built for Cloudflare Pages.

## Deploy

- Framework preset: `None`
- Build command: none
- Build output directory: `/`

## Structure

```
index.html                  Home page
404.html                    Not-found page (noindex)
styles.css                  Single stylesheet / design tokens in :root
script.js                   Reveal-on-scroll, mobile nav, gallery lightbox
sitemap.xml                 Home + all city pages
sheetrock-<city>-<st>/      One local landing page per town
assets/                     Images (.webp is what ships; .jpg kept as source)
```

### City landing pages

Local SEO runs on one page per town, each at `/sheetrock-<city>-<state>/`:
Corinth, Oxford, Ripley, Tupelo, New Albany, Booneville, Southaven (MS) and
Pickwick (TN). Each page has its own title, meta description, H1, body copy,
service focus, FAQ, and `Service` + `BreadcrumbList` + `FAQPage` schema. They
are cross-linked from the home page service-area grid and from every footer.

**These pages must keep genuinely distinct copy.** Duplicating one page across
towns with the name swapped is what Google treats as a doorway page, and it
will hurt rankings rather than help them.

To add a town, copy an existing directory, then update: `<title>`, meta
description, canonical, the JSON-LD block, H1, lead, intro paragraphs, the
three focus cards, the nearby-towns list, and the FAQ. Add the URL to
`sitemap.xml`, and add a link in the home page `#areas` grid and in the footer
of every page.

## Conventions

- `styles.css` and `script.js` are referenced with a `?v=N` query string. **Bump
  `N` on every page whenever you change either file** — `_headers` caches them
  for a week, so without a bump returning visitors keep the old copy.
- Images ship as `.webp`. The matching `.jpg` files are kept as originals and
  are not referenced by any page.
- Every `<img>` needs explicit `width` and `height` so the layout does not shift
  while images load.
- Content is visible by default. The scroll-reveal animation only applies once
  `script.js` adds the `js` class to `<html>`, so a JS failure degrades to a
  plain visible page rather than a blank one.

## Google Business Profile

The listing is **Pulliam Sheetrock Service LLC**, category "Drywall contractor",
registered as a *service-area business* — it has no public street address, only
a service-area centre point. Details on the site are taken from it:

- Hours (Mon 6-5, Tue 7-5, Wed 6:30-5, Thu-Sun 6-5) are shown in the
  service-area panel and marked up as `openingHoursSpecification`.
- `legalName`, `geo`, `hasMap` and `sameAs` point at the profile.
- Profile: `https://www.google.com/maps?cid=15387246880298957759`
- Write a review: the same place with the `!12e1` suffix, which opens the
  review composer for signed-in users.

The CID comes from the profile URL's `!1s0x40f0ca8b9b483b0f:0xd58a7b833374fbbf`
— the second hex value converted to decimal.

### The rating is hardcoded

"5.0" and "3 Google reviews" are written into `index.html` in two places (the
hero chip and the review panel). **They do not update themselves** — re-check
the profile and edit both when the review count moves.

### Why there is no aggregateRating markup

Deliberate. Google's structured-data policy does not allow a site to mark up
ratings it collected from another platform, and self-serving `aggregateRating`
on `LocalBusiness` can trigger a manual action. Showing the rating as visible
text linked to the source is fine; marking it up is not. Add `Review` /
`AggregateRating` only if reviews are ever collected on this site directly.

## Known gaps

- No street address is published, which is correct for a service-area business.
  If a physical office is ever added, put it in the profile first, then in the
  `PostalAddress` block in `index.html`.
- Consider adding the second phone number (662-671-2470) that appears on some
  Facebook posts, if it is still in use — it is not on the Google listing, so it
  was left off.
