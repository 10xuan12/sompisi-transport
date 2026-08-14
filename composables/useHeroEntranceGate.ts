/**
 * Shared signal between LoadingScreen.client.vue and HeroVisual.vue.
 *
 * Without this, the Hero's anime.js entrance timeline (~1.6s) finishes
 * before the loading screen (~2s minimum, shown on every load/refresh)
 * finishes fading out, so the whole choreographed sequence plays silently
 * underneath the opaque overlay and nobody ever sees it. LoadingScreen
 * flips this to `true` the moment it starts fading; HeroVisual waits for
 * that before starting its own timeline. (Irrelevant for reduced-motion or
 * JS-disabled visitors — HeroVisual never consults this gate in either
 * case, since it bails out to the CSS fallback before reaching it.)
 *
 * Module-scoped ref, not a fresh one per call — every caller shares the
 * same instance, which is what makes this work as a signal.
 */
const heroEntranceReady = ref(false)

export function useHeroEntranceGate() {
  return heroEntranceReady
}