import { defineStore } from "pinia";
import axiosClient from "../http/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  }),
  getters: {},
  actions: {
    async register(user) {
      return axiosClient.post("/register", user).then((response) => {
        this.user.data = response.data.user;
        this.user.token = response.data.token;
        sessionStorage.setItem("TOKEN", response.data.token);

        return response.data;
      });
    },
    async login(user) {
      return axiosClient.post("/login", user).then((response) => {
        this.user.data = response.data.user;
        this.user.token = response.data.token;
        sessionStorage.setItem("TOKEN", response.data.token);

        return response.data;
      });
    },
    async logout() {
      return axiosClient
        .post("/logout")
        .then((response) => {
          this.user.token = null;
          this.user.data = {};
          console.log("response", response);
          sessionStorage.removeItem("TOKEN");

          return response;
        })
        .catch((err) => console.error(err));
    },
  },
});
