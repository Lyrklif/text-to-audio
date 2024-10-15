<script setup lang="ts">
import { RouterView } from 'vue-router'
import { FwbA, FwbCard, FwbFooter, FwbHeading } from 'flowbite-vue'
</script>

<template>
  <div class="min-h-full flex flex-col gap-10 pt-10">
    <FwbCard variant="image" class="mx-auto p-5">
      <FwbHeading tag="h1" class="text-center">Text to audio</FwbHeading>
    </FwbCard>

    <div>
      <RouterView />
    </div>

    <FwbFooter>
      <RouterLink
        :to="{ name: 'instructions' }"
        class="hover:underline text-md font-medium text-gray-500 dark:text-gray-400 mx-auto"
      >
        How to add more voices
      </RouterLink>

      <FwbA href="#">GitHub</FwbA>
    </FwbFooter>
  </div>
</template>
