<script setup lang="ts">
/**
 * Replaces a generic "About us" block. Short, scannable reasons to trust
 * the service, in place of a paragraph nobody reads.
 *
 * `points[].todo`: mark any placeholder copy that stands in for a real
 * number/fact the client still needs to confirm (years running, fleet
 * size, etc.) so it's obvious this needs a follow-up before launch.
 */
withDefaults(
  defineProps<{
    heading?: string
    intro?: string
    points: { label: string; text: string; todo?: boolean }[]
  }>(),
  {
    heading: 'Why Travellers Trust Us',
    intro: 'No big fleet — just a driver who shows up.'
  }
)
</script>

<template>
  <section id="trust" class="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
    <p class="section-heading">Why Sompisi</p>
    <h2 class="mt-2 text-2xl font-bold sm:text-3xl">{{ heading }}</h2>
    <p class="mt-3 max-w-xl text-ink-900/80">{{ intro }}</p>

    <div class="mt-8 grid gap-8 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
      <TrustVisual v-reveal class="sm:max-w-sm" />

      <dl class="grid gap-x-8 gap-y-6 xs:grid-cols-1">
        <div v-for="(point, i) in points" :key="point.label" v-reveal="i * 100" class="flex gap-3">
          <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
          <div>
            <dt class="flex flex-wrap items-center gap-2 font-display font-bold text-ink-800">
              {{ point.label }}
              <span
                v-if="point.todo"
                class="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-amber-600"
              >
                TODO: confirm with client
              </span>
            </dt>
            <dd class="mt-1 text-sm leading-relaxed text-ink-900/80">{{ point.text }}</dd>
          </div>
        </div>
      </dl>
    </div>
  </section>
</template>
