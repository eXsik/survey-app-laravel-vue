<template>
  <fieldset class="mb-4">
    <div>
      <legend class="text-base font-medium text-gray-900">
        {{ index + 1 }}. {{ question.question }}
      </legend>

      <p class="text-gray-500 text-sm">
        {{ question.description }}
      </p>
    </div>
    <div class="mt-3">
      <div v-if="question.type === 'select'">
        <select
          name=""
          id=""
          :value="modelValue"
          @change="emits('update:modelValue', $event.target.value)"
          class="mt-1 block w-full py-2 px-3 border border-transparent border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Please Select</option>
          <option
            value=""
            v-for="option in question.data.option"
            :value="option.text"
            :key="option.uuid"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-else-if="question.type === 'radio'" class="flex flex-col gap-2">
        <div
          v-for="(option, index) of question.data.options"
          class="flex items-center gap-2"
          :key="option.uuid"
        >
          <input
            type="radio"
            :name="'question' + question.id"
            :value="option.text"
            @change="emits('update:modelValue', $event.target.value)"
            :id="option.uuid"
            class="focus:ring-indigo-500 size-4 text-indigo-600 border-gray-300 cursor-pointer"
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'checkbox'">
        <div
          v-for="(option, index) of question.data.options"
          class="flex items-center gap-2"
          :key="option.uuid"
        >
          <input
            type="checkbox"
            :name="'question' + question.id"
            @change="onCheckboxChange"
            :id="option.uuid"
            v-model="model[option.text]"
            class="focus:ring-indigo-500 size-4 text-indigo-600 border-gray-300 cursor-pointer"
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'text'">
        <input
          type="text"
          :value="modelValue"
          @input="emits('update:modelValue', $event.target.value)"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div v-else-if="question.type === 'textarea'">
        <textarea
          name=""
          id=""
          :value="modelValue"
          @input="emits('update:modelValue', $event.target.value)"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div>
    </div>
  </fieldset>
  <hr class="mb-4" />
</template>

<script setup>
import { ref } from "vue";
const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
  modelValue: [String, Array],
});

const emits = defineEmits(["update:modelValue"]);
let model;

// Checkbox can have multiple answers
if (question.type === "checkbox") {
  model = ref({});
}

function onCheckboxChange(event) {
  const selectedOptions = [];
  model.value.forEach((text) => {
    if (model.value[text]) selectedOptions.push(text);
  });

  emits("update:modelValue", selectedOptions);
}
</script>

<style></style>
