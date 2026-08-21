<script setup lang="ts">
const SERVICES = [
  {
    n: '01',
    title: 'Airport Transfers',
    desc: 'Meet & greet at arrivals, flight-tracked pickup, help with luggage.'
  },
  {
    n: '02',
    title: 'Local Rides',
    desc: 'Point-to-point trips across Eswatini — meetings, day trips, errands.'
  },
  {
    n: '03',
    title: 'Cross-Border Trips',
    desc: 'Door-to-door runs into South Africa and Mozambique, paperwork handled.'
  },
  {
    n: '04',
    title: 'School Runs',
    desc: 'Daily pickup and drop-off for local children, safely home every time.'
  }
]
</script>

<template>
  <div>
    <p class="mb-2.5 text-[10px] font-extrabold tracking-[0.16em] text-burgundy">SERVICES</p>
    <h2 class="mb-1.5 text-xl font-bold text-navy">Three ways we drive you</h2>
    <p class="mb-5 text-[13px] font-bold leading-relaxed text-navy/55">
      Every trip is run by the same small team — you'll always know who's coming.
    </p>

    <div v-for="svc in SERVICES" :key="svc.n" class="flex gap-4 border-b border-navy/[0.08] py-5">
      <div
        class="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-navy/20 text-[11px] font-bold text-navy"
      >
        {{ svc.n }}
      </div>
      <div>
        <p class="text-[15px] font-bold text-navy">{{ svc.title }}</p>
        <p class="mt-1 text-[13px] font-bold leading-relaxed text-navy/60">{{ svc.desc }}</p>
      </div>
    </div>
  </div>
</template>
