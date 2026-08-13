<script setup lang="ts">
/**
 * One "ticket stub" style row describing a single service.
 * Deliberately not a generic equal-width icon-on-top card — the index
 * number + perforated divider borrows from travel-ticket layout instead.
 */
defineProps<{
  index: string
  title: string
  description: string
  features: string[]
}>()
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-800/15 bg-mist-50 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:flex-row"
  >
    <div
      class="flex shrink-0 flex-row items-center gap-3 bg-ink-800 px-5 py-4 text-mist-50 transition-colors duration-300 group-hover:bg-amber-500 sm:w-40 sm:flex-col sm:items-start sm:justify-center sm:gap-1 sm:py-6"
    >
      <span class="font-mono text-xs uppercase tracking-widest text-mist-200/80">Service</span>
      <span class="font-display text-3xl font-bold leading-none transition-transform duration-300 group-hover:scale-110">
        {{ index }}
      </span>
    </div>

    <!-- perforated divider, ticket-stub style -->
    <div
      class="relative hidden w-px shrink-0 bg-dotted-line bg-[length:1px_14px] bg-repeat-y text-ink-800/20 sm:block"
    />
    <div class="block h-px w-full bg-dotted-line bg-[length:14px_1px] bg-repeat-x text-ink-800/20 sm:hidden" />

    <div class="flex-1 px-5 py-5 sm:px-6 sm:py-6">
      <h3 class="text-lg font-bold sm:text-xl">{{ title }}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-ink-900/80">{{ description }}</p>
      <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
        <li
          v-for="feature in features"
          :key="feature"
          class="flex items-center gap-1.5 text-sm text-ink-800"
        >
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          {{ feature }}
        </li>
      </ul>
    </div>
  </article>
</template>
