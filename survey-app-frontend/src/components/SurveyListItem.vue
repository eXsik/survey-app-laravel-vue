<template>
  <div
    class="group flex flex-col h-full border shadow border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5"
  >
    <div class="w-full relative">
      <img
        :src="survey.image_url"
        :alt="survey.title + ' image'"
        class="w-full h-60 object-cover rounded-2xl aspect-video"
      />
    </div>
    <!-- TODO: -->
    <!-- <h4 class="mt-8">{{ survey.created_at }}</h4> -->
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
        class="flex p-2 border border-indigo-500 text-sm rounded-md shadow-md text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center transition-colors"
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
      <div class="flex items-center">
        <RouterLink
          :to="`/view/survey/${survey.slug}`"
          target="_blank"
          class="p-2 flex items-center justify-center rounded-md border shadow-md border-indigo-300 text-sm text-indigo-500 focus:ring-0 bg-white hover:bg-indigo-100 transition-colors focus:outline-none mr-2"
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
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </RouterLink>

        <button
          v-if="survey.id"
          type="button"
          @click="emit('delete', survey)"
          class="p-2 flex items-center justify-center rounded-md border shadow-md border-red-500 text-sm text-white focus:ring-0 bg-red-500 hover:bg-red-600 transition-colors focus:outline-none"
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
</template>

<script setup>
import { RouterLink } from "vue-router";
const { survey } = defineProps({
  survey: Object,
});

const emit = defineEmits(["delete"]);
</script>

<style></style>
s
