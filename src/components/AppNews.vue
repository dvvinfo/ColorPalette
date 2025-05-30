<template>
  <div
    class="flex flex-col gap-4 bg-gradient-to-r from-primary/80 to-primary bg-card-bg p-4 rounded-lg"
  >
    <div class="w-full h-full relative flex flex-col gap-4 justify-between">
      <div
        class="w-full max-h-[200px] relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/30 before:rounded-lg"
      >
        <img
          :src="image"
          :alt="$t('navigation.news')"
          class="w-full max-h-[200px] object-cover rounded-lg"
        />
        <div class="absolute top-6 left-6">
          <div class="flex flex-col gap-2">
            <div class="text-white font-bold">{{ date }}</div>
            <div class="text-white font-bold">{{ title }}</div>
          </div>
        </div>
        <div class="absolute bottom-6 left-6">
          <BaseButton v-if="link"
            ><RouterLink :to="link">{{ $t('news.readMore') }}</RouterLink></BaseButton
          >
        </div>
      </div>
    </div>

    <div class="">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps<{
  title: string
  description: string
  image: string
  date: string
  link?: string
}>()
</script>

<style scoped></style>
