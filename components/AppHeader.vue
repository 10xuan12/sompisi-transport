<script setup lang="ts">
withDefaults(
  defineProps<{
    siteName?: string
    tagline?: string
    navLinks?: { label: string; href: string }[]
  }>(),
  {
    siteName: 'Sompisi Transport',
    tagline: 'Private transfers, Eswatini',
    navLinks: () => [
      { label: 'Services', href: '#services' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Contact', href: '#book' }
    ]
  }
)

const isMenuOpen = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-ink-800/10 bg-mist-100/80 backdrop-blur-sm">
    <div class="relative mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <a href="#top" class="flex items-baseline gap-2">
        <span class="font-display text-lg font-bold text-ink-800 sm:text-xl">{{ siteName }}</span>
        <span class="hidden font-mono text-xs uppercase tracking-widest text-garnet-500 sm:inline">
          {{ tagline }}
        </span>
      </a>

      <nav class="hidden items-center gap-5 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="font-body text-sm font-medium text-ink-800/80 transition-colors hover:text-garnet-500"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <WhatsAppButton variant="inline" label="WhatsApp" class="shrink-0" />

        <!-- Hamburger toggle, mobile only. The three bars morph into an X
             using the same crisp (no-bounce) transform timing as the rest
             of the site — no extra easing rules needed. -->
        <button
          type="button"
          class="relative z-50 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            class="block h-0.5 w-6 rounded-full bg-ink-800 transition-transform duration-300"
            :class="isMenuOpen ? 'translate-y-2 rotate-45' : ''"
          />
          <span
            class="block h-0.5 w-6 rounded-full bg-ink-800 transition-opacity duration-300"
            :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="block h-0.5 w-6 rounded-full bg-ink-800 transition-transform duration-300"
            :class="isMenuOpen ? '-translate-y-2 -rotate-45' : ''"
          />
        </button>
      </div>

      <!-- Mobile menu panel. Dark/garnet to match the site's accent
           sections (footer, booking) rather than repeating the light
           header background — makes the open state feel deliberate. -->
      <Transition
        enter-active-class="mobile-menu-transition"
        leave-active-class="mobile-menu-transition"
        enter-from-class="mobile-menu-hidden"
        leave-to-class="mobile-menu-hidden"
      >
        <nav
          v-if="isMenuOpen"
          id="mobile-menu"
          class="absolute inset-x-0 top-full z-40 border-t border-ink-800/10 bg-ink-900 shadow-lg md:hidden"
        >
          <ul class="flex flex-col divide-y divide-mist-100/10 px-4">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="block py-4 font-body text-base font-medium text-mist-50 transition-colors hover:text-garnet-300"
                @click="closeMenu"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
      </Transition>
    </div>
  </header>
</template>
