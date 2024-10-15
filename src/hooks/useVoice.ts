import { ref } from 'vue'
import { PITCH_DEFAULT, SPEED_DEFAULT } from '@/constatns/voice'

const synth = window.speechSynthesis

export const useVoice = () => {
  // in Google Chrome the voices are not ready on page load
  if ('onvoiceschanged' in synth) {
    synth.onvoiceschanged = loadVoices
  } else {
    loadVoices()
  }

  const isSpeaking = ref(false)
  const synthVoices = ref<SpeechSynthesisVoice[]>(synth.getVoices())

  function loadVoices() {
    synthVoices.value = synth.getVoices()
  }

  type TOptional = {
    speed?: number
    pitch?: number
    onBoundary?: (charIndex: number, charLength: number) => void
  }

  const playText = (message: string, voiceName: string, optional?: TOptional) => {
    const { speed = SPEED_DEFAULT, pitch = PITCH_DEFAULT, onBoundary } = optional || {}

    const finded = synthVoices.value.find(({ name }) => name === voiceName)

    if (!finded) return

    const utterThis = new SpeechSynthesisUtterance(message)

    utterThis.voice = finded
    utterThis.lang = finded.lang
    utterThis.rate = speed
    utterThis.pitch = pitch

    utterThis.onstart = () => {
      isSpeaking.value = true
    }

    utterThis.onerror = () => {
      isSpeaking.value = false
    }

    utterThis.onend = () => {
      isSpeaking.value = false

      if (onBoundary) {
        onBoundary(0, 0)
      }
    }

    utterThis.onboundary = (event) => {
      if (onBoundary) {
        onBoundary(event.charIndex, event.charLength)
      }
    }

    synth.speak(utterThis)
  }

  const stop = () => {
    synth.cancel()
  }

  return {
    stop,
    playText,
    isSpeaking,
    synthVoices
  }
}
