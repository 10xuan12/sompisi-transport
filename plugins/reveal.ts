/**
 * v-reveal: scroll-triggered fade+rise-in for cards/sections.
 *
 * Client-only by filename convention (.client.ts) so it never touches the
 * DOM during static prerendering. Progressive enhancement: if JS never
 * runs, elements simply keep their normal opacity/position — nothing is
 * hidden by default in CSS, the "hidden" state is only applied once this
 * plugin decides to animate an element in.
 *
 * Usage: `v-reveal` or `v-reveal="index * 100"` (stagger delay in ms).
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') return

      const delay = typeof binding.value === 'number' ? binding.value : 0
      el.style.setProperty('--reveal-delay', `${delay}ms`)
      el.classList.add('reveal')

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('reveal-visible')
              observer.unobserve(el)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
      observer.observe(el)
    }
  })
})
