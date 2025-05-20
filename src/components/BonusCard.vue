<template>
  <div class="bg-card-bg rounded-2xl p-6 shadow-lg w-full  text-center">
    <div class="text-lg font-bold text-white mb-2">{{ title }}</div>
    <div class="text-3xl font-extrabold text-primary mb-4">{{ amount }}₽</div>
    <div v-if="timeLeft > 0" class="text-white text-sm mb-4">
      До завершения: <span class="font-mono">{{ formattedTime }}</span>
    </div>
    <BaseButton variant="primary" class="w-full">Активировать</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import BaseButton from './BaseButton.vue'

const props = defineProps<{ title: string; amount: number | string; time?: number }>()
const timeLeft = ref(props.time ?? 0)
let timer: number | undefined

const formattedTime = computed(() => {
  const h = Math.floor(timeLeft.value / 3600)
    .toString()
    .padStart(2, '0')
  const m = Math.floor((timeLeft.value % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = (timeLeft.value % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
})

onMounted(() => {
  if (timeLeft.value > 0) {
    timer = setInterval(() => {
      if (timeLeft.value > 0) timeLeft.value--
    }, 1000)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// Если проп time меняется динамически
watch(
  () => props.time,
  (newVal) => {
    timeLeft.value = newVal ?? 0
  },
)
</script>
