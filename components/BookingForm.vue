<script setup lang="ts">
/**
 * Booking / enquiry form.
 *
 * There is no backend: on submit we format every field into one plain-text
 * message and hand off to WhatsApp via a wa.me link. All actual back-and-forth
 * (confirmation, payment) still happens in that WhatsApp chat, by design —
 * this form's only job is to stop the "customer can't clearly describe pickup
 * point / destination" problem by forcing the details into a structured
 * message before the conversation starts.
 */

const SERVICE_TYPES = [
  { value: 'airport', label: 'Airport transfer' },
  { value: 'incountry', label: 'In-country ride' },
  { value: 'crossborder', label: 'Cross-border trip' }
] as const

type ServiceType = (typeof SERVICE_TYPES)[number]['value']

const formRef = ref<HTMLFormElement | null>(null)

const form = reactive({
  fullName: '',
  serviceType: '' as ServiceType | '',
  passengers: 1,
  destination: '',
  date: '',
  time: '',
  pickup: '',
  terminal: ''
})

const isAirportTransfer = computed(() => form.serviceType === 'airport')

const serviceLabel = computed(
  () => SERVICE_TYPES.find((s) => s.value === form.serviceType)?.label ?? ''
)

const whatsappMessage = computed(() => {
  // No phone/email field on purpose — WhatsApp already carries the
  // sender's contact info, so asking for it again would just be friction.
  const lines = [
    `Hi, this is ${form.fullName || '-'}. I'd like to book a trip:`,
    `- Service: ${serviceLabel.value || '-'}`,
    `- Passengers: ${form.passengers || '-'}`,
    `- Destination: ${form.destination || '-'}`,
    `- Date: ${form.date || '-'}`,
    `- Time: ${form.time || '-'}`,
    `- Pickup location: ${form.pickup || '-'}`
  ]

  if (isAirportTransfer.value && form.terminal) {
    lines.push(`- Terminal: ${form.terminal}`)
  }

  return lines.join('\n')
})

const submitted = ref(false)

function handleSubmit() {
  const el = formRef.value
  if (!el) return

  // Native HTML validation covers required fields / input types before we
  // ever build the message — no need to duplicate that logic in JS.
  if (!el.checkValidity()) {
    el.reportValidity()
    return
  }

  const link = buildWhatsAppLink(whatsappMessage.value)
  submitted.value = true
  window.open(link, '_blank', 'noopener,noreferrer')
}

// If the traveller switches away from "Airport transfer", clear the
// terminal field so it never leaks into the message for other trip types.
watch(
  () => form.serviceType,
  (value) => {
    if (value !== 'airport') form.terminal = ''
  }
)
</script>

<template>
  <form
    ref="formRef"
    class="grid gap-5 sm:grid-cols-2"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <div class="sm:col-span-2">
      <label for="fullName" class="block text-sm font-bold text-ink-800"> Full name </label>
      <input
        id="fullName"
        v-model="form.fullName"
        type="text"
        required
        placeholder="e.g. Thandiwe Dlamini"
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 placeholder:text-ink-900/40 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>

    <div class="sm:col-span-2">
      <label for="serviceType" class="block text-sm font-bold text-ink-800">
        What kind of trip is this?
      </label>
      <select
        id="serviceType"
        v-model="form.serviceType"
        required
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      >
        <option value="" disabled>Select one…</option>
        <option v-for="option in SERVICE_TYPES" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div>
      <label for="passengers" class="block text-sm font-bold text-ink-800">
        Number of passengers
      </label>
      <input
        id="passengers"
        v-model.number="form.passengers"
        type="number"
        min="1"
        max="20"
        required
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>

    <div>
      <label for="destination" class="block text-sm font-bold text-ink-800"> Destination </label>
      <input
        id="destination"
        v-model="form.destination"
        type="text"
        required
        placeholder="e.g. Mbabane, Ezulwini, or hotel name"
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 placeholder:text-ink-900/40 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>

    <div>
      <label for="date" class="block text-sm font-bold text-ink-800"> Date </label>
      <input
        id="date"
        v-model="form.date"
        type="date"
        required
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>

    <div>
      <label for="time" class="block text-sm font-bold text-ink-800"> Pickup time </label>
      <input
        id="time"
        v-model="form.time"
        type="time"
        required
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>

    <div class="sm:col-span-2">
      <label for="pickup" class="block text-sm font-bold text-ink-800"> Pickup location </label>
      <input
        id="pickup"
        v-model="form.pickup"
        type="text"
        required
        placeholder="e.g. King Mswati III International Airport, or your hotel's name and area"
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 placeholder:text-ink-900/40 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>

    <div v-if="isAirportTransfer" class="sm:col-span-2">
      <label for="terminal" class="block text-sm font-bold text-ink-800"> Terminal number </label>
      <input
        id="terminal"
        v-model="form.terminal"
        type="text"
        required
        placeholder="e.g. Terminal 1 / Arrivals"
        class="mt-1.5 w-full rounded-lg border border-ink-800/25 bg-mist-50 px-3 py-2.5 text-ink-900 placeholder:text-ink-900/40 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </div>

    <div class="sm:col-span-2">
      <p class="mb-2 font-mono text-xs uppercase tracking-widest text-ink-800/50">
        Message preview
      </p>
      <pre
        class="whitespace-pre-wrap rounded-lg border border-dashed border-ink-800/25 bg-mist-100 p-3 font-mono text-xs leading-relaxed text-ink-900/80"
        >{{ whatsappMessage }}</pre
      >
    </div>

    <div class="sm:col-span-2">
      <button
        type="submit"
        class="glow-amber inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/10 bg-amber-500 px-6 py-3.5 font-body text-base font-bold text-ink-900 transition hover:bg-amber-600 sm:w-auto"
      >
        Send to WhatsApp
      </button>
      <p class="mt-2 text-xs text-ink-900/60">
        This opens WhatsApp with your details filled in. Nothing is booked or charged yet —
        you'll confirm everything, including payment, directly with us in the chat.
      </p>
      <p v-if="submitted" class="mt-2 text-sm font-semibold text-ink-800">
        WhatsApp should have opened in a new tab. Didn't work? Save our number and message us
        directly.
      </p>
    </div>
  </form>
</template>
