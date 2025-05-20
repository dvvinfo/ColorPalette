<template>
  <div class="bg-gradient-to-r from-primary/80 to-primary rounded-lg p-4 text-white relative overflow-hidden bg-card-bg ">
    <!-- Casino Chips SVG -->
    <div class="absolute -right-10 -bottom-10 opacity-30">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="6" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" stroke="white" stroke-width="2"/>
      </svg>
    </div>
    
    <div class="relative z-10">
      <h2 class="text-lg font-bold uppercase mb-1">ДЖЕКПОТ</h2>
      <div class="text-3xl font-bold animate-pulse-slow tracking-wide">
        ₽ {{ formatNumber(jackpotAmount) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const jackpotAmount = ref(5502982);
let interval: number | null = null;

// Format number with thousand separators
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Simulate jackpot counter increasing
onMounted(() => {
  interval = setInterval(() => {
    jackpotAmount.value += Math.floor(Math.random() * 10) + 1;
  }, 2000) as unknown as number;
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>
