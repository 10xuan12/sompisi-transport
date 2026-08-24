<script setup lang="ts">
/**
 * Circular initials badge — the placeholder identity marker used anywhere
 * we don't have a real photo yet (AppHeader, DriverTab). Brand-color fill
 * + a faint white ring so the circle reads clearly against either the navy
 * header or a white section background.
 *
 * TODO: 待客戶提供真實照片後，可直接替換為 <img>，元件結構已預留替換空間
 * (swap the {{ initials }} <span> below for
 * `<img :src="..." class="h-full w-full rounded-full object-cover" />` —
 * the sizing, border, and shrink-0 on the wrapping div all stay as-is).
 */
withDefaults(
  defineProps<{
    initials: string
    size?: number
    tone?: 'burgundy' | 'navy'
  }>(),
  {
    size: 62,
    tone: 'burgundy'
  }
)
</script>

<template>
  <div
    class="flex shrink-0 items-center justify-center rounded-full border border-white/15 font-bold text-white"
    :class="tone === 'navy' ? 'bg-navy' : 'bg-burgundy'"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.32)}px` }"
  >
    <span>{{ initials }}</span>
  </div>
</template>
