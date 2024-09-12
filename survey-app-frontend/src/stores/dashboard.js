import { defineStore } from "pinia";
import axiosClient from "../http/axios";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    dashboard: {
      data: [],
      isLoading: false,
    },
  }),
  getters: {},
  persist: true,
  actions: {
    getDashboardData() {
      this.dashboard.isLoading = true;
      return axiosClient
        .get(`/dashboard`)
        .then((res) => {
          this.dashboard.isLoading = false;
          this.dashboard.data = res.data;

          return res;
        })
        .catch((err) => {
          this.dashboard.isLoading = false;
          console.error(err);
          return err;
        });
    },
  },
});
