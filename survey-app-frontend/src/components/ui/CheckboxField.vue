<!-- InputField.vue -->
<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        type="checkbox"
        :name="name"
        :value="modelValue"
        :required="required"
        @input="$emit('update:modelValue', $event.target.checked)"
        class="focus:ring-indigo-500 size-4 text-indigo-600 border-gray-300 rounded"
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="name" class="block text-sm font-medium text-secondary">
        {{ label }}
      </label>
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
  modelValue: {
    type: [Boolean, String],
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
