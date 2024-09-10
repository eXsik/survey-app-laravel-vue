<!-- InputField.vue -->
<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-secondary"
    >
      {{ label }}
    </label>
    <div class="mt-2">
      <input
        :id="id"
        :name="name"
        :type="type"
        :value="modelValue"
        :required="required"
        :autocomplete="autocomplete"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        @input="$emit('update:modelValue', $event.target.value)"
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
  },
  type: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Boolean, null],
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
  },
});

defineEmits(["update:modelValue"]);
</script>
