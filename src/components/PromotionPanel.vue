<template>
  <div class="bg-card-bg rounded-lg overflow-hidden">
    <h2 class="px-4 py-3 bg-primary/20 text-white font-bold flex items-center gap-2">
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
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
      Какая то промоакция
    </h2>

    <div class="p-4">
      <div
        class="relative rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-primary/20 to-secondary/20"
      >
        <!-- Female Silhouette SVG -->
        <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-[200px]">
          <path
            d="M50,10 C60,10 70,20 70,35 C70,50 60,60 50,60 C40,60 30,50 30,35 C30,20 40,10 50,10 Z"
            fill="#e11d48"
          />
          <path
            d="M30,60 C30,60 20,65 20,75 C20,85 25,95 30,105 C35,115 40,125 40,135 C40,145 40,170 40,180 C40,190 35,190 35,190 L65,190 C65,190 60,190 60,180 C60,170 60,145 60,135 C60,125 65,115 70,105 C75,95 80,85 80,75 C80,65 70,60 70,60 C70,60 65,65 50,65 C35,65 30,60 30,60 Z"
            fill="#e11d48"
          />
        </svg>

        <div class="absolute inset-0 flex flex-col items-center justify-between py-4">
          <div>
            <p class="text-center text-white font-bold">Поиграй!</p>
          </div>
          <div class="w-full px-4">
            <p class="text-center text-white/80 text-sm mb-3">
              Получите 50000₽ на депозит и шанс выиграть главный приз
            </p>
            <BaseButton variant="primary" fullWidth>Начать игру</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>
