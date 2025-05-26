<template>
  <div class="relative" >
    <!-- Champion Banner -->
    <div class="mb-6 rounded-lg overflow-hidden">
      <div
        class="flex relative flex-wrap md:flex-nowrap items-center before:content-[''] before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-secondary/80 before:to-primary/80 before:bg-black/30"
      >
        <div class="w-full p-6 absolute top-0 left-0">
          <h2 class="text-2xl font-bold mb-2">Стань чемпионом</h2>
          <p class="text-white/80 mb-4">поддержка чемпионатов</p>
          <router-link to="/in-development" class="btn-primary">Промоакция</router-link>
        </div>
        <div class="w-full flex justify-center">
          <img
            src="/images/banners/playstation-g5038a4164_1280.jpg"
            alt="Champion"
            class="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Game Categories Tabs -->
    <div class="flex items-center justify-between mb-4" id="game">
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
        {{ activeTab === 'all' ? 'Все игры' : activeTab === 'popular' ? 'Популярные' : 'Новинки' }}
      </h2>

      <div v-if="totalPages > 1" class="flex items-center gap-2">
        <button
          @click="prevPage"
          class="p-1 rounded-full hover:bg-white/10"
          :disabled="currentPage === 1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button @click="nextPage" class="p-1 rounded-full hover:bg-white/10" :disabled="isLastPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Game Category Tabs -->
    <div class="mb-4 overflow-x-auto">
      <div class="flex gap-2 min-w-max">
        <BaseButton @click="activeTab = 'all'" :variant="activeTab === 'all' ? 'primary' : 'ghost'">
          Все игры
        </BaseButton>
        <BaseButton
          @click="activeTab = 'popular'"
          :variant="activeTab === 'popular' ? 'primary' : 'ghost'"
        >
          Популярные
        </BaseButton>
        <BaseButton @click="activeTab = 'new'" :variant="activeTab === 'new' ? 'primary' : 'ghost'">
          Новинки
        </BaseButton>
      </div>
    </div>

    <!-- Games Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <GameCard v-for="game in displayedGames" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import GameCard from './GameCard.vue'
import BaseButton from './BaseButton.vue'
import { games, newGames } from '../assets/mock/games'

const activeTab = ref<'all' | 'popular' | 'new'>('all')
const currentPage = ref(1)
const gamesPerPage = 12

const filteredGames = computed(() => {
  if (activeTab.value === 'all') return games
  if (activeTab.value === 'popular') return games.filter((g) => g.isHot)
  if (activeTab.value === 'new') return newGames
  return games
})

const totalPages = computed(() => {
  return Math.ceil(filteredGames.value.length / gamesPerPage)
})

const isLastPage = computed(() => {
  return currentPage.value >= totalPages.value
})

const displayedGames = computed(() => {
  const start = (currentPage.value - 1) * gamesPerPage
  const end = start + gamesPerPage
  return filteredGames.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

watch(activeTab, () => {
  currentPage.value = 1
})
</script>
