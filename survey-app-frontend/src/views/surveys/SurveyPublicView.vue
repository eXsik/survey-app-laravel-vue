<template>
  <div class="py-5 px-8">
    <div v-if="isLoading">
      <Loader />
    </div>
    <form
      v-else
      action=""
      class="container mx-auto"
      @submit.prevent="handleSubmitSurvey"
    >
      <div class="grid grid-cols-6 items-center">
        <div class="mr-4">
          <img :src="survey.image_url" alt="" />
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
          <p class="text-gray-500 text-sm" v-html="survey.description"></p>
        </div>
      </div>
      <div
        v-if="surveyFinished"
        class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto mt-10"
      >
        <div class="text-xl mb-3 font-semibold">
          Thank you for participating in this survey.
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-s font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit another response
        </button>
      </div>
      <div v-else>
        <hr class="my-3" />

        <div v-for="(question, index) of survey.questions" :key="question.id">
          <QuestionViewer
            v-model="answers[question.id]"
            :question="question"
            :index="index"
          />
        </div>

        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-s font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Loader from "../../components/ui/Loader.vue";
import QuestionViewer from "../../components/viewer/QuestionViewer.vue";
import { useSurveyStore } from "../../stores/surveys";
import { computed, onMounted, ref } from "vue";

const route = useRoute();
const surveyStore = useSurveyStore();
const { currentSurvey, getSurveyBySlug, saveSurveyAnswer } = surveyStore;

const isLoading = computed(() => currentSurvey.isLoading);
const survey = computed(() => currentSurvey.data);

const surveyFinished = ref(false);
const answers = ref({});

onMounted(() => {
  getSurveyBySlug(route.params.slug);
});

function handleSubmitSurvey() {
  console.log(JSON.stringify(answers.value, undefined, 2));
  saveSurveyAnswer({
    surveyId: survey.value.id,
    answers: answers.value,
  }).then((response) => {
    if (response.status === 201) {
      surveyFinished.value = true;
    }
  });
}

function submitAnotherResponse(params) {}
</script>
