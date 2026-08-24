<script setup lang="ts">
const activeTab = useActiveTab()
</script>

<template>
  <div class="mx-auto min-h-screen max-w-[480px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.1)]">
    <div class="sticky top-0 z-30">
      <AppHeader />
      <TabBar />
    </div>

    <main class="px-6 pb-24 pt-8">
      <HomeTab v-if="activeTab === 'home'" />
      <ServicesTab v-else-if="activeTab === 'services'" />
      <HowTab v-else-if="activeTab === 'how'" />
      <WhoTab v-else-if="activeTab === 'who'" />
      <DriverTab v-else-if="activeTab === 'driver'" />
      <BookTab v-else-if="activeTab === 'book'" />
    </main>

    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
