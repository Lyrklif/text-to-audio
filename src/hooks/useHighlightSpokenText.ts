export const useHighlightSpokenText = () => {
  const escapeHtml = (unsafeText: string): string => {
    return unsafeText
      .replace(/&/g, ' ')
      .replace(/</g, ' ')
      .replace(/>/g, ' ')
      .replace(/"/g, ' ')
      .replace(/'/g, ' ')
  }

  const highlight = (
    text: string,
    startIndex: number,
    length: number,
    highlightClass?: string
  ): string => {
    if (startIndex < 0 || length <= 0 || startIndex + length > text.length) {
      return text
    }

    const safeText = escapeHtml(text)

    const before = safeText.substring(0, startIndex)
    const target = safeText.substring(startIndex, startIndex + length)
    const after = safeText.substring(startIndex + length)

    return `${before}<mark class="${highlightClass}">${target}</mark>${after}`
  }

  return {
    highlight
  }
}
