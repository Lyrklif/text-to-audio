<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  FwbButton,
  FwbCard,
  FwbFooter,
  FwbHeading,
  FwbP,
  FwbRange,
  FwbSelect,
  FwbTextarea
} from 'flowbite-vue'
import { useVoice } from '@/hooks/useVoice'
import { useHighlightSpokenText } from '@/hooks/useHighlightSpokenText'
import { DEFAULT_TEXT, MAX_TEXT_LENGTH, PITCH_DEFAULT, SPEED_DEFAULT } from '@/constatns/voice'

const { stop, playText, isSpeaking, synthVoices } = useVoice()
const { highlight } = useHighlightSpokenText()

const message = ref<string>(DEFAULT_TEXT)
const voice = ref<string | null>(null)
const speed = ref<number>(SPEED_DEFAULT)
const pitch = ref<number>(PITCH_DEFAULT)
const highlightText = ref<string>(DEFAULT_TEXT)
const timer = ref<number>(0)

const voices = computed(() => {
  return synthVoices.value.map(({ name }) => ({ value: name, name }))
})

const trimmedText = computed(() => {
  return message.value.trim()
})

const onBoundary = (charIndex: number, charLength: number, elapsedTime: number) => {
  highlightText.value = highlight(trimmedText.value, charIndex, charLength)
  timer.value = elapsedTime === 0 ? 0 : (elapsedTime % 60000) / 1000
}

const onPlay = () => {
  if (!voice.value) return
  if (!trimmedText.value) return

  playText(trimmedText.value, voice.value, { speed: speed.value, pitch: pitch.value, onBoundary })
}
</script>

<template>
  <FwbCard variant="image" class="mx-auto mt-10 p-5">
    <FwbHeading tag="h1">Text to audio</FwbHeading>
  </FwbCard>

  <div class="flex flex-col md:flex-row gap-5 justify-center my-5">
    <FwbCard variant="image" class="mx-auto md:mx-0 p-5">
      <form @submit.prevent>
        <FwbTextarea
          v-model="message"
          :disabled="isSpeaking"
          :rows="10"
          label=""
          :maxlength="MAX_TEXT_LENGTH"
          placeholder="Write your text..."
        />
        <FwbP class="text-right text-sm text-gray-400">
          {{ message.length }} / {{ MAX_TEXT_LENGTH }}
        </FwbP>

        <FwbSelect v-model="voice" :options="voices" label="Select a voice" />

        <FwbRange v-model="speed" :min="0.5" :max="2" :steps="0.1" label="Speed" />
        <FwbP>Value: {{ speed }}</FwbP>

        <FwbRange v-model="pitch" :min="0.0" :max="2" :steps="0.1" label="Pitch" />
        <FwbP>Value: {{ pitch }}</FwbP>

        <FwbButton :disabled="isSpeaking" @click="onPlay" class="my-4 mr-2">Play</FwbButton>
        <FwbButton :disabled="!isSpeaking" @click="stop" class="my-4 mr-2">Stop</FwbButton>
      </form>
    </FwbCard>

    <FwbCard variant="image" class="mx-auto md:mx-0 p-5">
      <div v-html="highlightText" />
      <FwbP class="text-right text-sm text-gray-400">Elapsed: {{ timer.toFixed(2) }}s</FwbP>
    </FwbCard>
  </div>

  <FwbFooter class="mt-auto">
    <RouterLink
      :to="{ name: 'instructions' }"
      class="hover:underline text-sm font-medium text-gray-500 dark:text-gray-400 mx-auto"
    >
      How to add more voices
    </RouterLink>
  </FwbFooter>
</template>
