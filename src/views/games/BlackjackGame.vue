<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-card-bg rounded-lg p-6">
      <div class="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 class="text-2xl font-bold">BlackJack</h1>
      </div>

      <!-- Игровое поле через iframe -->
      <div class="aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-6">
        <iframe
          ref="blackjackIframe"
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
              {{
                (lastResult.result as string) === 'win'
                  ? '🎉'
                  : (lastResult.result as string) === 'draw'
                    ? '🤝'
                    : '😢'
              }}
            </div>
            <div class="text-xl">
              {{
                (lastResult.result as string) === 'win'
                  ? `Выигрыш: ${lastResult.win_amount} ₽`
                  : (lastResult.result as string) === 'draw'
                    ? 'Ничья!'
                    : 'Попробуйте еще раз!'
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
const blackjackIframe = ref<HTMLIFrameElement | null>(null)
const createdGameId = ref<number | null>(null)

const gameUrl = computed(() => `${window.location.origin}/games/Black-Jack-Game-main/blackJ.html`)

// Инициализация игры
async function initializeGame() {
  gamesStore.lastPlayResult = null // Сбросить результат при входе в игру
  try {
    // Используем фиксированный ID для блэкджека
    const gameId = gamesStore.getGameIdByRoute('blackjack')
    if (gameId) {
      createdGameId.value = gameId
      await gamesStore.fetchGameById(gameId)
    } else {
      console.error('Не найден ID игры для блэкджека')
    }
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
      // Отправляем сообщение в iframe для запуска игры
      if (blackjackIframe.value && blackjackIframe.value.contentWindow) {
        blackjackIframe.value.contentWindow.postMessage({ type: 'PLAY_BLACKJACK', bet: num }, '*')
      }
      bet.value = ''
    } catch (error) {
      console.error('Ошибка при игре:', error)
    }
  }
}

onMounted(async () => {
  window.addEventListener('message', handleBlackjackResult)
  await initializeGame()
})

onUnmounted(() => {
  window.removeEventListener('message', handleBlackjackResult)
})

function handleBlackjackResult(event: MessageEvent) {
  if (event.data && event.data.type === 'BLACKJACK_RESULT') {
    const { winAmount } = event.data
    // Обновляем результат игры
    gamesStore.playGame(createdGameId.value!, winAmount)
    // Обновляем баланс пользователя
    authStore.fetchUser()
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
