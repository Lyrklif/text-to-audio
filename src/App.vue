<script setup lang="ts">
import { RouterView } from 'vue-router'
import { FwbA, FwbCard, FwbFooter, FwbHeading } from 'flowbite-vue'
</script>

<template>
  <div class="app gap-10 pt-10">
    <FwbCard variant="image" class="app-header mx-auto p-5">
      <FwbHeading tag="h1" class="text-center">Text to audio</FwbHeading>
    </FwbCard>

    <main class="app-content">
      <RouterView />
    </main>

    <FwbFooter class="app-footer text-center justify-center">
      <FwbA href="https://github.com/Lyrklif/text-to-audio" target="_blank" class="mx-auto">
        GitHub
      </FwbA>
    </FwbFooter>
  </div>
</template>

<style>
.app {
  min-height: 100vh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
}

.app-header {
  grid-area: header;
}

.app-content {
  grid-area: main;
  padding: 15px 5px 10px 5px;
}

.app-footer {
  grid-area: footer;
}
</style>
