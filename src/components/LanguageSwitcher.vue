<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
    >
      <span class="text-sm font-medium text-white">
        {{ localeStore.currentLocale === 'ru' ? 'RU' : 'EN' }}
      </span>
      <svg
        :class="{ 'rotate-180': isOpen }"
        class="w-4 h-4 text-white transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-40 bg-card-bg border border-white/10 rounded-lg shadow-lg z-50"
      >
        <div class="py-2">
          <button
            v-for="locale in localeStore.supportedLocales"
            :key="locale.code"
            @click="selectLocale(locale.code)"
            class="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200"
            :class="{ 'bg-white/5': locale.code === localeStore.currentLocale }"
          >
            <span class="text-lg">{{ locale.flag }}</span>
            <span class="text-white text-sm">{{ locale.name }}</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectLocale(code: string) {
  localeStore.setLocale(code)
  isOpen.value = false
}

function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
