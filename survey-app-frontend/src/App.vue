<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <h1 class="text-3xl font-bold underline bg-red-400">
    {{ authStore.user.data.name }}
  </h1>
  <HelloWorld />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
