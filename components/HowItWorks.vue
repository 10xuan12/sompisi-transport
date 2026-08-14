<script setup lang="ts">
/**
 * Three-step "how it works" explainer, placed after Services and before
 * the booking form. The connecting line only renders from md breakpoint
 * up — on mobile the steps just stack, which reads fine on its own.
 */
withDefaults(
  defineProps<{
    steps?: { icon: 'form' | 'chat' | 'ride'; title: string; description: string }[]
  }>(),
  {
    steps: () => [
      {
        icon: 'form',
        title: 'Tell us your trip',
        description: 'Passengers, destination, date, and time.'
      },
      {
        icon: 'chat',
        title: 'Confirm on WhatsApp',
        description: 'We confirm every detail on WhatsApp.'
      },
      {
        icon: 'ride',
        title: 'Ride with confidence',
        description: 'On time, straight to your destination.'
      }
    ]
  }
)
</script>

<template>
  <section id="how-it-works" class="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
    <p class="section-heading">How it works</p>
    <h2 class="mt-2 text-2xl font-bold sm:text-3xl">Three steps, one WhatsApp chat</h2>
    <p class="mt-3 max-w-xl text-ink-900/80">
      No account or app — just message us directly.
    </p>

    <div v-reveal class="relative mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
      <!-- connecting path line, desktop only -->
      <svg
        class="pointer-events-none absolute left-0 right-0 top-8 hidden w-full md:block"
        viewBox="0 0 900 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          class="draw-path draw-path-onreveal"
          style="--draw-length: 900"
          d="M150,10 L750,10"
          fill="none"
          stroke="#BC7272"
          stroke-width="3"
          stroke-linecap="square"
          stroke-dasharray="2 14"
        />
      </svg>

      <div
        v-for="(step, i) in steps"
        :key="step.title"
        v-reveal="i * 150"
        class="relative flex flex-col items-center text-center md:items-center"
      >
        <div
          class="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-ink-800 bg-mist-50 text-ink-800"
        >
          <StepIcon :type="step.icon" />
        </div>
        <span class="mt-3 font-mono text-xs uppercase tracking-widest text-garnet-500">
          Step {{ i + 1 }}
        </span>
        <h3 class="mt-1 text-lg font-bold">{{ step.title }}</h3>
        <p class="mt-1.5 max-w-[22ch] text-sm leading-relaxed text-ink-900/75">
          {{ step.description }}
        </p>
      </div>
    </div>
  </section>
</template>
