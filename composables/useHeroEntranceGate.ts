/**
 * Shared signal between LoadingScreen.client.vue and HeroVisual.vue.
 *
 * Without this, the Hero's anime.js entrance timeline (~1.6s) finishes
 * before the first-visit loading screen (~2s minimum) finishes fading out,
 * so the whole choreographed sequence plays silently underneath the opaque
 * overlay and nobody ever sees it. LoadingScreen flips this to `true` the
 * moment it starts fading (or immediately, if it never shows at all —
 * repeat visits, reduced motion, JS-disabled skips this file entirely).
 * HeroVisual waits for it before starting its timeline.
 *
 * Module-scoped ref, not a fresh one per call — every caller shares the
 * same instance, which is what makes this work as a signal.
 */
const heroEntranceReady = ref(false)

export function useHeroEntranceGate() {
  return heroEntranceReady
}