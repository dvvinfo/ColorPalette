<template>
  <div class="game-card flex flex-col">
    <!-- Game Image -->
    <div class="relative aspect-[4/3] overflow-hidden rounded-t-lg">
      <img
        :src="game.image"
        :alt="game.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex gap-1">
        <span v-if="game.isHot" class="bg-primary text-white text-xs px-2 py-0.5 rounded">HOT</span>
        <span v-if="game.isNew" class="bg-secondary text-white text-xs px-2 py-0.5 rounded"
          >NEW</span
        >
      </div>
    </div>

    <!-- Game Info -->
    <div class="p-2 bg-card-bg flex flex-col flex-grow rounded-b-lg">
      <h3 class="text-sm font-medium truncate">{{ game.title }}</h3>
      <p class="text-xs text-text-secondary">{{ game.provider }}</p>
    </div>

    <!-- Hover Overlay -->
    <router-link
      :to="game.link"
      class="absolute inset-0 bg-primary/80 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-lg"
    >
      <BaseButton variant="primary" size="sm" class="mb-2">Играть</BaseButton>
      <BaseButton variant="outline" size="sm">Демо</BaseButton>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '../types'
import BaseButton from './BaseButton.vue'

defineProps<{
  game: Game
}>()
</script>
