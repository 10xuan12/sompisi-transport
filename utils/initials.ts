/**
 * Derives a 1–2 letter initials badge from a full name — first letter of
 * the first word + first letter of the last word (middle names/initials
 * are skipped), e.g. "Sifiso W. Magagula" -> "SM". Used by AvatarBadge as
 * a placeholder identity marker until real photos exist.
 */
export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? ''
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}
