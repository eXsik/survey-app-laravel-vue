<template>
  <header class="bg-white dark:bg-gray-700">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1
        class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ title }}
      </h1>
    </div>
  </header>
  <main class="dark:bg-gray-700">
    <div
      class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-700 min-h-full"
    >
      <slot></slot>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style></style>
