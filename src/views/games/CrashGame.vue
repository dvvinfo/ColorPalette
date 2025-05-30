<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-card-bg rounded-lg p-6">
      <div class="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 class="text-2xl font-bold">{{ t('navigation.crash') }}</h1>
      </div>

      <!-- Игровое поле -->
      <div class="aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-6">
        <iframe
          ref="gameFrame"
          src="https://crash-game-demo.vercel.app/"
          class="w-full h-full rounded-lg"
          frameborder="0"
        ></iframe>
      </div>

      <!-- Форма ставки (только для авторизованных пользователей) -->
      <form v-if="authStore.isAuthenticated" @submit.prevent="onPlay" class="max-w-md mx-auto">
        <div class="flex flex-col gap-4">
          <div class="relative">
            <BaseInput
              v-model="bet"
              type="text"
              :placeholder="t('games.enterBet')"
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
            {{ gamesStore.loading ? t('common.loading') : t('common.play') }}
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
                  ? `${t('games.youWon')}: ${lastResult.win_amount} ₽`
                  : t('games.tryAgain')
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
        <h3 class="text-xl font-bold mb-2" style="color: var(--primary)">
          {{ t('games.demoMode') }}
        </h3>
        <p class="mb-0 text-lg" style="color: var(--text-primary)">
          {{ t('games.loginToPlay') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import BackButton from '@/components/BackButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useGamesStore } from '@/stores/games'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const gamesStore = useGamesStore()
const authStore = useAuthStore()
const bet = ref<string | number>('')
const presets = [50, 100, 500, 1000]
const gameFrame = ref<HTMLIFrameElement | null>(null)
const createdGameId = ref<number | null>(null)

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
  if (!isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0) && createdGameId.value) {
    try {
      await gamesStore.playGame(createdGameId.value, num)
      await authStore.fetchUser() // Обновляем баланс

      // Запускаем анимацию в iframe
      if (gameFrame.value?.contentWindow) {
        gameFrame.value.contentWindow.postMessage({ type: 'START_CRASH' }, '*')
      }

      bet.value = '' // Очищаем поле ставки
    } catch (error) {
      console.error(t('games.debug.playError'), error)
    }
  }
}

// Инициализация игры
async function initializeGame() {
  gamesStore.lastPlayResult = null // Сбросить результат при входе в игру
  try {
    // Используем фиксированный ID для краш игры
    const gameId = gamesStore.getGameIdByRoute('crash')
    if (gameId) {
      createdGameId.value = gameId
      await gamesStore.fetchGameById(gameId)
    } else {
      console.error(t('games.debug.gameIdNotFound'))
    }
  } catch (e) {
    console.error(t('games.debug.initializeError'), e)
  }
}

onMounted(async () => {
  try {
    await initializeGame()
  } catch (e) {
    console.error(t('games.debug.createError'), e)
  }
})
</script>
