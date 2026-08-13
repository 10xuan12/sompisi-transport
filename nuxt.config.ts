// TODO: 換成正式上線網域 (replace with the real production domain before launch).
// Required for absolute URLs in the sitemap and for og:image/og:url to
// resolve correctly when the site is shared in WhatsApp/Facebook previews.
const SITE_URL = 'https://sompisitransport.example'

const SEO_TITLE = 'Sompisi Transport - Private Airport Transfer & Chauffeur Service in Eswatini'
const SEO_DESCRIPTION =
  'Reliable private airport transfers, in-country rides, and cross-border trips in Eswatini. Message Sompisi Transport directly on WhatsApp to book — no app, no account.'

export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',

  // Static generation only: no server runtime, no database, no auth, no CMS.
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  devtools: { enabled: true },

  // Without this, Nuxt's default auto-import prefixes nested folder names
  // onto component tags (components/illustrations/HeroVisual.vue would only
  // resolve as <IllustrationsHeroVisual>). Disabling pathPrefix keeps every
  // component addressable by its own filename, e.g. <HeroVisual />.
  components: [{ path: '~/components', pathPrefix: false }],

  // @nuxtjs/sitemap is a free, official Nuxt module — generates sitemap.xml
  // automatically at `nuxt generate` time, no paid service involved.
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

  site: {
    url: SITE_URL,
    name: 'Sompisi Transport'
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: SEO_TITLE,
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: SEO_DESCRIPTION },
        { name: 'robots', content: 'index, follow' },

        // Open Graph — this is what renders the preview card when a link is
        // pasted into WhatsApp/Facebook, which matters a lot for a business
        // that mostly spreads by word of mouth / shared links.
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Sompisi Transport' },
        { property: 'og:title', content: SEO_TITLE },
        { property: 'og:description', content: SEO_DESCRIPTION },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:image', content: `${SITE_URL}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Sompisi Transport — private transfers in Eswatini' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter card falls back to the same OG image/description.
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SEO_TITLE },
        { name: 'twitter:description', content: SEO_DESCRIPTION },
        { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }
      ],
      link: [
        // Preconnect before the stylesheet request so the font files start
        // downloading as early as possible (better Lighthouse LCP score
        // than loading fonts via a CSS @import).
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Karla:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap'
        }
      ],
      htmlAttrs: { lang: 'en' }
    }
  }
})
