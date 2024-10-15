<script setup lang="ts">
import { FwbA, FwbCard, FwbFooter, FwbHeading, FwbP } from 'flowbite-vue'
</script>

<template>
  <main>
    <FwbCard variant="image" class="mx-auto mt-10 p-5">
      <FwbHeading tag="h2" class="mb-6">How to add more voices</FwbHeading>

      <FwbP>
        <FwbA
          href="https://texttospeech.io/how-to-add-more-voices-for-speech-synthesis-reader-p10"
          class="font-bold"
        >
          External link
        </FwbA>
        - Install a new Text-to-Speech language in Windows 10
      </FwbP>
    </FwbCard>

    <FwbFooter class="mt-auto">
      <RouterLink
        :to="{ name: 'home' }"
        class="hover:underline text-sm font-medium text-gray-500 dark:text-gray-400 mx-auto"
      >
        Home
      </RouterLink>
    </FwbFooter>
  </main>
</template>

<style scoped></style>
