<template>
  <div class="border-b border-white/10 mb-6">
    <nav class="flex space-x-8">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="$emit('update:activeTab', tab)"
        :class="[
          'py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
          activeTab === tab
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300',
        ]"
      >
        {{ tab }}
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tabs: string[]
  activeTab: string
}

defineProps<Props>()
defineEmits<{
  'update:activeTab': [tab: string]
}>()
</script>
