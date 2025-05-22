<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-card-bg rounded-lg p-6">
      <div class="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 class="text-2xl font-bold">Слоты</h1>
      </div>

      <!-- Игровое поле -->
      <div class="aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-6">
        <iframe
          ref="gameFrame"
          src="https://slots-game-demo.vercel.app/"
          class="w-full h-full rounded-lg"
          frameborder="0"
        ></iframe>
      </div>

      <!-- Форма ставки -->
      <form @submit.prevent="onPlay" class="max-w-md mx-auto">
        <div class="flex flex-col gap-4">
          <div class="relative">
            <BaseInput
              v-model="bet"
              type="text"
              placeholder="Введите ставку"
              class="pr-10"
              required
              @input="onBetInput"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₽</span>
          </div>

          <div class="flex flex-wrap gap-4 justify-center">
            <BaseButton
              v-for="preset in presets"
              :key="preset"
              type="button"
              variant="outline"
              class="px-8 py-3 font-bold text-lg"
              @click="bet = preset"
            >
              {{ preset.toLocaleString() }}
            </BaseButton>
          </div>

          <BaseButton
            type="submit"
            variant="primary"
            class="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-3 rounded-lg"
            :disabled="!isValid || gamesStore.loading"
          >
            {{ gamesStore.loading ? 'Загрузка...' : 'Играть' }}
          </BaseButton>

          <div v-if="gamesStore.error" class="text-red-500 text-sm text-center">
            {{ gamesStore.error }}
          </div>

          <div v-if="lastResult" class="text-center">
            <div class="text-2xl mb-2">
              {{ lastResult.result === 'win' ? '🎉' : '😢' }}
            </div>
            <div class="text-xl">
              {{
                lastResult.result === 'win'
                  ? `Выигрыш: ${lastResult.win_amount} ₽`
                  : 'Попробуйте еще раз!'
              }}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BackButton from '@/components/BackButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useGamesStore } from '@/stores/games'
import { useAuthStore } from '@/stores/auth'

const gamesStore = useGamesStore()
const authStore = useAuthStore()
const bet = ref<string | number>('')
const presets = [50, 100, 500, 1000]
const gameFrame = ref<HTMLIFrameElement | null>(null)

const lastResult = computed(() => gamesStore.lastPlayResult)

const isValid = computed(() => {
  const num = Number(bet.value)
  return !isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0)
})

function onBetInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  bet.value = val.replace(/[^0-9]/g, '')
}

async function onPlay() {
  const num = Number(bet.value)
  if (!isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0)) {
    try {
      // Используем ID 4 для слотов (из моковых данных)
      await gamesStore.playGame(4, num)
      await authStore.fetchUser() // Обновляем баланс

      // Запускаем анимацию в iframe
      if (gameFrame.value?.contentWindow) {
        gameFrame.value.contentWindow.postMessage({ type: 'SPIN_SLOTS' }, '*')
      }

      bet.value = '' // Очищаем поле ставки
    } catch (error) {
      console.error('Ошибка при игре:', error)
    }
  }
}

onMounted(async () => {
  // Загружаем информацию об игре
  await gamesStore.fetchGameById(4)
})
</script>
