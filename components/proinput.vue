<template>
  <div class="relative w-full">
    <UIcon v-if="icon" :name="icon" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <UInput
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full pl-10 pr-3 py-2 border rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
    />
  </div>
</template>

<script setup>
import { UInput } from '#components';
defineProps({
  modelValue: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  icon: String
})
defineEmits(['update:modelValue'])
</script>
