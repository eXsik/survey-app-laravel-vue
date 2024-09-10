import { defineStore } from "pinia";
import axiosClient from "../http/axios";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [],
    isLoading: false,
    error: null,
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  }),
  getters: {},
  persist: true,
  actions: {
    async fetchSurveys() {
      this.isLoading = true;
      this.error = null;
      try {
        await axiosClient.get(`/survey`).then((res) => {
          this.surveys = res.data.data;
        });
      } catch (error) {
        console.error("Error fetching surveys:", error);
        this.error = "Failed to fetch surveys";
      } finally {
        this.isLoading = false;
      }
    },
    getSurveyById(id) {
      return this.surveys.find((survey) => survey.id == id);
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
    // addSurvey(survey) {
    //   this.surveys = [...state.surveys, survey.data];
    // },
    // updateSurvey(survey) {
    //   this.surveys = this.surveys.map((sur) =>
    //     sur.id === survey.data.id ? survey.data : sur
    //   );
    // },
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

      // this.surveys = this.surveys.filter((sur) => sur.id !== surveyId);
    },
  },
});
