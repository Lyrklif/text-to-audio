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

    <FwbFooter>
      <FwbA href="#" class="ml-auto">GitHub</FwbA>
    </FwbFooter>
  </div>
</template>
