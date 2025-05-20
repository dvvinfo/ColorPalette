<template>
  <div>
    <button 
      @click="isOpen = !isOpen" 
      class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/80 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    </button>
    
    <!-- Theme Options -->
    <div 
      v-if="isOpen" 
      class="absolute bottom-16 right-4 bg-card-bg rounded-lg shadow-lg p-3 z-50 w-48"
    >
      <h3 class="text-sm font-bold mb-2 text-primary">Выберите тему</h3>
      
      <div class="space-y-2">
        <div 
          v-for="theme in themes" 
          :key="theme.value"
          @click="setTheme(theme.value)"
          class="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-white/10"
          :class="{'bg-white/10': currentTheme === theme.value}"
        >
          <div 
            class="w-6 h-6 rounded-full border-2 border-white/50"
            :style="{backgroundColor: theme.color}"
          ></div>
          <span class="text-sm">{{ theme.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '../composables/useTheme';
import type { ThemeOption } from '../types';

const { currentTheme, setTheme } = useTheme();
const isOpen = ref(false);

const themes = [
  { name: 'Красная', value: 'red' as ThemeOption, color: '#ff3040' },
  { name: 'Синяя', value: 'blue' as ThemeOption, color: '#3b82f6' },
  { name: 'Зеленая', value: 'green' as ThemeOption, color: '#10b981' },
  { name: 'Фиолетовая', value: 'purple' as ThemeOption, color: '#8b5cf6' },
  { name: 'По умолчанию', value: 'default' as ThemeOption, color: '#1e293b' },
];
</script>
