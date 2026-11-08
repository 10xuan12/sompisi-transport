# Sompisi Transport

Mobile-first website for a small, family-run private driving service in Mbabane, Eswatini.
**Live:** https://sompisi-transport.netlify.app/

## The problem

Travellers landing in Eswatini had no way to find this service online, judge whether it was
trustworthy, or book it without already having the owner's number.

## What I built

- **Who's behind the wheel.** The site names the real owner and driver, so a traveller knows
  exactly who will pick them up.
- **Booking form → WhatsApp.** The form validates the trip details (service, passengers,
  pickup, destination, date, flight number for airport transfers) and turns them into a
  pre-filled WhatsApp message to the owner, who already runs the business on WhatsApp.
- **Six tabs on one page.** Home, Services, How it works, Who, Driver and Book — built for
  thumbs on a phone, not scrolling a long page.

## Decisions and trade-offs

- **WhatsApp is the whole back end.** No server, database or login: `utils/whatsapp.ts`
  builds a `wa.me` deep link from the form. Running cost is $0, and the owner doesn't have
  to learn a new tool. The trade-off: there's no booking record on our side.
- **Fully static.** Nuxt 3 prerenders a single route and Netlify serves the files.
- **Loading screen in CSS, not JavaScript.** It began as a client-only component, which
  only mounted after hydration — so the content flashed, got covered, then uncovered.
  Making it part of the prerendered markup and fading it with CSS fixed the glitch.
- **Shared state without a library.** The active tab is a module-scoped `ref` in
  `composables/useActiveTab.ts`, read by the header, tab bar and CTAs. No Pinia needed.
- **Contrast fixes.** Low-contrast CTA buttons and small text were corrected after review.

## Stack

Nuxt 3 · Vue 3 · TypeScript · Tailwind CSS · @nuxtjs/sitemap · Netlify

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build in .output/public (what Netlify deploys)
```

## Status

Live and ready for the owner to share. Not yet promoted, so there's no traffic or booking data yet.
