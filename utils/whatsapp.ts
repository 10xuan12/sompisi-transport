// Owner's (Sifiso W. Magagula) WhatsApp number — bookings and enquiries go
// straight to him.
export const WHATSAPP_NUMBER = '+268 7614 1460'

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
