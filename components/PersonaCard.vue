<script setup lang="ts">
/**
 * Three-line persona card: who / what they need / what we do about it.
 * Kept plain and specific on purpose — no marketing adjectives, this is
 * meant to read like a note the owner would actually write about a
 * regular type of passenger, not an ad.
 */
defineProps<{
  identity: string
  need: string
  solution: string
}>()
</script>

<template>
  <article
    class="flex h-full flex-col gap-3 rounded-xl border border-dashed border-ink-800/30 bg-mist-50 p-5 shadow-card"
  >
    <h3 class="font-display text-base font-bold leading-snug text-ink-800">
      {{ identity }}
    </h3>

    <div class="flex gap-2">
      <span class="mt-0.5 shrink-0 font-mono text-[11px] uppercase tracking-widest text-garnet-500">
        Need
      </span>
      <p class="text-sm leading-relaxed text-ink-900/85">{{ need }}</p>
    </div>

    <div class="flex gap-2">
      <span class="mt-0.5 shrink-0 font-mono text-[11px] uppercase tracking-widest text-garnet-500">
        We offer
      </span>
      <p class="text-sm leading-relaxed text-ink-900/85">{{ solution }}</p>
    </div>
  </article>
</template>
