<script setup lang="ts">
/**
 * Sticky driver-identity header. Lives inside the same sticky wrapper as
 * TabBar (see pages/index.vue) — once the page scrolls past
 * COLLAPSE_THRESHOLD_PX (composables/useHeaderCollapse.ts) it collapses to
 * a slim single row (small avatar + name, no subtitle/CTAs) to give mobile
 * users more room to see actual tab content without scrolling past a full
 * driver-card every time. Expands back the moment the page scrolls back
 * near the top.
 */
const props = withDefaults(
  defineProps<{
    driverName?: string
  }>(),
  {
    driverName: 'Sifiso W. Magagula'
  }
)

const activeTab = useActiveTab()
const collapsed = useHeaderCollapse()
const initials = computed(() => getInitials(props.driverName))
</script>

<template>
  <div
    id="app-header"
    class="bg-navy px-6 transition-[padding] duration-300 motion-reduce:transition-none"
    :class="collapsed ? 'pb-3 pt-3' : 'pb-[26px] pt-9'"
  >
    <p
      class="overflow-hidden text-[10px] font-extrabold tracking-[0.22em] text-white/45 transition-all duration-300 motion-reduce:transition-none"
      :class="collapsed ? 'max-h-0 opacity-0' : 'mb-[22px] max-h-4 opacity-100'"
    >
      SOMPISI TRANSPORT
    </p>

    <div class="flex items-center gap-3">
      <AvatarBadge
        :initials="initials"
        :size="collapsed ? 32 : 62"
        class="transition-[width,height,font-size] duration-300 motion-reduce:transition-none"
      />
      <div>
        <p
          class="font-bold leading-tight text-white transition-all duration-300 motion-reduce:transition-none"
          :class="collapsed ? 'text-sm' : 'text-lg'"
        >
          {{ driverName }}
        </p>
        <p
          class="overflow-hidden font-bold text-white/55 transition-all duration-300 motion-reduce:transition-none"
          :class="collapsed ? 'max-h-0 opacity-0' : 'mt-1 max-h-4 text-[12.5px] opacity-100'"
        >
          Owner · Private Driving Service
        </p>
      </div>
    </div>

    <div
      class="flex gap-2.5 overflow-hidden transition-all duration-300 motion-reduce:transition-none"
      :class="collapsed ? 'max-h-0 opacity-0' : 'mt-6 max-h-20 opacity-100'"
    >
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
