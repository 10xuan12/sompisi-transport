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
        // Professional chauffeur-service palette: one dark neutral base,
        // one warm accent, one low-saturation light neutral. Deliberately
        // NOT a multi-hue "friendly illustration" palette.
        ink: {
          50: '#F5F6F7',
          100: '#E8E9EB',
          200: '#CFD2D6',
          300: '#A9AEB5',
          400: '#7B818A',
          500: '#565B63',
          600: '#3A3E45',
          700: '#262A30',
          800: '#1A1D23', // primary dark base
          900: '#101216'
        },
        amber: {
          50: '#FCF1E7',
          100: '#F7DCC0',
          200: '#EFBD8C',
          300: '#E7A066',
          400: '#E08B4C',
          500: '#D97D3C', // single accent — used everywhere a highlight color is needed
          600: '#B8632A',
          700: '#8F4C21',
          800: '#693819',
          900: '#452510'
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
        card: '0 1px 2px rgba(16,18,22,0.05), 0 2px 6px -2px rgba(16,18,22,0.08), 0 12px 28px -10px rgba(16,18,22,0.14)',
        'card-hover': '0 1px 2px rgba(16,18,22,0.06), 0 4px 10px -2px rgba(16,18,22,0.1), 0 20px 40px -12px rgba(16,18,22,0.2)',
        'card-lg': '0 2px 4px rgba(16,18,22,0.05), 0 8px 16px -4px rgba(16,18,22,0.1), 0 24px 48px -16px rgba(16,18,22,0.18)'
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
