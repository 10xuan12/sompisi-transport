<script setup lang="ts">
const TRAVELER_TYPES = [
  { tag: 'First visit', desc: "New to Eswatini — we meet you by name, no guessing at arrivals." },
  { tag: 'Business', desc: 'Fixed schedules, invoices on request, discreet and on time.' },
  { tag: 'Returning guest', desc: 'We remember your preferences from last time.' },
  { tag: 'Group / Family', desc: 'Larger vehicle on request, one fare for everyone.' }
]
</script>

<template>
  <div>
    <p class="mb-2.5 text-[10px] font-extrabold tracking-[0.16em] text-burgundy">TRAVELLERS</p>
    <h2 class="mb-5 text-xl font-bold text-navy">Who we drive</h2>

    <div v-for="t in TRAVELER_TYPES" :key="t.tag" class="border-b border-navy/[0.08] py-[18px]">
      <p class="text-[11px] font-extrabold uppercase tracking-wide text-burgundy">{{ t.tag }}</p>
      <p class="mt-[5px] text-[13px] font-bold leading-relaxed text-navy/60">{{ t.desc }}</p>
    </div>
  </div>
</template>
