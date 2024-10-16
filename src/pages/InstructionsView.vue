<script setup lang="ts">
import { FwbA, FwbAlert, FwbCard, FwbP } from 'flowbite-vue'
</script>

<template>
  <FwbCard class="text-center mx-auto">
    <RouterLink
      :to="{ name: 'home' }"
      class="block w-full text-md font-medium text-gray-500 dark:text-gray-400 mx-auto p-3"
    >
      Home
    </RouterLink>
  </FwbCard>

  <FwbCard variant="image" class="mx-auto mt-10">
    <FwbAlert class="text-md">
      <FwbA
        href="https://www.avs4you.com/blog/change-text-to-speech-language-voice/"
        class="font-bold"
        target="_blank"
      >
        External link
      </FwbA>
      <FwbP>Install a new Text-to-Speech language on Windows 7, 10 and 11</FwbP>
    </FwbAlert>
  </FwbCard>
</template>
