import { defineStore } from "pinia";
import axiosClient from "../http/axios";
import { useSurveyStore } from "./surveys";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      data: JSON.parse(sessionStorage.getItem("USER")),
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
        let user = JSON.stringify(response.data.user);
        sessionStorage.setItem("USER", user);

        return response.data;
      });
    },
    async login(user) {
      return axiosClient.post("/login", user).then((response) => {
        this.user.data = response.data.user;
        this.user.token = response.data.token;

        sessionStorage.setItem("TOKEN", response.data.token);
        let user = JSON.stringify(response.data.user);
        sessionStorage.setItem("USER", user);

        return response.data;
      });
    },
    async logout() {
      return axiosClient
        .post("/logout")
        .then((response) => {
          this.user.token = null;
          this.user.data = {};
          const surveyStore = useSurveyStore();
          surveyStore.surveys = [];

          sessionStorage.removeItem("TOKEN");
          sessionStorage.removeItem("USER");

          localStorage.removeItem("survey");

          return response;
        })
        .catch((err) => console.error(err));
    },
  },
});
