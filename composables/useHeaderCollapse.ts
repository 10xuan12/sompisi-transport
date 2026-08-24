const COLLAPSE_THRESHOLD_PX = 48

/**
 * Shared "header should be collapsed" flag — module-scoped ref, same
 * pattern as useActiveTab. AppHeader reads it to switch between its full
 * and slim layouts.
 *
 * The scroll listener that drives it is attached lazily, once, the first
 * time this is called — guarded by `started` so re-mounting AppHeader
 * (or any future caller) never double-attaches it. `import.meta.client`
 * guards the `window` access since this runs during setup(), which (unlike
 * onMounted) also executes on the server for a normal SSR/prerendered
 * component.
 */
const isHeaderCollapsed = ref(false)
let started = false

export function useHeaderCollapse() {
  if (!started && import.meta.client) {
    started = true
    const onScroll = () => {
      isHeaderCollapsed.value = window.scrollY > COLLAPSE_THRESHOLD_PX
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
  return isHeaderCollapsed
}
