<script setup lang="ts">
const TEAM = [
  {
    name: 'Sifiso W. Magagula',
    role: 'Owner · Bookings & Coordination',
    desc: 'Arranges every trip personally and is your first point of contact.',
    phone: '+268 7614 1460'
  },
  {
    name: 'Bhekokuhle Brilliant Magagula',
    role: 'Driver',
    desc: 'On the road daily across Eswatini and cross-border routes.',
    phone: '+268 7693 5342'
  }
]
</script>

<template>
  <div>
    <p class="mb-2.5 text-[10px] font-extrabold tracking-[0.16em] text-burgundy">THE TEAM</p>
    <h2 class="mb-5 text-xl font-bold text-navy">Who's behind the wheel</h2>

    <div
      v-for="member in TEAM"
      :key="member.name"
      class="flex gap-4 border-b border-navy/[0.08] py-5"
    >
      <AvatarBadge :initials="getInitials(member.name)" :size="52" />
      <div>
        <p class="text-[15px] font-bold text-navy">{{ member.name }}</p>
        <p class="mt-[3px] text-[10.5px] font-extrabold uppercase tracking-wide text-burgundy">
          {{ member.role }}
        </p>
        <p class="mt-[5px] text-[13px] font-bold leading-relaxed text-navy/60">{{ member.desc }}</p>
        <a
          :href="buildWhatsAppLink(`Hi ${member.name.split(' ')[0]}, I'd like to ask about a ride.`, member.phone)"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-[9px] inline-block text-xs font-bold text-burgundy"
        >
          {{ member.phone }} · WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>
