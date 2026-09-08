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

## Known gaps

- The `LocalBusiness` schema in `index.html` has no street address, city, or
  postal code, and no opening hours — only `addressRegion: MS`. Google Business
  Profile matching and local-pack ranking both improve a lot once a real
  address (or a declared service-area business) and hours are filled in.
- There are no reviews or ratings on the site. `Review` / `AggregateRating`
  markup is worth adding once there are real reviews to point at — do not add
  it without them.
