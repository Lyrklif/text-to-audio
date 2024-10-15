<script setup lang="ts">
import { FwbA, FwbAlert, FwbCard, FwbHeading, FwbP } from 'flowbite-vue'
</script>

<template>
  <main>
    <FwbCard variant="image" class="p-3 text-center mx-auto">
      <RouterLink
        :to="{ name: 'home' }"
        class="hover:underline text-md font-medium text-gray-500 dark:text-gray-400 mx-auto"
      >
        Return to main page
      </RouterLink>
    </FwbCard>

    <FwbCard variant="image" class="mx-auto mt-10 p-5">
      <FwbHeading tag="h2" class="mb-6">How to add more voices</FwbHeading>

      <FwbAlert class="text-md mt-3">
        <FwbA
          href="https://support.microsoft.com/en-us/topic/download-languages-and-voices-for-immersive-reader-read-mode-and-read-aloud-4c83a8d8-7486-42f7-8e46-2b0fdf753130"
          class="font-bold"
          target="_blank"
        >
          External link
        </FwbA>
        <FwbP>Install a new Text-to-Speech language in Windows 11</FwbP>
      </FwbAlert>

      <FwbAlert class="text-md">
        <FwbA
          href="https://texttospeech.io/how-to-add-more-voices-for-speech-synthesis-reader-p10"
          class="font-bold"
          target="_blank"
        >
          External link
        </FwbA>
        <FwbP>Install a new Text-to-Speech language in Windows 10</FwbP>
      </FwbAlert>

      <FwbAlert class="text-md mt-3">
        <FwbA
          href="https://www.avs4you.com/blog/change-text-to-speech-language-voice/"
          class="font-bold"
          target="_blank"
        >
          External link
        </FwbA>
        <FwbP>Install a new Text-to-Speech language in Windows 7</FwbP>
      </FwbAlert>
    </FwbCard>
  </main>
</template>
