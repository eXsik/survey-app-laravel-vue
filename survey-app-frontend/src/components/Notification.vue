<template>
  <div
    v-if="notification.show"
    class="fixed w-[350px] right-4 top-4 py-4 px-6 font-medium text-sm rounded-md text-white animate-fade-in-down"
    :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
  >
    {{ notification.message }}
  </div>
</template>

<script setup>
// import { computed } from "vue";
import { useNotificationStore } from "../stores/notifications";
import { storeToRefs } from "pinia";

const notificationStore = useNotificationStore();
const { notification } = storeToRefs(notificationStore);

console.log("notification", notification);
// const notification = computed(() => surveyStore.notification);
</script>

<style></style>
