<template>
  <div class="flex gap-2 mb-8">
    <button
      v-for="tab in tabs"
      :key="tab"
      :class="[
        'px-6 py-2 rounded-t-lg font-bold transition',
        modelValue === tab
          ? 'bg-background text-white'
          : 'bg-transparent text-gray-400 hover:text-primary',
      ]"
      @click="$emit('update:modelValue', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: string[]
  modelValue: string
}>()
</script>
