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
        // Sompisi Transport redesign (2026): deep navy + a single burgundy
        // accent, both plain hex strings rather than 50-900 scales. Tailwind's
        // opacity modifiers (text-navy/60, border-white/10, ...) reproduce
        // every rgba(21,34,56,.x) / rgba(255,255,255,.x) value from the
        // design mock directly, so a manual tint scale isn't needed.
        navy: '#12233d',
        burgundy: '#7a1f2b'
      },
      fontFamily: {
        // Single Roboto family for the whole site — hierarchy comes from
        // weight (400-800) and letter-spacing, not from mixing typefaces.
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
