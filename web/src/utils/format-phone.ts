/**
 * Converts a human-readable phone string into a `tel:` href.
 * Returns null when the input is empty or undefined.
 *
 * @example
 * formatPhoneHref("(555) 123-4567") // "tel:+15551234567"
 * formatPhoneHref(undefined)         // null
 */
export function formatPhoneHref(phone?: string): string | null {
  if (!phone) return null;
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
