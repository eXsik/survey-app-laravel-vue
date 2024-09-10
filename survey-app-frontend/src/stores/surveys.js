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
        axiosClient.get(`/survey`).then((res) => {
          this.surveys = res.data.data;
        });
      } catch (error) {
        console.error("Error fetching surveys:", error);
        this.error = "Failed to fetch surveys";
      } finally {
        this.isLoading = false;
      }

      return this.surveys;
    },
    async getSurveyById(id) {
      console.log("surveys", this.surveys);
      return this.surveys.find((survey) => survey.id == id);
    },
    async saveSurvey(survey) {
      delete survey.image_url;
      let response;

      console.log("save survey", survey);
      if (survey.id) {
        // PUT
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            console.log("save survey put", res);
            return res;
          });
      } else {
        // CREATE
        response = axiosClient.post(`/survey`, survey).then((res) => {
          console.log("save survey create", res);
          return res;
        });
      }

      return response;
    },
    addSurvey(survey) {
      this.surveys = [...state.surveys, survey.data];
    },
    updateSurvey(survey) {
      this.surveys = this.surveys.map((sur) =>
        sur.id === survey.data.id ? survey.data : sur
      );
    },
  },
});
