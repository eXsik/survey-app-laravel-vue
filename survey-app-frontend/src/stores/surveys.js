import { defineStore } from "pinia";
import axiosClient from "../http/axios";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: {
      data: [],
      isLoading: false,
    },
    currentSurvey: {
      data: {},
      isLoading: false,
    },
    isLoading: false,
    error: null,
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    notification: {
      show: false,
      type: null,
      message: null,
    },
  }),
  getters: {},
  persist: true,
  actions: {
    async fetchSurveys() {
      this.surveys.isLoading = true;
      this.error = null;
      try {
        await axiosClient.get(`/survey`).then((res) => {
          this.surveys.data = res.data.data;
        });
      } catch (error) {
        console.error("Error fetching surveys:", error);
        this.error = "Failed to fetch surveys";
      } finally {
        this.surveys.isLoading = false;
      }
    },
    async getSurveyById(id) {
      this.currentSurvey.isLoading = true;
      this.error = null;
      try {
        await axiosClient.get(`/survey/${id}`).then((res) => {
          this.currentSurvey.data = res.data.data;

          return res.data.data;
        });
      } catch (error) {
        console.error(`Error fetching survey ${id}:`, error);
        this.error = `Failed to fetch survey ${id}`;
      } finally {
        this.currentSurvey.isLoading = false;
      }
    },
    async saveSurvey(survey) {
      delete survey.image_url;
      let response;

      if (survey.id) {
        // PUT
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            return res;
          });
      } else {
        // CREATE
        response = axiosClient.post(`/survey`, survey).then((res) => {
          return res;
        });
      }

      return response;
    },

    async deleteSurvey(surveyId) {
      try {
        this.isLoading = true;

        axiosClient.delete(`/survey/${surveyId}`).then((res) => {
          return res;
        });
      } catch (error) {
        console.error("Error fetching surveys:", error);
        this.error = "Failed to fetch surveys";
      } finally {
        this.isLoading = false;
      }
    },

    notify(message, type) {
      this.notification.show = true;
      this.notification.type = type;
      this.notification.message = message;

      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },
  },
});
