import { ref } from 'vue'

export const useHighlightText = () => {
  const text = ref<string>('')

  const setText = (value: string = '') => {
    text.value = value
  }

  const highlight = (startIndex: number, length: number, highlightClass?: string): string => {
    if (startIndex < 0 || length <= 0 || startIndex + length > text.value.length) {
      return text.value
    }

    const before = text.value.substring(0, startIndex)
    const target = text.value.substring(startIndex, startIndex + length)
    const after = text.value.substring(startIndex + length)

    return `${before}<mark class="${highlightClass}">${target}</mark>${after}`
  }

  return {
    highlight,
    setText
  }
}
