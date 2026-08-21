<script setup lang="ts">
/**
 * Sticky driver-identity header. Replaces the old site-nav header — this
 * design has no separate nav menu, just the tab bar (TabBar.vue) rendered
 * right below this.
 */
withDefaults(
  defineProps<{
    driverName?: string
  }>(),
  {
    driverName: 'Sifiso W. Magagula'
  }
)

const activeTab = useActiveTab()
</script>

<template>
  <div class="sticky top-0 z-30 bg-navy px-6 pb-[26px] pt-9">
    <p class="text-[10px] font-extrabold tracking-[0.22em] text-white/45">SOMPISI TRANSPORT</p>

    <div class="mt-[22px] flex items-center gap-4">
      <div
        class="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#243e63] to-[#0d1b30] text-[8.5px] font-bold tracking-[0.08em] text-white/35"
      >
        PHOTO
      </div>
      <div>
        <p class="text-lg font-bold leading-tight text-white">{{ driverName }}</p>
        <p class="mt-1 text-[12.5px] font-bold text-white/55">Owner · Private Driving Service</p>
      </div>
    </div>

    <div class="mt-6 flex gap-2.5">
      <button
        type="button"
        class="flex-1 rounded-sm bg-burgundy px-4 py-3.5 text-xs font-extrabold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
        @click="activeTab = 'book'"
      >
        REQUEST A RIDE
      </button>
      <WhatsAppButton variant="inline" label="WhatsApp" class="flex-1 justify-center" />
    </div>
  </div>
</template>
