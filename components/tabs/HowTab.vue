<script setup lang="ts">
const STEPS = [
  { n: '1', title: 'Send your trip', desc: 'Fill in a short form with your dates and destination.' },
  { n: '2', title: 'Confirm on WhatsApp', desc: 'We reply personally within the hour to lock in details.' },
  { n: '3', title: 'Meet your driver', desc: 'A driver from our small team arrives on time, every time.' }
]
</script>

<template>
  <div>
    <p class="mb-2.5 text-[10px] font-extrabold tracking-[0.16em] text-burgundy">PROCESS</p>
    <h2 class="mb-5 text-xl font-bold text-navy">How a trip with us works</h2>

    <div
      v-for="step in STEPS"
      :key="step.n"
      class="flex gap-4 border-b border-navy/[0.08] py-[18px]"
    >
      <div
        class="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-navy/20 text-xs font-bold text-navy"
      >
        {{ step.n }}
      </div>
      <div>
        <p class="text-[14.5px] font-bold text-navy">{{ step.title }}</p>
        <p class="mt-[3px] text-[13px] font-bold leading-relaxed text-navy/60">{{ step.desc }}</p>
      </div>
    </div>
  </div>
</template>
