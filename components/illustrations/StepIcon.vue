<script setup lang="ts">
/**
 * Small line-art icon set for the "How It Works" steps. Same stroke
 * weight/colour as the other illustrations so the whole site reads as one
 * consistent, precise style rather than mixed stock icon packs — square
 * caps/joins throughout, minimal corner rounding, no cartoon flourishes.
 */
defineProps<{
  type: 'form' | 'chat' | 'ride'
}>()
</script>

<template>
  <svg viewBox="0 0 48 48" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
    <template v-if="type === 'form'">
      <rect x="10" y="6" width="28" height="36" rx="1" />
      <path d="M18 6 V4.5 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 V6" />
      <line x1="16" y1="20" x2="32" y2="20" />
      <line x1="16" y1="27" x2="32" y2="27" />
      <line x1="16" y1="34" x2="25" y2="34" />
    </template>

    <template v-else-if="type === 'chat'">
      <path d="M8 10 h32 v18 h-18 l-8 7 v-7 h-6 Z" />
      <path d="M15 19 l6 6 12 -13" />
    </template>

    <template v-else>
      <path d="M10 28 L13 18 a2 2 0 0 1 2 -1.5 h18 a2 2 0 0 1 2 1.5 L38 28" />
      <rect x="7" y="28" width="34" height="9" rx="1" />
      <circle cx="15" cy="37" r="2.4" fill="currentColor" />
      <circle cx="33" cy="37" r="2.4" fill="currentColor" />
      <line x1="16" y1="23" x2="32" y2="23" />
    </template>
  </svg>
</template>
