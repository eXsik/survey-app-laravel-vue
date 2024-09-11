import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notification: {
      show: false,
      type: null,
      message: null,
    },
  }),
  getters: {},
  actions: {
    notify({ message, type }) {
      this.notification.show = true;
      this.notification.type = type;
      this.notification.message = message;

      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },
  },
});
