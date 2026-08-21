<script setup lang="ts">
/**
 * Reusable WhatsApp contact button.
 * - variant="floating": fixed burgundy pill bottom-right of the viewport,
 *   always reachable without switching tabs (core UX requirement: don't
 *   make people find the Book tab before they can say hello).
 * - variant="inline": normal in-flow button, for the header and driver list.
 *
 * No backend involved — this only ever renders a wa.me link.
 */
const props = withDefaults(
  defineProps<{
    message?: string
    label?: string
    phoneNumber?: string
    variant?: 'floating' | 'inline'
  }>(),
  {
    message: "Hi Sompisi Transport, I'd like to ask about a ride.",
    label: 'WhatsApp',
    phoneNumber: undefined,
    variant: 'floating'
  }
)

const href = computed(() => buildWhatsAppLink(props.message, props.phoneNumber))
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="label"
    :class="[
      'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm font-extrabold uppercase tracking-wide transition-opacity hover:opacity-90 active:scale-[0.98]',
      variant === 'floating'
        ? 'fixed bottom-5 right-5 z-40 bg-burgundy px-5 py-3 text-[11.5px] text-white shadow-lg shadow-black/25'
        : 'border border-white/30 px-4 py-3.5 text-xs text-white/85'
    ]"
  >
    {{ label }}
  </a>
</template>
