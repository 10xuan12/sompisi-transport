# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Nuxt dev server (default port 3000)
- `npm run generate` — static-generate the site into `.output/public` (this is the deploy artifact; Netlify builds with this)
- `npm run build` — SSR-mode production build (not what's deployed; `generate` is)
- `npm run preview` — serve the last `generate`/`build` output locally
- No lint or test scripts are configured in `package.json` — there is no test suite in this repo.

## Architecture

**Static site, no backend.** `nuxt.config.ts` sets `ssr: true` with `nitro.prerender.routes: ['/']` and `crawlLinks: true` — the whole site is one prerendered route (`pages/index.vue`). There is no API, database, auth, or CMS anywhere in this project; all copy/content is hardcoded in `.vue` files.

**WhatsApp is the entire backend.** The site's one real piece of business logic is `utils/whatsapp.ts`'s `buildWhatsAppLink(message, phoneNumber?)`, which formats a `https://wa.me/<digits>?text=<encoded>` deep link. `components/BookingForm.vue` composes form fields into a plain-text message client-side and opens that link on submit — there is no server round-trip, no persistence, and "booking" only means starting a pre-filled WhatsApp chat with the owner.

**Tab-based single page, not scroll sections.** The site is one route rendering six mutually-exclusive sections (Home/Services/How/Who/Driver/Book) toggled by client state, not `<router-view>` pages. The active tab lives in `composables/useActiveTab.ts` — a **module-scoped `ref`**, not Pinia/Vuex, shared by every import of the composable. `AppHeader`, `TabBar`, and `HomeTab`'s CTA all read/write this same ref directly to switch tabs, so there's no prop-drilling from `pages/index.vue`. This module-scoped-ref-as-shared-state is the established pattern in this codebase for any small piece of cross-component state — reuse it rather than introducing a state library.

**Component resolution has no path prefix.** `nuxt.config.ts` sets `components: [{ path: '~/components', pathPrefix: false }]`, so a component in a subfolder (e.g. `components/tabs/HomeTab.vue`) is still referenced as `<HomeTab />`, not `<TabsHomeTab />`. Keep component filenames globally unique across subfolders.

**`LoadingScreen.vue` is deliberately NOT `.client.vue`, and its timing is pure CSS, not JS.** It used to be a `.client.vue` component with a JS `setTimeout` fade — but on a fully static-prerendered site, real content is already painted in the very first frame, so a client-only overlay only mounts *after* hydration, i.e. after the content it's supposed to cover is already visible (a visible "content flashes, then gets covered, then uncovered" glitch). It's now normal SSR/prerendered markup (part of the first paint) faded out purely via the `.loading-screen`/`@keyframes loading-fade-out` rules in `assets/css/main.css` — no JS involved, so it can't depend on a `load` event firing late, and it still degrades correctly with JS disabled (CSS animations run without JS). If you reach for `.client.vue` elsewhere in this repo, make sure the component doesn't need to be visible in the very first paint — that's the failure mode that bit this one.

**Tab content owns its own data.** Each `components/tabs/*.vue` defines its own static content array (services list, steps, traveler types, team members) inline in its `<script setup>`, rather than pulling from a shared data file or props passed down from `pages/index.vue`. Follow this pattern for new tab content.

**Design tokens live in `tailwind.config.ts`.** Two brand colors as plain hex strings — `navy` (`#12233d`) and `burgundy` (`#7a1f2b`) — not 50–900 scales. Use Tailwind's opacity modifiers (`text-navy/60`, `border-white/10`) for tints instead of adding scale steps. Font is a single Roboto family (`font-sans`), loaded via a `<link>` in `nuxt.config.ts`'s `app.head` (not `@import` in CSS, so the font request isn't blocked from early discovery).

## Key files

- `pages/index.vue` — the whole page shell: `AppHeader` → `TabBar` → active tab component → `AppFooter` → floating `WhatsAppButton`
- `composables/useActiveTab.ts` — shared tab state (see above)
- `utils/whatsapp.ts` — `WHATSAPP_NUMBER` (owner's real number) and `buildWhatsAppLink()`
- `components/BookingForm.vue` — the only form with real logic (validation, conditional airport-terminal field, message composition)
- `nuxt.config.ts` — SEO meta (OG/Twitter tags, sitemap config via `@nuxtjs/sitemap`), Google Fonts link, prerender routes
