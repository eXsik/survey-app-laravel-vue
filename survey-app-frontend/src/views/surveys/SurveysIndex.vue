<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-center items-center flex-col">
        <h1
          class="text-2xl font-bold md:text-4xl md:leading-tight text-secondary"
        >
          The Surveys
        </h1>
        <p class="mt-2 text-lg text-gray-600 leading-8">
          Browse and manage your personal surveys here, where you can gather
          insights and feedback on topics that matter to you.
        </p>
      </div>
      <div class="mt-8 flex justify-end">
        <RouterLink
          :to="{ name: 'SurveyCreate' }"
          class="py-2 px-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-colors shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 -mt-1 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          Add new Survey
        </RouterLink>
      </div>
    </template>
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-10">
      <div v-if="isLoading">Loading...</div>
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <div
        v-for="survey in surveys"
        :key="survey.id"
        class="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5"
      >
        <div class="w-full relative">
          <img
            :src="survey.image"
            :alt="survey.title + ' image'"
            class="w-full h-60 object-cover rounded-2xl aspect-video"
          />
        </div>
        <h4 class="mt-8">{{ survey.created_at }}</h4>
        <h4 class="mt-2 mb-4 text-lg font-bold text-secondary">
          {{ survey.title }}
        </h4>
        <div
          v-html="survey.description"
          class="overflow-hidden flex-1 text-gray-500"
        ></div>
        <div class="flex justify-between items-center mt-4">
          <RouterLink
            :to="{ name: 'SurveyView', params: { id: survey.id } }"
            class="flex p-2 border border-indigo-500 text-sm rounded-md text-indigo-500 hover:text-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            <!-- Edit -->
          </RouterLink>
          <button
            v-if="survey.id"
            type="button"
            @click="() => deleteSurvey(survey)"
            class="p-2 flex items-center justify-center rounded-md border border-red-500 text-sm focus:ring-0 text-red-500 hover:text-red-600 transition-colors focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 inline-block"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useSurveyStore } from "../../stores/surveys";
import PageComponent from "../../components/PageComponent.vue";
import { RouterLink } from "vue-router";

const surveyStore = useSurveyStore();
const { isLoading, error } = surveyStore;

onMounted(async () => {
  await surveyStore.fetchSurveys();
});
const surveys = computed(() => surveyStore.surveys);

function deleteSurvey() {
  if (confirm("Are you sure you want to delete this survey?")) {
    // delete survey
  }
}
</script>
