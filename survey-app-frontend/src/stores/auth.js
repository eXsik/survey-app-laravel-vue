import { defineStore } from "pinia";

const url = import.meta.env.VITE_BACKEND_API;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  }),
  getters: {},
  actions: {
    logout() {
      this.user = { data: { name: "", email: "", imageUrl: "" }, token: null };
    },
    async register(user) {
      console.log("user", user.value);
      try {
        console.log("url", url);
        const response = await fetch(`${url}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(user.value),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          this.user = data;
          sessionStorage.setItem("TOKEN", data.token);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
