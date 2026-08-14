<script setup lang="ts">
/**
 * Brand loading screen. Pure SVG/CSS — no external image, so it can never
 * slow down the very load it's covering for.
 *
 * `.client.vue` suffix: Nuxt never renders this during SSR/prerender, so a
 * user with JS disabled (or a crawler) simply sees the real static page
 * with no overlay and no way to get stuck behind one. Enhancement only.
 *
 * Shown on every load/refresh (no sessionStorage gating). Stays up for a
 * minimum "brand moment", but never longer than actual load takes plus a
 * small safety margin — see MIN_DISPLAY_MS / SAFETY_TIMEOUT_MS below.
 */
const MIN_DISPLAY_MS = 1500
const FADE_MS = 500
const SAFETY_TIMEOUT_MS = 4000

const visible = ref(true)
const exiting = ref(false)
const heroEntranceReady = useHeroEntranceGate()

onMounted(() => {
  const start = Date.now()
  let finished = false

  const finish = () => {
    if (finished) return
    finished = true
    exiting.value = true
    heroEntranceReady.value = true // start the Hero timeline as we begin fading, not after
    window.setTimeout(() => {
      visible.value = false
    }, FADE_MS)
  }

  const afterMinDisplay = () => {
    const elapsed = Date.now() - start
    window.setTimeout(finish, Math.max(MIN_DISPLAY_MS - elapsed, 0))
  }

  if (document.readyState === 'complete') {
    afterMinDisplay()
  } else {
    window.addEventListener('load', afterMinDisplay, { once: true })
  }

  // Safety net: never trap a visitor behind this screen if 'load' is
  // unusually delayed (slow network, a stalled third-party request, etc).
  window.setTimeout(finish, SAFETY_TIMEOUT_MS)
})
</script>

<template>
  <div
    v-if="visible"
    id="loading-screen"
    class="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-5 bg-ink-900 transition-opacity ease-crisp"
    :class="exiting ? 'opacity-0' : 'opacity-100'"
    :style="{ transitionDuration: `${FADE_MS}ms` }"
    role="presentation"
    aria-hidden="true"
  >
    <svg viewBox="0 0 220 112" class="h-20 w-40" fill="none">
      <path d="M20,92 L200,20" stroke="#3A3E45" stroke-width="3" stroke-linecap="square" />
      <path
        class="loading-draw"
        d="M20,92 L200,20"
        stroke="#D97D3C"
        stroke-width="3"
        stroke-linecap="square"
        stroke-dasharray="200"
        stroke-dashoffset="200"
      />
      <g class="loading-mark">
        <path d="M -14,4 L -14,-1 L -7,-6 L 6,-6 L 12,-1 L 14,2 L 14,4 Z" fill="#FAFAF9" />
      </g>
    </svg>
    <p class="font-mono text-xs uppercase tracking-[0.3em] text-mist-100/70">Sompisi Transport</p>
  </div>
</template>
