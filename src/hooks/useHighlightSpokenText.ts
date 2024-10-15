export const useHighlightSpokenText = () => {
  const highlight = (text: string, startIndex: number, length: number) => {
    const before = text.substr(0, startIndex)
    const target = text.substr(startIndex, length)
    const after = text.substr(startIndex + length)

    const result = `${before}<mark>${target}</mark>${after}`

    return result
  }

  return {
    highlight
  }
}
