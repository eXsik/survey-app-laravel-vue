<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-center items-center flex-col">
        <h1
          class="text-2xl font-bold md:text-4xl md:leading-tight text-secondary"
        >
          The Surveys
        </h1>
        <p
          class="mt-2 text-lg text-gray-600 leading-8 max-w-[700px] text-center"
        >
          Browse and manage your personal surveys here, where you can gather
          insights and feedback on topics that matter to you.
        </p>
      </div>
    </template>
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <div class="flex justify-end">
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
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-10">
        <SurveyListItem
          v-for="(survey, index) in surveys"
          :key="survey.id"
          :survey="survey"
          class="opacity-0 animate-fade-in-down"
          :style="{ animationDelay: `${index * 0.15}s` }"
          @delete="deleteSurvey(survey.id)"
        />
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import { onMounted } from "vue";
import { useSurveyStore } from "../../stores/surveys";
import PageComponent from "../../components/PageComponent.vue";
import Loader from "../../components/ui/Loader.vue";
import { RouterLink, useRouter } from "vue-router";
import SurveyListItem from "../../components/SurveyListItem.vue";
import { storeToRefs } from "pinia";

const surveyStore = useSurveyStore();
const { error, fetchSurveys } = surveyStore;

onMounted(async () => {
  await fetchSurveys();
});

let { surveys, isLoading } = storeToRefs(surveyStore);
const router = useRouter();

async function deleteSurvey(surveyId) {
  if (confirm("Are you sure you want to delete this survey?")) {
    await surveyStore.deleteSurvey(surveyId).then(() => {
      router.push({
        name: "SurveysIndex",
      });
    });
    await fetchSurveys();
  }
}
</script>
