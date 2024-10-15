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

const { stop, playText, isSpeaking, synthVoices } = useVoice()

const message = ref('')
const voice = ref<string | null>(null)
const speed = ref(1.0)
const pitch = ref(1.0)

const voices = computed(() => {
  return synthVoices.value.map(({ name }) => ({ value: name, name }))
})

const onPlay = () => {
  if (!voice.value) return

  const text = message.value.trim()

  if (!text) return

  playText(text, voice.value, { speed: speed.value, pitch: pitch.value })
}
</script>

<template>
  <FwbCard variant="image" class="mx-auto mt-10 p-5">
    <FwbHeading tag="h1">Text to audio</FwbHeading>

    <form class="mt-6" @submit.prevent>
      <FwbTextarea
        v-model="message"
        :disabled="isSpeaking"
        :rows="10"
        label=""
        maxlength="200"
        placeholder="Write your text..."
      />

      <FwbSelect v-model="voice" :options="voices" label="Select a voice" />

      <FwbRange v-model="speed" :min="0.5" :max="2" :steps="0.1" label="Speed" />
      <FwbP>Value: {{ speed }}</FwbP>

      <FwbRange v-model="pitch" :min="0.0" :max="2" :steps="0.1" label="Pitch" />
      <FwbP>Value: {{ pitch }}</FwbP>

      <FwbButton :disabled="isSpeaking" @click="onPlay" class="my-4 mr-2">Play</FwbButton>
      <FwbButton :disabled="!isSpeaking" @click="stop" class="my-4 mr-2">Stop</FwbButton>
    </form>
  </FwbCard>

  <FwbFooter class="mt-auto">
    <RouterLink
      :to="{ name: 'instructions' }"
      class="hover:underline text-sm font-medium text-gray-500 dark:text-gray-400 mx-auto"
    >
      How to add more voices
    </RouterLink>
  </FwbFooter>
</template>
