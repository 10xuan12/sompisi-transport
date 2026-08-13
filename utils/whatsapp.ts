// Intentional, not a stray test value: this is the owner's son's number,
// used temporarily to receive bookings until a dedicated WhatsApp Business
// number is set up. Swap it for that number when it exists — no rush.
export const WHATSAPP_NUMBER = '+886 908 026 774'

/**
 * Builds a https://wa.me/... deep link that opens WhatsApp with a
 * pre-filled message. No backend/API involved — this is the entire
 * "integration": a formatted string in a URL.
 */
export function buildWhatsAppLink(message: string, phoneNumber: string = WHATSAPP_NUMBER): string {
  const digitsOnly = phoneNumber.replace(/[^\d]/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${digitsOnly}?text=${encodedMessage}`
}
