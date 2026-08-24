<script setup lang="ts">
import type { TabId } from '~/composables/useActiveTab'

const TABS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'how', label: 'How' },
  { id: 'who', label: 'Who' },
  { id: 'driver', label: 'Driver' },
  { id: 'book', label: 'Book' }
]

const activeTab = useActiveTab()
</script>

<template>
  <div class="flex border-b border-navy/10 bg-white">
    <button
      v-for="tab in TABS"
      :key="tab.id"
      type="button"
      class="flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-[10px] font-extrabold uppercase tracking-wide transition-colors"
      :class="
        activeTab === tab.id
          ? 'border-burgundy text-navy'
          : 'border-transparent text-navy/45'
      "
      @click="activeTab = tab.id"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
