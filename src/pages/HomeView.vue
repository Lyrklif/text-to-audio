<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  FwbButton,
  FwbCard,
  FwbHeading,
  FwbP,
  FwbRange,
  FwbSelect,
  FwbTextarea
} from 'flowbite-vue'

const synth = window.speechSynthesis

const message = ref('')
const voice = ref<string | null>(null)
const speed = ref(1.0)
const pitch = ref(1.0)
const synthVoices = ref<SpeechSynthesisVoice[]>([])

function loadVoices() {
  synthVoices.value = synth.getVoices()
}

const voices = computed(() => {
  return synthVoices.value.map(({ name }) => ({ value: name, name }))
})

// in Google Chrome the voices are not ready on page load
if ('onvoiceschanged' in synth) {
  synth.onvoiceschanged = loadVoices
} else {
  loadVoices()
}

const playText = () => {
  if (!voice.value) {
    return
  }

  const utterThis = new SpeechSynthesisUtterance(message.value)

  const finded = synthVoices.value.find(({ name }) => name === voice.value)

  if (!finded) {
    return
  }

  utterThis.voice = finded
  utterThis.lang = finded.lang
  utterThis.rate = speed.value
  utterThis.pitch = pitch.value

  synth.speak(utterThis)
}

const stop = () => {
  synth.cancel()
}
</script>

<template>
  <FwbCard variant="image" class="mx-auto mt-10 p-5">
    <FwbHeading tag="h1">Text to audio</FwbHeading>

    <form class="mt-6" @submit.prevent>
      <FwbTextarea
        v-model="message"
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

      <FwbButton @click="playText" class="my-4 mr-2">Play</FwbButton>
      <FwbButton @click="stop" class="my-4 mr-2">Stop</FwbButton>
    </form>

    <FwbP>{{ message }}</FwbP>
  </FwbCard>
</template>
