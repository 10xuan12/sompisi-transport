import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Professional chauffeur-service palette (Plan B): one dark neutral
        // base, one accent, one low-saturation light neutral. Deliberately
        // NOT a multi-hue "friendly illustration" palette.
        ink: {
          50: '#F6F6F6',
          100: '#E8E9E9',
          200: '#D0D1D3',
          300: '#ABADAF',
          400: '#7D7F83',
          500: '#55585D',
          600: '#363A40',
          700: '#21252C',
          800: '#14181F', // primary dark base
          900: '#0C0F13'
        },
        // Brightened red-brown accent, replaces the earlier amber. Named
        // "garnet" rather than keeping the old "amber" key — the hue moved
        // far enough that the old name would actively mislead anyone
        // reading a class like bg-amber-500 and seeing a red-brown swatch.
        garnet: {
          50: '#F5EBEB',
          100: '#E6CACA',
          200: '#CF9B9B',
          300: '#BC7272',
          400: '#AD5353',
          500: '#A13A3A', // single accent — used everywhere a highlight color is needed
          600: '#7E2D2D',
          700: '#622323',
          800: '#481A1A',
          900: '#2F1111'
        },
        mist: {
          50: '#FAFAF9',
          100: '#F3F3F1',
          200: '#E7E7E4',
          300: '#D3D3CF',
          400: '#B4B4AE'
        }
      },
      fontFamily: {
        // A geometric sans with real character (not Inter/Poppins) for
        // headings — pairs with the plain grotesque body to feel edited,
        // not templated. Weight jump from body (400/500) to display
        // (600/700) is what carries the hierarchy now that both are sans.
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Karla"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backgroundImage: {
        'dotted-line':
          'repeating-linear-gradient(90deg, currentColor 0, currentColor 6px, transparent 6px, transparent 14px)'
      },
      boxShadow: {
        // Layered "resting" shadow for light cards — a tight contact
        // shadow plus a soft ambient one, instead of one flat blur.
        card: '0 1px 2px rgba(12,15,19,0.05), 0 2px 6px -2px rgba(12,15,19,0.08), 0 12px 28px -10px rgba(12,15,19,0.14)',
        'card-hover': '0 1px 2px rgba(12,15,19,0.06), 0 4px 10px -2px rgba(12,15,19,0.1), 0 20px 40px -12px rgba(12,15,19,0.2)',
        'card-lg': '0 2px 4px rgba(12,15,19,0.05), 0 8px 16px -4px rgba(12,15,19,0.1), 0 24px 48px -16px rgba(12,15,19,0.18)'
      },
      transitionTimingFunction: {
        // Crisp, no-overshoot motion signature. Overriding DEFAULT means
        // every transition-* utility (transition-colors, transition-all, …)
        // picks this up automatically without adding an ease-* class
        // everywhere by hand — and it rules out Tailwind's built-in
        // bounce/spring-flavoured eases from ever sneaking back in.
        DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
        crisp: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}
