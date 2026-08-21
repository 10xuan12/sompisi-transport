export type TabId = 'home' | 'services' | 'how' | 'who' | 'driver' | 'book'

/**
 * Shared active-tab state for the tabbed layout (AppHeader's "Request a
 * ride" CTA, TabBar, HomeTab's CTA, and pages/index.vue all need to read or
 * set this). Module-scoped ref, not a fresh one per call, so every caller
 * shares the same instance — same pattern as the old useHeroEntranceGate.
 */
const activeTab = ref<TabId>('home')

export function useActiveTab() {
  return activeTab
}
