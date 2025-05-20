<template>
  <div class="min-h-screen bg-background w-full">
    <Banner />

    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4">
        <!-- Game Categories -->
        <GameGrid />
      </div>

      <div class="w-full md:w-1/4">
        <!-- Jackpot Counter -->
        <JackpotCounter class="mb-8" />
        <BonusCard title="Бонус" amount="1000" :time="10000" class="mb-8" />
        <!-- Promotions Side Panel -->
        <PromotionPanel />
      </div>
    </div>

    <!-- Theme Switcher (floating) -->
    <ThemeSwitcher class="fixed bottom-4 right-4 z-50" />

    <AuthModal v-if="showAuth" @close="showAuth = false" />
    <RegisterModal v-if="showRegister" @close="showRegister = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Banner from '../components/AppBanner.vue'
import GameGrid from '../components/GameGrid.vue'
import PromotionPanel from '../components/PromotionPanel.vue'
import JackpotCounter from '../components/JackpotCounter.vue'
import ThemeSwitcher from '../components/ThemeSwitcher.vue'
import AuthModal from '../components/AuthModal.vue'
import RegisterModal from '../components/RegisterModal.vue'
import BonusCard from '../components/BonusCard.vue'
const showAuth = ref(false)
const showRegister = ref(false)
</script>
