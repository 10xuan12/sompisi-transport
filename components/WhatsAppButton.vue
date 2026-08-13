<script setup lang="ts">
/**
 * Reusable WhatsApp contact button.
 * - variant="floating": fixed pill in the corner of the viewport, always
 *   reachable without scrolling to the form (core UX requirement: don't
 *   make people fill out a form before they can say hello).
 * - variant="inline": normal in-flow button, for headers/sections.
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
    label: 'Chat on WhatsApp',
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
      'group inline-flex items-center gap-2 font-body font-semibold transition-colors',
      variant === 'floating'
        ? 'whatsapp-breathe fixed bottom-5 right-5 z-50 rounded-full bg-ink-800 px-4 py-3 text-mist-50 shadow-lg shadow-ink-900/30 hover:bg-ink-600 sm:bottom-7 sm:right-7'
        : 'rounded-full border-2 border-ink-800 px-4 py-2 text-sm text-ink-800 hover:bg-ink-800 hover:text-mist-50'
    ]"
  >
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      :class="variant === 'floating' ? 'h-6 w-6' : 'h-4 w-4'"
      fill="currentColor"
    >
      <path
        d="M16.04 2.67c-7.36 0-13.33 5.97-13.33 13.33 0 2.35.62 4.63 1.79 6.64L2.67 29.33l6.86-1.8a13.27 13.27 0 0 0 6.51 1.7h.01c7.36 0 13.33-5.96 13.33-13.32 0-3.56-1.39-6.91-3.9-9.42a13.24 13.24 0 0 0-9.44-3.92Zm0 24.4h-.01a11.07 11.07 0 0 1-5.64-1.54l-.4-.24-4.07 1.07 1.09-3.97-.26-.41a11.05 11.05 0 0 1-1.7-5.9c0-6.11 4.98-11.08 11.1-11.08a11.03 11.03 0 0 1 7.85 3.26 11 11 0 0 1 3.25 7.84c0 6.11-4.98 11.07-11.1 11.07Zm6.08-8.29c-.33-.17-1.98-.98-2.29-1.09-.31-.11-.53-.17-.76.17-.22.33-.87 1.09-1.07 1.32-.2.22-.39.25-.72.08-.33-.17-1.4-.51-2.68-1.65-.99-.88-1.65-1.97-1.85-2.3-.19-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.16-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.76-1.83-1.04-2.5-.27-.66-.55-.57-.76-.58h-.65c-.22 0-.58.08-.88.42-.3.33-1.15 1.12-1.15 2.74 0 1.61 1.18 3.17 1.34 3.39.17.22 2.31 3.53 5.6 4.95.78.34 1.39.54 1.87.69.79.25 1.5.22 2.06.13.63-.09 1.98-.81 2.26-1.59.28-.78.28-1.44.2-1.58-.08-.14-.3-.22-.63-.39Z"
      />
    </svg>
    <span v-if="variant === 'inline'">{{ label }}</span>
    <span v-else class="hidden sm:inline">{{ label }}</span>
  </a>
</template>
