<script setup lang="ts">
// TODO: 待客戶提供實際車輛/司機照片後，可替換此處插畫為真實照片以提升信任感
// (Once the client supplies real vehicle/driver photos, swap this illustration
// for an <img alt="Sompisi Transport driver familiar with local routes in
// Eswatini"> here — the aspect-ratio frame below is sized so a photo can
// drop straight in without touching the surrounding layout. Update the
// aria-label below to a real alt text at the same time.)
</script>

<template>
  <div
    class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-800/15 bg-mist-50 shadow-card"
  >
    <svg
      viewBox="0 0 400 320"
      class="h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Illustration of a signpost and a planned route with waypoints, representing familiarity with local roads"
    >
      <defs>
        <linearGradient id="trust-post" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#262A30" />
          <stop offset="100%" stop-color="#101216" />
        </linearGradient>
        <linearGradient id="trust-marker" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E08B4C" />
          <stop offset="100%" stop-color="#B8632A" />
        </linearGradient>
      </defs>

      <!-- ground -->
      <rect x="0" y="250" width="400" height="70" fill="#E7E7E4" />

      <!-- planned route: straight legs and marked waypoints, not a
           meandering line — reads as "known route", not "wandering path" -->
      <path
        class="draw-path draw-path-onreveal"
        style="--draw-length: 520"
        d="M32,238 L112,238 L112,158 L224,158 L224,108 L336,108"
        fill="none"
        stroke="#D97D3C"
        stroke-width="3"
        stroke-linecap="square"
        stroke-dasharray="14 10"
      />
      <g fill="#D97D3C">
        <circle cx="112" cy="238" r="4" />
        <circle cx="112" cy="158" r="4" />
        <circle cx="224" cy="158" r="4" />
        <circle cx="224" cy="108" r="4" />
      </g>

      <!-- signpost -->
      <line x1="128" y1="260" x2="128" y2="96" stroke="url(#trust-post)" stroke-width="5" stroke-linecap="square" />
      <g stroke="#101216" stroke-width="3" fill="#FAFAF9">
        <path d="M128,106 h72 l14 15 -14 15 h-72 Z" />
        <path d="M128,144 h-56 l-14 13 14 13 h56 Z" />
      </g>

      <!-- route destination marker: a faceted diamond, not a rounded pin -->
      <path d="M336,84 L360,108 L336,132 L312,108 Z" fill="url(#trust-marker)" />
      <path d="M336,98 L346,108 L336,118 L326,108 Z" fill="#101216" />
    </svg>
  </div>
</template>
