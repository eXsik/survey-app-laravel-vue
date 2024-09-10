import { defineStore } from "pinia";
import axiosClient from "../http/axios";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [],
    // currentSurvey: {
    //   isLoading: false,
    //   data: {},
    // },
    isLoading: false,
    error: null,
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  }),
  getters: {},
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
    getSurveyById(id) {
      return this.surveys.find((survey) => survey.id === parseInt(id));
    },
    saveSurvey(survey) {
      delete survey.image_url;
      let response;

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
