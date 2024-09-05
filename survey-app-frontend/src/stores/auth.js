import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      data: { name: "John" },
      token: null,
    },
  }),
  getters: {},
  actions: {},
});
