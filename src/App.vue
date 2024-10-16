<script setup lang="ts">
import { RouterView } from 'vue-router'
import { FwbA, FwbCard, FwbFooter, FwbHeading } from 'flowbite-vue'
</script>

<template>
  <div class="min-h-full flex flex-col gap-10 pt-10">
    <FwbCard variant="image" class="mx-auto p-5">
      <FwbHeading tag="h1" class="text-center">Text to audio</FwbHeading>
    </FwbCard>

    <RouterView />

    <FwbFooter class="mt-auto mb-0">
      <FwbA href="https://github.com/Lyrklif/text-to-audio" class="ml-auto" target="_blank">
        GitHub
      </FwbA>
    </FwbFooter>
  </div>
</template>
