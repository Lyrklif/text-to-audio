<script setup lang="ts">
import { computed, ref } from 'vue'
import { FwbAlert, FwbButton, FwbCard, FwbP, FwbRange, FwbSelect, FwbTextarea } from 'flowbite-vue'
import { useVoice } from '@/hooks/useVoice'
import { useHighlightText } from '@/hooks/useHighlightText'
import { DEFAULT_TEXT, MAX_TEXT_LENGTH, PITCH_DEFAULT, SPEED_DEFAULT } from '@/constatns/voice'
import { escapeHtml } from '@/helpers/escapeHtml'

const highlightClasses = 'bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-blue-800'

const { stop, playText, isSpeaking, synthVoices, errorText } = useVoice()
const { highlight, setText } = useHighlightText()

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
  setText(escapeHtml(trimmedText.value))
  highlightText.value = highlight(charIndex, charLength, highlightClasses)

  if (elapsedTime !== 0) {
    timer.value = (elapsedTime % 60000) / 1000
  }
}

const onPlay = () => {
  if (!voice.value) return
  if (!trimmedText.value) return

  playText(trimmedText.value, voice.value, { speed: speed.value, pitch: pitch.value, onBoundary })
}

const resetText = () => {
  message.value = ''
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <FwbCard
      variant="image"
      class="mx-auto md:mx-0 p-5 justify-self-center md:justify-self-end w-full"
    >
      <FwbTextarea
        v-model="message"
        :disabled="isSpeaking"
        :rows="10"
        label=""
        :maxlength="MAX_TEXT_LENGTH"
        placeholder="Write your text..."
      />

      <div class="flex justify-end items-center gap-2">
        <FwbP class="text-right text-sm text-gray-400 mb-0">
          {{ message.length }} / {{ MAX_TEXT_LENGTH }}
        </FwbP>

        <FwbButton :disabled="isSpeaking" @click="resetText" color="light" size="xs" class="ml-2">
          Reset
        </FwbButton>
      </div>
    </FwbCard>

    <FwbCard
      variant="image"
      class="mx-auto md:mx-0 p-5 justify-self-center md:justify-self-start w-full"
    >
      <FwbSelect v-model="voice" :options="voices" label="Select a voice" />

      <RouterLink
        :to="{ name: 'instructions' }"
        class="hover:underline text-md font-medium text-gray-500 dark:text-gray-400 mx-auto"
      >
        How to add more voices
      </RouterLink>

      <FwbRange
        v-model="speed"
        :min="0.5"
        :max="2"
        :steps="0.1"
        :label="`Speed: ${speed}`"
        size="lg"
      />

      <FwbRange
        v-model="pitch"
        :min="0.0"
        :max="2"
        :steps="0.1"
        :label="`Pitch: ${pitch}`"
        size="lg"
      />

      <FwbButton :disabled="isSpeaking" @click="onPlay" class="my-4 mr-2">Play</FwbButton>
      <FwbButton :disabled="!isSpeaking" @click="stop" class="my-4 mr-2">Stop</FwbButton>
    </FwbCard>

    <FwbCard variant="image" class="mx-auto p-5 md:col-span-2 justify-self-center w-full">
      <FwbAlert v-if="errorText" type="danger">
        {{ errorText }}
      </FwbAlert>

      <div v-else>
        <div v-html="highlightText" />
        <FwbP class="text-right text-sm text-gray-400">Elapsed: {{ timer.toFixed(2) }}s</FwbP>
      </div>
    </FwbCard>
  </div>
</template>
