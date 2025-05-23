<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-card-bg rounded-lg p-6">
      <div class="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 class="text-2xl font-bold">Рулетка</h1>
      </div>

      <!-- Игровое поле через iframe -->
      <div class="aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-6">
        <iframe
          ref="rouletteIframe"
          :src="gameUrl"
          width="100%"
          height="100%"
          frameborder="0"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        ></iframe>
      </div>

      <!-- Форма ставки (только для авторизованных пользователей) -->
      <form v-if="authStore.isAuthenticated" @submit.prevent="onPlay" class="max-w-md mx-auto">
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
            class="text-white text-lg font-bold py-3 rounded-lg"
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
                  ? `Поздравляем! Вы выиграли ${lastResult.win_amount} ₽`
                  : 'К сожалению, вы проиграли. Попробуйте еще раз!'
              }}
            </div>
          </div>
        </div>
      </form>

      <!-- Сообщение для неавторизованных пользователей -->
      <div
        v-else
        class="max-w-md mx-auto text-center p-6 rounded-lg shadow"
        style="background: var(--card-bg)"
      >
        <h3 class="text-xl font-bold mb-2" style="color: var(--primary)">Демо-режим</h3>
        <p class="mb-0 text-lg" style="color: var(--text-primary)">
          Чтобы играть, нужно авторизоваться или зарегистрироваться
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BackButton from '@/components/BackButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useGamesStore } from '@/stores/games'
import { useAuthStore } from '@/stores/auth'

const gamesStore = useGamesStore()
const authStore = useAuthStore()
const bet = ref<string | number>('')
const presets = [50, 100, 500, 1000]
const rouletteIframe = ref<HTMLIFrameElement | null>(null)
const createdGameId = ref<number | null>(null)

const gameUrl = computed(
  () => `${window.location.origin}/games/javascript-roulette-main/index.html`,
)

// Инициализация игры
async function initializeGame() {
  gamesStore.lastPlayResult = null // Сбросить результат при входе в игру
  try {
    // Создаём новую игру
    const { data } = await gamesStore.createGame({
      name: 'Рулетка',
      chance: 0.1,
      rtp: 15,
    })
    createdGameId.value = data
    await gamesStore.fetchGameById(data)
  } catch (e) {
    console.error('Ошибка при инициализации игры:', e)
  }
}

async function onPlay() {
  const num = Number(bet.value)
  if (!isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0) && createdGameId.value) {
    try {
      // Сначала делаем ставку
      await gamesStore.playGame(createdGameId.value, num)
      // Отправляем сообщение в iframe для запуска вращения
      if (rouletteIframe.value && rouletteIframe.value.contentWindow) {
        rouletteIframe.value.contentWindow.postMessage({ type: 'SPIN_ROULETTE', bet: num }, '*')
      }
      bet.value = ''
    } catch (error) {
      console.error('Ошибка при игре:', error)
    }
  }
}

onMounted(async () => {
  window.addEventListener('message', handleRouletteResult)
  await initializeGame()
})

onUnmounted(() => {
  window.removeEventListener('message', handleRouletteResult)
})

function handleRouletteResult(event: MessageEvent) {
  if (event.data && event.data.type === 'ROULETTE_RESULT') {
    const { result, winAmount, selectedNumber, winningNumber } = event.data

    if (createdGameId.value) {
      // Добавляем задержку для анимации рулетки (2 секунды)
      setTimeout(() => {
        gamesStore.updateGameResult({
          gameId: createdGameId.value as number,
          result: result === 'win' ? 'win' : 'lose',
          win_amount: winAmount || 0,
        })
        authStore.fetchUser()
        console.log(
          `Результат рулетки: ${result}, Выбранное число: ${selectedNumber}, Выпавшее число: ${winningNumber}, Выигрыш: ${winAmount}`,
        )
      }, 4000)
    } else {
      console.error('ID игры не найден при обработке результата')
    }
  }
}

const lastResult = computed(() => gamesStore.lastPlayResult)

const isValid = computed(() => {
  const num = Number(bet.value)
  return !isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0)
})

function onBetInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  bet.value = val.replace(/[^0-9]/g, '')
}
</script>

<style>
/* Можно добавить стили для компонента */
</style>
