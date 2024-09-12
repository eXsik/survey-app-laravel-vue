<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-secondary">Dashboard</h1>
      </div>
    </template>

    <div v-if="isLoading">
      <Loader />
    </div>

    <div v-else class="grid md;grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
      <div
        class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down"
        style="animation-delay: 0.1s"
      >
        <h3 class="text-2xl font-semibold">Total Surveys</h3>
        <div
          class="text-8xl font-semibold flex-1 flex items-center justify-center"
        >
          {{ data.totalSurveys }}
        </div>
      </div>

      <div
        class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down"
        style="animation-delay: 0.2s"
      >
        <h3 class="text-2xl font-semibold">Total Answers</h3>
        <div
          class="text-8xl font-semibold flex-1 flex items-center justify-center"
        >
          {{ data.totalAnswers }}
        </div>
      </div>

      <div
        class="row-span-2 order-3 bg-white shadow-md p-4 lg:order-1 animate-fade-in-down"
      >
        <h3 class="text-2xl font-semibold">Latest Survey</h3>
        <img
          :src="data.latestSurvey.image_url"
          :alt="data.latestSurvey.name + ' image'"
          class="w-full my-4 mx-auto"
        />
        <h3 class="text-3xl font-bold mb-3">{{ data.latestSurvey.title }}</h3>
        <div class="flex justify-between text-sm mb-1">
          <div>Upload Date:</div>
          <div>{{ data.latestSurvey.created_at }}</div>
        </div>
        <div class="flex justify-between text-sm mb-3">
          <div>Answers:</div>
          <div>{{ data.totalAnswers }}</div>
        </div>
        <div class="flex justify-between">
          <RouterLink
            :to="{ name: 'SurveyView', params: { id: data.latestSurvey.id } }"
            class="flex p-2 border border-indigo-500 text-sm rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center transition-colors gap-2 hover:shadow-md"
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
            Edit
          </RouterLink>

          <button
            class="flex py-2 px-4 border border-indigo-600 hover:border-indigo-700 hover:shadow-md text-sm rounded-md text-indigo-600 hover:text-indigo-700 transition focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center gap-2"
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
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            View Answers
          </button>
        </div>
      </div>
      <div
        class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3 animate-fade-in-down"
        style="animation-delay: 0.3s"
      >
        <div class="flex justify-between items-center mb-3 px-2">
          <h3 class="text-2xl font-semibold">Latest answers</h3>
          <button class="text-sm text-blue-500 hover:decoration-blue-500">
            View all
          </button>
        </div>
        <a
          href="#"
          v-for="answer of data.latestAnswers"
          :key="answer.id"
          class="block p-2 hover:bg-gray-100/90"
        >
          <div class="font-semibold">{{ answer.survey.title }}</div>
          <small
            >Answer made at: <i class="font-semibold">{{ answer.end_date }}</i>
          </small>
        </a>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import { useDashboardStore } from "../stores/dashboard";
import { computed, onMounted } from "vue";
import Loader from "../components/ui/Loader.vue";

const dashboardStore = useDashboardStore();
const { dashboard, getDashboardData } = dashboardStore;

const isLoading = computed(() => dashboard.isLoading);
const data = computed(() => dashboard.data);

onMounted(() => getDashboardData());
</script>
