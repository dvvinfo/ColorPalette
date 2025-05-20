<template>
  <div class="game-card flex flex-col relative group">
    <!-- Game Image -->
    <div class="relative aspect-[4/3] overflow-hidden rounded-t-lg">
      <img
        :src="game.image"
        :alt="game.title"
        class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
      />

      <!-- Badge -->
      <div class="absolute top-2 left-2 z-10">
        <span v-if="game.isHot" class="bg-primary text-white text-xs px-2 py-0.5 rounded">HOT</span>
        <span v-else-if="game.isNew" class="bg-secondary text-white text-xs px-2 py-0.5 rounded"
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
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-[1]"
    ></div>

    <router-link
      :to="game.link"
      class="absolute inset-0 flex flex-col items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
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

<style scoped>
.game-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.5rem;
  z-index: 1;
}

.game-card:hover::before {
  opacity: 1;
}

.game-card img {
  filter: brightness(1);
  transition:
    filter 0.3s ease,
    transform 0.3s ease;
}

.game-card:hover img {
  filter: brightness(0.8);
}
</style>
