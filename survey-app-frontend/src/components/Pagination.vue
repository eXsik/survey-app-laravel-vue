<template>
  <div class="flex justify-center mt-5">
    <nav
      class="relative z-0 infline-flex justify-center rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <RouterLink
        v-for="(link, index) of links"
        to="#"
        :key="index"
        :disabled="!link?.url"
        v-html="link?.label"
        aria-current="page"
        @click="getForPage(link)"
        class="relative inline-flex items-center px-4 py-2 border text-sm bg-white font-medium whitespace-nowrap"
        :class="[
          link.active
            ? 'z-10 border-indigo-500 text-indigo-500'
            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
        ]"
      ></RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useSurveyStore } from "../stores/surveys";
defineProps({
  links: {
    type: Object,
    required: true,
  },
});

const surveyStore = useSurveyStore();

function getForPage(link) {
  if (!link.url || link.active) {
    return;
  }

  surveyStore.fetchSurveys({ url: link.url });
}
</script>
