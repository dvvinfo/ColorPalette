<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :required="required"
    v-model="modelValueProxy"
    class="base-input"
    :class="[inputClass, error ? 'border border-red-500 focus:ring-red-500' : '']"
    @input="$emit('update:modelValue', modelValueProxy)"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  placeholder: String,
  name: String,
  required: Boolean,
  inputClass: { type: String, default: '' },
  error: { type: Boolean, default: false },
})

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  @apply w-full rounded-lg px-3 py-2 bg-white/90 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary transition;
}
</style>
