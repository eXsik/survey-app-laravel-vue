<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">{{ index + 1 }}. {{ model.question }}</h3>

    <div class="flex items-center gap-3 my-6">
      <button
        type="button"
        class="flex items-center text-sm py-1.5 px-4 rounded-md font-normal text-white bg-secondary hover:bg-tertiary border border-gray-300 shadow"
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
        Add
      </button>

      <button
        type="button"
        class="flex items-center text-sm py-1.5 px-4 rounded-md font-normal text-white bg-red-500 hover:bg-red-500 border shadow transition-colors"
        @click="deleteQuestion()"
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
  </div>

  <div class="grid gap-3 grid-cols-12">
    <div class="col-span-9 mt-3">
      <InputField
        label="Question text"
        type="text"
        :name="'question_text_' + model.data"
        :id="'question_text_' + model.data"
        v-model="model.question"
        @change="dataChange"
      />
    </div>
    <div class="col-span-3 mt-3">
      <label
        for="question_type"
        class="block text-sm font-medium text-secondary"
        >Question type</label
      >
      <select
        name="question_type"
        id="question_type"
        v-model="model.type"
        @change="typeChange"
        class="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm capitalize"
      >
        <option
          v-for="type in questionTypes"
          :key="type"
          :value="type"
          class="capitalize"
        >
          <span class="capitalize">{{ type }}</span>
        </option>
      </select>
    </div>

    <div class="mt-3 col-span-9">
      <Textarea
        label="Description"
        :id="'question_description_' + model.id"
        :name="'question_description_' + model.id"
        v-model="model.description"
        @change="dataChange"
        rows="3"
        placeholder="Describe the question..."
      ></Textarea>
    </div>
  </div>

  <div>
    <div v-if="shouldHaveOptions()" class="mt-4">
      <div class="flex items-center justify-between my-4">
        <h4 class="text-sm font-semibold mb-1">Options</h4>
        <button
          type="button"
          @click="addOption()"
          class="flex items-center text-xs py-1.5 px-2 rounded shadow text-secondary hover:bg-gray-100 transition-colors border border-transparent"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div
        v-if="!model.data?.options?.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </div>
      <div
        v-for="(option, index) in model.data.options"
        :key="option.uuid"
        class="flex items-center my-3"
      >
        <span class="w-6 texy-sm">{{ index + 1 }}.</span>
        <input
          type="text"
          v-model="option.text"
          @change="dataChange"
          class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500 mr-4"
        />
        <button
          type="button"
          @click="removeOption(option)"
          class="flex items-center text-xs py-1.5 px-2 rounded shadow text-red-400 hover:bg-red-100 transition-colors border border-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 text-red-500"
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
  <hr class="my-6" />
</template>

<script setup>
import { capitalize, computed, ref } from "vue";
import InputField from "../ui/InputField.vue";
import Textarea from "../ui/Textarea.vue";
import { useSurveyStore } from "../../stores/surveys";
const props = defineProps({
  question: {},
  index: Number,
});
const model = ref(JSON.parse(JSON.stringify(props.question)));
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);
const surveyStore = useSurveyStore();

const questionTypes = computed(() => surveyStore.questionTypes);

function shouldHaveOptions() {
  return ["select", "radio", "checkbox"].includes(model.value.type);
}

function getOptions() {
  return model.value.data.options;
}

function setOptions(options) {
  model.value.data.options = options;
}

function addOption() {
  setOptions([...getOptions(), { uuid: uuidv4(), text: "" }]);
  dataChange();
}

function removeOption(option) {
  setOptions(getOptions().filter((opt) => opt !== option));
  dataChange();
}

function typeChange() {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}

// Emit the data change
function dataChange() {
  const data = model.value;
  if (!shouldHaveOptions) {
    delete data.data.options;
  }
}
</script>

<style></style>
