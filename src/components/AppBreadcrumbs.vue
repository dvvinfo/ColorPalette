<template>
  <nav class="flex items-center text-sm mb-6" aria-label="Breadcrumb">
    <template v-for="(crumb, idx) in items" :key="idx">
      <router-link
        v-if="crumb.to"
        :to="crumb.to"
        class="text-primary hover:underline flex items-center"
      >
        {{ crumb.label }}
      </router-link>
      <span v-else class="text-gray-400 flex items-center">{{ crumb.label }}</span>
      <span v-if="idx < items.length - 1" class="mx-2 text-gray-400">/</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>
