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

  const loadVoices = () => {
    synthVoices.value = synth.getVoices()
  }

  // in Google Chrome the voices are not ready on page load
  if ('onvoiceschanged' in synth) {
    synth.onvoiceschanged = loadVoices
  } else {
    loadVoices()
  }

  const findVoice = (voiceName: string) => {
    return synthVoices.value.find(({ name }) => name === voiceName)
  }

  const playText = (message: string, voiceName: string, optional?: TOptional) => {
    const { speed = SPEED_DEFAULT, pitch = PITCH_DEFAULT, onBoundary } = optional || {}

    const voice = findVoice(voiceName)

    if (!voice) {
      console.error(`Voice "${voiceName}" not found`)
      return
    }

    synth.cancel()

    const utterance = new SpeechSynthesisUtterance(message)
    utterance.voice = voice
    utterance.lang = voice.lang
    utterance.rate = speed
    utterance.pitch = pitch

    utterance.onstart = () => {
      isSpeaking.value = true
    }

    utterance.onerror = (error) => {
      isSpeaking.value = false
      console.error('SpeechSynthesis error:', error)
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
    synthVoices
  }
}
