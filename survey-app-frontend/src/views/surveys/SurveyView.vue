<template>
  <PageComponent>
    <template #header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-secondary">
          {{ survey.id ? survey.title : "Create a Survey" }}
        </h1>
        <button
          v-if="survey.id"
          type="button"
          @click="deleteSurvey(survey.id)"
          class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600 shadow-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          Delete
        </button>
      </div>
    </template>

    <form @submit.prevent="handleSaveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div
          class="px-4 py-5 space-y-6 sm:p-6 border border-gray-200 rounded-md"
        >
          <div>
            <label for="" class="block text-sm font-medium text-secondary">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="survey.image_url"
                :src="survey.image_url"
                :alt="survey.title"
                class="w-64 h-48 rounded-lg object-cover"
              />
              <span
                v-else
                class="flex items-center justify-center size-12 rounded-full overflow-hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-[80%] w-[80%] text-gray-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-secondary hover:bg-gray-50 cursor-pointer"
              >
                <label
                  for="image"
                  class="z-10 cursor-pointer w-full h-full py-2 px-3 inline-block"
                  >Change</label
                >
                <input
                  id="image"
                  type="file"
                  class="hidden"
                  @change="onImageChange"
                />
              </button>
            </div>
          </div>
          <div>
            <InputField
              label="Title"
              type="text"
              name="title"
              id="title"
              v-model="survey.title"
              autocomplete="survey_title"
            />
          </div>
          <div>
            <Textarea
              label="Description"
              id="description"
              name="description"
              rows="3"
              v-model="survey.description"
              autocomplete="survey_description"
              class=""
              placeholder="Describe your survey"
            ></Textarea>
          </div>
          <div>
            <InputField
              id="expire_date"
              name="expire_date"
              label="Expire date"
              type="date"
              v-model="survey.expire_date"
            />
          </div>
          <div>
            <CheckboxField
              name="status"
              id="status"
              v-model="survey.status"
              label="Active"
            />
          </div>
          <div class="py-5 bg-white space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-semibold">Questions</h3>
              <button
                type="button"
                class="flex items-center text-sm py-2 px-4 rounded-md font-normal text-secondary hover:bg-gray-100 border border-gray-300 shadow"
                @click="addQuestion()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Question
              </button>
            </div>
            <div
              v-if="!survey.questions.length"
              class="text-center text-gray-600"
            >
              You don't have any questions created for this survey.
            </div>
            <div
              v-else
              v-for="(question, index) in survey.questions"
              :key="question.id"
            >
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>

              {{ surveyId ? "Update" : "Create" }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import PageComponent from "../../components/PageComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useSurveyStore } from "../../stores/surveys";
import InputField from "../../components/ui/InputField.vue";
import Textarea from "../../components/ui/Textarea.vue";
import QuestionEditor from "../../components/editor/QuestionEditor.vue";
import CheckboxField from "../../components/ui/CheckboxField.vue";
import { v4 as uuidv4 } from "uuid";
import { onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();
const surveyStore = useSurveyStore();

const surveyId = route.params.id;

let survey = ref({
  title: "",
  slug: "",
  status: false,
  description: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

onMounted(async () => {
  if (surveyId) {
    survey.value = await surveyStore.getSurveyById(surveyId);
  }
});

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: "",
    data: {},
  };

  survey.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  let questionArr = survey.value.questions;

  survey.value.questions = questionArr.filter((que) => que.id !== question.id);
}

function questionChange(question) {
  let questionArr = survey.value.questions;

  survey.value.questions = questionArr.map((que) =>
    que.id === question.id ? question : que
  );
}

function handleSaveSurvey() {
  surveyStore.saveSurvey(survey.value).then(() => {
    router.push({
      name: "SurveysIndex",
    });
  });
}

function onImageChange(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // the field to send on backend and apply validations
    survey.value.image = reader.result;
    // the field to display here
    survey.value.image_url = reader.result;
  };

  reader.readAsDataURL(file);
}

async function deleteSurvey(surveyId) {
  if (confirm("Are you sure you want to delete this survey?")) {
    await surveyStore.deleteSurvey(surveyId).then(() => {
      router.push({
        name: "SurveysIndex",
      });
    });
  }
}
</script>
