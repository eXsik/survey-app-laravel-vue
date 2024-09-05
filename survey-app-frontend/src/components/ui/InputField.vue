<!-- InputField.vue -->
<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium leading-6 dark:text-white text-gray-900"
    >
      {{ label }}
    </label>
    <div class="mt-2">
      <input
        :id="id"
        :name="name"
        :type="type"
        :required="required"
        class="block w-full rounded-md border-0 py-1.5 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>
