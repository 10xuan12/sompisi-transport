<script setup lang="ts">
/**
 * Brand loading screen. Pure CSS spinner — no external image, so it can
 * never slow down the very load it's covering for.
 *
 * `.client.vue` suffix: Nuxt never renders this during SSR/prerender, so a
 * user with JS disabled (or a crawler) simply sees the real static page
 * with no overlay and no way to get stuck behind one. Enhancement only.
 *
 * Shown on every load/refresh (no sessionStorage gating). Stays up for a
 * minimum "brand moment", but never longer than actual load takes plus a
 * small safety margin — see MIN_DISPLAY_MS / SAFETY_TIMEOUT_MS below.
 */
const MIN_DISPLAY_MS = 900
const FADE_MS = 500
const SAFETY_TIMEOUT_MS = 4000

const visible = ref(true)
const exiting = ref(false)

onMounted(() => {
  const start = Date.now()
  let finished = false

  const finish = () => {
    if (finished) return
    finished = true
    exiting.value = true
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
    class="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4 bg-navy transition-opacity duration-500 ease-linear"
    :class="exiting ? 'opacity-0' : 'opacity-100'"
    role="presentation"
    aria-hidden="true"
  >
    <div class="loading-spin h-[38px] w-[38px] rounded-full border-[3px] border-white/25 border-t-white" />
    <p class="text-[10px] font-extrabold tracking-[0.22em] text-white/70">SOMPISI TRANSPORT</p>
  </div>
</template>
