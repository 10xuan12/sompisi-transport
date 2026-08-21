<script setup lang="ts">
const activeTab = useActiveTab()
</script>

<template>
  <div>
    <p class="mb-2.5 text-[10px] font-extrabold tracking-[0.16em] text-burgundy">WELCOME</p>
    <h1 class="text-[23px] font-bold leading-snug text-navy">
      A private driving service run by people you can name.
    </h1>
    <p class="mb-[26px] mt-3.5 text-sm font-bold leading-relaxed text-navy/60">
      Sompisi Transport is a small, family-led company based in Mbabane, Eswatini. No call
      centre, no fleet of strangers — every trip is arranged by the owner and driven by our
      small trusted team.
    </p>
    <button
      type="button"
      class="mb-7 w-full rounded-sm bg-burgundy px-4 py-4 text-xs font-extrabold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
      @click="activeTab = 'book'"
    >
      REQUEST A RIDE NOW
    </button>
    <p class="border-t border-navy/10 pt-4 text-[11px] font-bold tracking-wide text-navy/40">
      MBABANE, ESWATINI — SERVING LOCAL, AIRPORT &amp; CROSS-BORDER TRAVEL
    </p>
  </div>
</template>
