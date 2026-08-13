<script setup lang="ts">
withDefaults(
  defineProps<{
    siteName?: string
    displayPhone?: string
    serviceArea?: string
  }>(),
  {
    siteName: 'Sompisi Transport',
    // Same intentional, temporary number as utils/whatsapp.ts (owner's son,
    // until a dedicated WhatsApp Business number exists) — keep these two in sync.
    displayPhone: '+886 908 026 774',
    serviceArea:
      'Based in Eswatini — airport transfers, journeys across the country, and cross-border trips to neighbouring countries by request.'
  }
)

const year = new Date().getFullYear()
</script>

<template>
  <footer class="texture-grid border-t border-ink-800/15 bg-ink-800 text-mist-100">
    <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div class="grid gap-8 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <p class="font-display text-lg font-bold">{{ siteName }}</p>
          <p class="mt-2 max-w-sm text-sm leading-relaxed text-mist-100/80">{{ serviceArea }}</p>
        </div>

        <div class="flex flex-col gap-2 text-sm sm:items-end">
          <p class="font-mono uppercase tracking-widest text-mist-100/60">Contact</p>
          <WhatsAppButton variant="inline" label="Message on WhatsApp" class="!border-mist-100 !text-mist-100 hover:!bg-mist-100 hover:!text-ink-800" />
          <p class="font-mono text-mist-100/70">{{ displayPhone }}</p>
        </div>
      </div>

      <div
        class="mt-8 flex flex-col gap-2 border-t border-mist-100/15 pt-5 text-xs text-mist-100/60 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ siteName }}. All rides booked by direct arrangement via WhatsApp.</p>
        <p>Prices, fleet details and years of service: TODO — confirm exact wording with client.</p>
      </div>
    </div>
  </footer>
</template>
