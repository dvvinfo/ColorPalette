<template>
  <div class="relative">
    <!-- Game Categories Tabs -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        Популярные игры
      </h2>
    </div>

    <!-- Loading State -->
    <div v-if="gamesStore.loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-white/60">Загрузка игр...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="gamesStore.error" class="text-center py-8">
      <p class="text-red-500">{{ gamesStore.error }}</p>
      <p class="text-white/60 mt-2">Проверьте подключение к интернету и попробуйте снова</p>
      <BaseButton variant="primary" class="mt-4" @click="gamesStore.fetchGames">
        Попробовать снова
      </BaseButton>
    </div>

    <!-- Empty State -->
    <div v-else-if="!gamesStore.games || gamesStore.games.length === 0" class="text-center py-8">
      <p class="text-white/60">Игры не найдены</p>
    </div>

    <!-- Games Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="game in gamesStore.games"
        :key="game.id"
        class="game-card flex flex-col relative group"
      >
        <!-- Game Image -->
        <div class="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            :src="`/images/games/${game.id}.png`"
            :alt="game.name"
            class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
          />
        </div>

        <!-- Game Info -->
        <div class="p-2 bg-card-bg flex flex-col flex-grow rounded-b-lg">
          <h3 class="text-sm font-medium truncate">{{ game.name }}</h3>
          <div class="flex justify-between text-xs text-text-secondary">
            <!-- <span>RTP: {{ game.rtp }}%</span>
            <span>Шанс: {{ game.chance }}%</span> -->
          </div>
        </div>

        <!-- Hover Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-[1]"
        ></div>

        <router-link
          :to="`/games/${game.id}`"
          class="absolute inset-0 flex flex-col items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
        >
          <BaseButton variant="primary" size="sm" class="mb-2">Играть</BaseButton>
          <BaseButton variant="outline" size="sm">Демо</BaseButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGamesStore } from '@/stores/games'
import BaseButton from './BaseButton.vue'

const gamesStore = useGamesStore()

onMounted(() => {
  gamesStore.fetchGames()
})
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
