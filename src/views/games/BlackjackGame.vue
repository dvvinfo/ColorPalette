<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-card-bg rounded-lg p-6">
      <div class="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 class="text-2xl font-bold">Блэкджек</h1>
      </div>
      <div class="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
        <iframe
          src="https://www.jacquelynmarcella.com/blackjack/"
          class="w-full h-full rounded-lg"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
</script>
