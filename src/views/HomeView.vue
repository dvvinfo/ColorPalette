<template>
  <div class="min-h-screen bg-background w-full">
    <!-- Новостной баннер -->
    <NewsBanner />

    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4">
        <!-- Game Categories -->
        <GameGrid  class="mb-8" />
        <!-- <BackendGameGrid /> -->
        <!-- Новый слот на Vue -->
        <!-- <SlotMachinePure class="mb-8" /> -->
      </div>

      <RightSidebar />
    </div>

    <!-- Theme Switcher (floating) -->
    <ThemeSwitcher class="fixed bottom-4 right-4 z-50" />

    <AuthModal v-if="showAuth" @close="showAuth = false" />
    <RegisterModal v-if="showRegister" @close="showRegister = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NewsBanner from '../components/NewsBanner.vue'
import GameGrid from '../components/GameGrid.vue'
import ThemeSwitcher from '../components/ThemeSwitcher.vue'
import AuthModal from '../components/AuthModal.vue'
import RegisterModal from '../components/RegisterModal.vue'
import RightSidebar from '../components/RightSidebar.vue'
// import BackendGameGrid from '../components/BackendGameGrid.vue'
// import SlotMachinePure from './games/slot-vue/SlotMachinePure.vue'
const showAuth = ref(false)
const showRegister = ref(false)
</script>
