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
  { value: 'airport', label: 'Airport Transfer' },
  { value: 'local', label: 'Local Ride' },
  { value: 'crossborder', label: 'Cross-Border' },
  { value: 'school', label: 'School Run' }
] as const

type ServiceType = (typeof SERVICE_TYPES)[number]['value']

const formRef = ref<HTMLFormElement | null>(null)

const form = reactive({
  fullName: '',
  passengers: 1,
  serviceType: '' as ServiceType | '',
  destination: '',
  pickup: '',
  terminal: '',
  date: '',
  time: ''
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
    `- Pickup location: ${form.pickup || '-'}`
  ]

  if (isAirportTransfer.value && form.terminal) {
    lines.push(`- Terminal / flight number: ${form.terminal}`)
  }

  lines.push(`- Date: ${form.date || '-'}`, `- Time: ${form.time || '-'}`)

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

const inputClass =
  'mt-1.5 w-full rounded-sm border border-navy/20 bg-white px-3.5 py-3.5 text-sm font-bold text-navy placeholder:text-navy/40 focus:border-burgundy focus:outline-none'
const labelClass = 'block text-sm font-bold text-navy'
</script>

<template>
  <form ref="formRef" class="flex flex-col gap-3" novalidate @submit.prevent="handleSubmit">
    <div>
      <label for="fullName" :class="labelClass">Full name</label>
      <input
        id="fullName"
        v-model="form.fullName"
        type="text"
        required
        placeholder="e.g. Thandiwe Dlamini"
        :class="inputClass"
      />
    </div>

    <div class="flex gap-2.5">
      <div class="flex-1">
        <label for="passengers" :class="labelClass">Passengers</label>
        <input
          id="passengers"
          v-model.number="form.passengers"
          type="number"
          min="1"
          max="20"
          required
          :class="inputClass"
        />
      </div>
      <div class="flex-[1.4]">
        <label for="serviceType" :class="labelClass">Service</label>
        <select id="serviceType" v-model="form.serviceType" required :class="inputClass">
          <option value="" disabled>Select one…</option>
          <option v-for="option in SERVICE_TYPES" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <div>
      <label for="destination" :class="labelClass">Destination</label>
      <input
        id="destination"
        v-model="form.destination"
        type="text"
        required
        placeholder="e.g. Mbabane, Ezulwini, or hotel name"
        :class="inputClass"
      />
    </div>

    <div>
      <label for="pickup" :class="labelClass">Pickup location</label>
      <input
        id="pickup"
        v-model="form.pickup"
        type="text"
        required
        placeholder="e.g. King Mswati III International Airport, or your hotel's name and area"
        :class="inputClass"
      />
    </div>

    <div v-if="isAirportTransfer">
      <label for="terminal" :class="labelClass">Terminal / flight number</label>
      <input
        id="terminal"
        v-model="form.terminal"
        type="text"
        required
        placeholder="e.g. Terminal 1 / Arrivals"
        :class="inputClass"
      />
    </div>

    <div class="flex gap-2.5">
      <div class="flex-1">
        <label for="date" :class="labelClass">Date</label>
        <input id="date" v-model="form.date" type="date" required :class="inputClass" />
      </div>
      <div class="flex-1">
        <label for="time" :class="labelClass">Time</label>
        <input id="time" v-model="form.time" type="time" required :class="inputClass" />
      </div>
    </div>

    <div>
      <p class="mb-2 text-xs font-bold uppercase tracking-wide text-navy/50">Message preview</p>
      <pre
        class="whitespace-pre-wrap rounded-sm border border-dashed border-navy/25 bg-navy/[0.03] p-3 text-xs font-bold leading-relaxed text-navy/80"
        >{{ whatsappMessage }}</pre
      >
    </div>

    <button
      type="submit"
      class="mt-1 rounded-sm bg-burgundy px-6 py-4 text-[13px] font-extrabold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
    >
      SEND REQUEST VIA WHATSAPP
    </button>
    <p class="text-xs text-navy/60">
      This opens WhatsApp with your details filled in. Nothing is booked or charged yet — you'll
      confirm everything, including payment, directly with us in the chat.
    </p>
    <p v-if="submitted" class="text-sm font-bold text-navy">
      WhatsApp should have opened in a new tab. Didn't work? Save our number and message us
      directly.
    </p>
  </form>
</template>
