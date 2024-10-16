export const useHighlightSpokenText = () => {
  const escapeHtml = (unsafeText: string): string => {
    return unsafeText
      .replace(/&/g, ' ')
      .replace(/</g, ' ')
      .replace(/>/g, ' ')
      .replace(/"/g, ' ')
      .replace(/'/g, ' ')
  }

  const highlight = (text: string, startIndex: number, length: number): string => {
    if (startIndex < 0 || length <= 0 || startIndex + length > text.length) {
      return text
    }

    const safeText = escapeHtml(text)

    const before = safeText.slice(0, startIndex)
    const target = safeText.slice(startIndex, startIndex + length)
    const after = safeText.slice(startIndex + length)

    return `${before}<mark>${target}</mark>${after}`
  }

  return {
    highlight
  }
}
