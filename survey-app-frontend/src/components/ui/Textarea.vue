<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-secondary"
    >
      {{ label }}
    </label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      :rows="rows"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  rows: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  autocomplete: {
    type: String,
  },
});
defineEmits(["update:modelValue"]);
</script>
