<script setup lang="ts">
withDefaults(
  defineProps<{
    siteName?: string
    displayPhone?: string
  }>(),
  {
    siteName: 'Sompisi Transport',
    displayPhone: '+268 7614 1460'
  }
)

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-navy px-6 py-9 text-center">
    <p class="text-[12.5px] font-bold tracking-wide text-white">SOMPISI TRANSPORT</p>
    <p class="mt-2 text-[12.5px] font-bold leading-relaxed text-white/55">
      Mbabane, Eswatini<br />
      {{ displayPhone }} · WhatsApp preferred
    </p>
    <p class="mt-[18px] text-[10.5px] font-bold tracking-wide text-white/30">
      © {{ year }} {{ siteName }}
    </p>
  </footer>
</template>
