<!--
  Brand loading splash. Deliberately NOT a `.client.vue` component: this site
  is fully static-prerendered, so real page content is already painted the
  instant the browser receives the HTML — there is no hydration gap to hide
  behind. A client-only overlay would mount only after Vue hydrates, i.e.
  *after* the real content is already visible, producing a backwards
  "content flashes first, then gets covered, then uncovered again" sequence.

  Rendering this as normal SSR/prerendered markup means it's part of the
  very first paint, covering the content from frame one. All timing (hold,
  then fade) is pure CSS (see .loading-screen / @keyframes in main.css) —
  no JS required, so it can never depend on a 'load' event that might fire
  late, and a JS-disabled visitor still gets the fade-out (CSS animations
  run without JS) instead of being stuck behind it forever.
-->
<template>
  <div
    id="loading-screen"
    class="loading-screen pointer-events-none fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4 bg-navy"
    role="presentation"
    aria-hidden="true"
  >
    <div
      class="loading-spin h-[38px] w-[38px] rounded-full border-[3px] border-white/25 border-t-white"
    />
    <p class="text-[10px] font-extrabold tracking-[0.22em] text-white/70">SOMPISI TRANSPORT</p>
  </div>
</template>
