import { defineStore } from "pinia";

const tempSurveys = [
  {
    id: 100,
    title: "Test survey",
    slug: "test-survey",
    status: false,
    image: "https://picsum.photos/id/123/400/400/",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    created_at: "2024-09-06 12:00:00",
    updated_at: "2024-09-06 12:00:00",
    expire_date: "2024-09-21 12:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "from which country are you",
        description: "",
        data: {
          options: [
            { uuid: "f5f4dc95-a2f4-469a-9bda-4d5b8be9f703", text: "USA" },
            { uuid: "dc7a59c2-4bda-4ea4-86b4-a8d87f56d0e2", text: "India" },
            { uuid: "3832e3c1-8975-48f2-9458-86186e15adc9", text: "UK" },
            { uuid: "0eac4661-de94-473d-806d-7f907ea8ec6f", text: "Brazil" },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "What videos you want to watch",
        description: "test 123",
        data: {
          options: [
            {
              uuid: "8e693d91-dbc2-4320-8ec4-ab474476fc0b",
              text: "JavaScript",
            },
            { uuid: "bb3d414f-81ac-4cb7-9f7b-dae6411cc311", text: "PHP" },
            { uuid: "b2d7329a-be38-4ea9-8e51-6f7cfb62c3cc", text: "Python" },
            { uuid: "fc8898af-71f4-40c0-b68a-a6bb871b70da", text: "C#" },
          ],
        },
      },
      {
        id: 3,
        type: "checkbox",
        question: "What videos you want to watch",
        description: "test 123",
        data: {
          options: [
            {
              uuid: "4966a05c-5f58-4b29-8708-2d0d77a7842c",
              text: "Laravel",
            },
            { uuid: "deb252c8-6d7e-4c59-822c-ce9c1bd0246f", text: "Yii2" },
            { uuid: "c09fbbf3-5c26-4b51-8ef0-2a872664bf67", text: "Symfony" },
            {
              uuid: "8a93a92e-a047-4eec-bd66-0ca9b4be50ad",
              text: "Codeigniter",
            },
          ],
        },
      },
      {
        id: 4,
        type: "radio",
        question: "Which Laravel framework you like most",
        description: "test 123",
        data: {
          options: [
            {
              uuid: "d602ef44-b26e-48c2-b5cf-25824aa447b1",
              text: "Laravel 5",
            },
            { uuid: "c38aea06-f1d5-4cf6-8209-7b645540ed3f", text: "Laravel 6" },
            { uuid: "2543b7c7-93ff-47ae-bdba-63fa9bcdcf3d", text: "Laravel 7" },
            {
              uuid: "026ec39e-069f-4dcf-9fef-873f15ef04d0",
              text: "Laravel 8",
            },
          ],
        },
      },
      {
        id: 5,
        type: "checkbox",
        question: "What type of projects you want to watch",
        description: "test 123",
        data: {
          options: [
            {
              uuid: "c235cc77-4c2f-4571-bb9e-ed66696770d5",
              text: "REST API",
            },
            {
              uuid: "b8f0cea8-0ec3-446f-873f-abebda9ca4b0",
              text: "E-commerce",
            },
            { uuid: "4495820b-9680-41fd-8f12-c2fe7ece1884", text: "Inertia" },
            {
              uuid: "34f88c18-2978-4ee7-abac-e05effe1f8d7",
              text: "Livewire",
            },
          ],
        },
      },
      {
        id: 6,
        type: "text",
        question: "What's your favrorite Youtube channel",
        description: "",
        data: {},
      },
      {
        id: 7,
        type: "textarea",
        question: "What do you think about Legia",
        description: "write honest everything is annonymous",
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "Test survey 2",
    slug: "test-survey-2",
    status: true,
    image: "https://picsum.photos/id/237/400/400/",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    created_at: "2024-09-06 12:00:00",
    updated_at: "2024-09-06 12:00:00",
    expire_date: "2024-09-21 12:00:00",
    questions: [],
  },
  {
    id: 300,
    title: "Test survey 3",
    slug: "test-survey-3",
    status: true,
    image: "https://picsum.photos/id/238/400/400/",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    created_at: "2024-09-06 12:00:00",
    updated_at: "2024-09-06 12:00:00",
    expire_date: "2024-09-21 12:00:00",
    questions: [],
  },
  {
    id: 400,
    title: "Test survey 4",
    slug: "test-survey-4",
    status: true,
    image: "https://picsum.photos/id/239/400/400/",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    created_at: "2024-09-06 12:00:00",
    updated_at: "2024-09-06 12:00:00",
    expire_date: "2024-09-21 12:00:00",
    questions: [],
  },
];

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    surveys: [...tempSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  }),
  getters: {},
  actions: {
    getSurveyById(id) {
      return this.surveys.find((survey) => survey.id === parseInt(id));
    },
  },
});
