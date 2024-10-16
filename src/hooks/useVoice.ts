import { ref } from 'vue'
import { PITCH_DEFAULT, SPEED_DEFAULT } from '@/constatns/voice'

type TOptional = {
  speed?: number
  pitch?: number
  onBoundary?: (charIndex: number, charLength: number, elapsedTime: number) => void
}
const getSynth = () => window.speechSynthesis

export const useVoice = () => {
  const synth = getSynth()

  const isSpeaking = ref<boolean>(false)
  const synthVoices = ref<SpeechSynthesisVoice[]>([])
  const errorText = ref<string>('')

  const loadVoices = () => {
    const voices = synth.getVoices()

    if (voices.length > 0) {
      synthVoices.value = voices

      return
    }

    // in Google Chrome the voices are not ready on page load
    synth.onvoiceschanged = () => {
      synthVoices.value = synth.getVoices()
    }
  }

  loadVoices()

  const findVoice = (voiceName: string) => {
    return synthVoices.value.find(({ name }) => name === voiceName)
  }

  const playText = (text: string, voiceName: string, optional?: TOptional) => {
    const { speed = SPEED_DEFAULT, pitch = PITCH_DEFAULT, onBoundary } = optional || {}

    errorText.value = ''
    const voice = findVoice(voiceName)

    if (!voice) {
      errorText.value = `Voice "${voiceName}" not found`
      return
    }

    synth.cancel()
    isSpeaking.value = true

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.lang = voice.lang
    utterance.rate = speed
    utterance.pitch = pitch

    utterance.onerror = (error: SpeechSynthesisErrorEvent) => {
      isSpeaking.value = false
      const errorValue: SpeechSynthesisErrorCode = error?.error

      if (errorValue !== 'interrupted') {
        errorText.value = `SpeechSynthesis error: ${errorValue}`
      }
    }

    utterance.onend = () => {
      isSpeaking.value = false
    }

    utterance.onboundary = (event) => {
      if (onBoundary) {
        onBoundary(event.charIndex, event.charLength, event.elapsedTime)
      }
    }

    synth.speak(utterance)
  }

  const stop = () => {
    synth.cancel()
  }

  return {
    stop,
    playText,
    isSpeaking,
    synthVoices,
    errorText
  }
}
