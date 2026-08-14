<script setup lang="ts">
const services = [
  {
    index: '01',
    title: 'Airport transfers',
    description: 'Timed to your flight, not the clock.',
    features: ['Flight-time pickup', 'We wait if your flight is late', 'Meet you at arrivals']
  },
  {
    index: '02',
    title: 'In-country rides',
    description: 'Point-to-point trips, anywhere in Eswatini.',
    features: ['City to city', 'Day trips', 'Point-to-point drop-off']
  },
  {
    index: '03',
    title: 'Cross-border trips',
    description: 'Cross-border trips, planned in advance.',
    features: ['Regional routes', 'Agreed pickup & return time', 'Comfortable for longer drives']
  }
]

const personas = [
  {
    identity: 'First-time visitor to Eswatini',
    need: 'Will anyone find me at arrivals?',
    solution: 'Pickup confirmed in writing before you land.'
  },
  {
    identity: 'Cross-border business traveller',
    need: 'Can the schedule flex if plans change?',
    solution: 'Route planned ahead, flexible on WhatsApp.'
  },
  {
    identity: 'Returning / regular customer',
    need: 'Why explain pickup details every time?',
    solution: 'Just message us directly.'
  },
  {
    identity: 'Group or family travelling together',
    need: 'Right size car for the group?',
    solution: 'We match the vehicle to your group.'
  }
]

const trustPoints = [
  {
    label: 'We know the roads',
    text: 'Local routes, driven regularly.',
    todo: true
  },
  {
    label: 'Talk to a real person',
    text: 'No call centre, ever.'
  },
  {
    label: 'Pickup planned around your flight',
    text: 'Based on your actual arrival.',
    todo: true
  },
  {
    label: 'Right vehicle for your group',
    text: 'Matched to your group size.',
    todo: true
  }
]
</script>

<template>
  <div id="top">
    <AppHeader />

    <main>
    <!-- HERO -->
    <section class="mx-auto max-w-5xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
      <div class="grid gap-10 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
        <div>
          <p class="section-heading">Private transport · Eswatini</p>
          <h1 class="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Reliable · Local · One WhatsApp Message
          </h1>
          <p class="mt-4 max-w-lg text-base leading-relaxed text-ink-900/80 sm:text-lg">
            Airport, local, and cross-border trips. Booked on WhatsApp.
          </p>

          <div class="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-900/50">
            <span class="status-dot h-1.5 w-1.5 rounded-full bg-amber-500" />
            Available on WhatsApp
          </div>

          <div class="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              class="glow-amber inline-flex items-center justify-center rounded-full border border-ink-900/15 bg-amber-500 px-7 py-4 text-base font-bold text-ink-900 transition hover:bg-amber-600 sm:text-lg"
            >
              Request a ride
            </a>
            <a
              href="#services"
              class="inline-flex items-center justify-center rounded-full border-2 border-ink-800 px-6 py-3.5 font-bold text-ink-800 transition-colors hover:bg-ink-800 hover:text-mist-50"
            >
              See services
            </a>
          </div>

          <ul class="mt-8 flex flex-col gap-2 border-t border-ink-800/15 pt-6 text-sm text-ink-900/75 sm:flex-row sm:gap-6">
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-ink-600" />
              Direct WhatsApp contact
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-ink-600" />
              No prepayment to enquire
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-ink-600" />
              Local driver, not a call centre
            </li>
          </ul>
        </div>

        <!-- Illustration + "ticket" info card. HeroVisual is the swappable
             main visual (see its TODO); the ticket keeps the travel-document
             motif used across the site. -->
        <div class="mx-auto flex w-full max-w-sm flex-col gap-4 sm:mx-0">
          <HeroVisual />

          <div class="relative rounded-2xl border border-ink-800/15 bg-mist-50 p-5 shadow-card-lg">
            <div class="flex items-center justify-between border-b border-dashed border-ink-800/25 pb-3">
              <span class="font-mono text-xs uppercase tracking-widest text-amber-500">Boarding</span>
              <span class="font-mono text-xs uppercase tracking-widest text-ink-800/60">Sompisi Transport</span>
            </div>
            <dl class="mt-4 grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <dt class="font-mono text-[11px] uppercase tracking-widest text-ink-800/50">From</dt>
                <dd class="font-display font-bold text-ink-800">Wherever you land</dd>
              </div>
              <div>
                <dt class="font-mono text-[11px] uppercase tracking-widest text-ink-800/50">To</dt>
                <dd class="font-display font-bold text-ink-800">Wherever you're headed</dd>
              </div>
              <div class="col-span-2">
                <dt class="font-mono text-[11px] uppercase tracking-widest text-ink-800/50">Booking method</dt>
                <dd class="font-display font-bold text-ink-800">One WhatsApp message</dd>
              </div>
            </dl>
            <div class="ticket-notch relative -mx-5 mt-5 border-t border-dashed border-ink-800/25 px-5 pt-3">
              <p class="text-center text-xs text-ink-900/60">
                Pricing on request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <p class="section-heading">Our services</p>
      <h2 class="mt-2 text-2xl font-bold sm:text-3xl">Three ways we get you there</h2>
      <p class="mt-3 max-w-xl text-ink-900/80">
        Quoted individually, based on your exact trip details.
      </p>

      <div class="mt-8 flex flex-col gap-5">
        <ServiceCard
          v-for="(service, i) in services"
          :key="service.index"
          v-reveal="i * 100"
          :index="service.index"
          :title="service.title"
          :description="service.description"
          :features="service.features"
        />
      </div>
    </section>

    <HowItWorks />

    <!-- WHO IT'S FOR -->
    <section id="who-its-for" class="bg-mist-200/60">
      <div class="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <p class="section-heading">Who it's for</p>
        <h2 class="mt-2 text-2xl font-bold sm:text-3xl">Built Around How You Travel</h2>
        <p class="mt-3 max-w-xl text-ink-900/80">
          See which kind of traveller you are.
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <PersonaCard
            v-for="(persona, i) in personas"
            :key="persona.identity"
            v-reveal="i * 100"
            :identity="persona.identity"
            :need="persona.need"
            :solution="persona.solution"
          />
        </div>
      </div>
    </section>

    <TrustSection :points="trustPoints" />

    <!-- BOOKING FORM -->
    <section id="book" class="texture-grid bg-ink-900">
      <div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">Book a ride</p>
        <h2 class="mt-2 text-2xl font-bold text-mist-50 sm:text-3xl">
          One Form, One WhatsApp Message
        </h2>
        <p class="mt-3 max-w-xl text-mist-100/75">
          Your details, turned into one clear WhatsApp message.
        </p>

        <div class="mt-8 rounded-2xl bg-mist-50 p-5 shadow-card-lg sm:p-8">
          <BookingForm />
        </div>
      </div>
    </section>
    </main>

    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
