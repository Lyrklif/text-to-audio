export const escapeHtml = (unsafeText: string): string => {
  return unsafeText
    .replace(/&/g, ' ')
    .replace(/</g, ' ')
    .replace(/>/g, ' ')
    .replace(/"/g, ' ')
    .replace(/'/g, ' ')
}
