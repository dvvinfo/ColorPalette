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
          ref="slotIframe"
          :src="gameUrl"
          class="w-full h-full rounded-lg"
          frameborder="0"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          @load="onIframeLoad"
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
            :disabled="!isValid || gamesStore.loading || !isSlotReady"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BackButton from '@/components/BackButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useGamesStore } from '@/stores/games'
import { useAuthStore } from '@/stores/auth'

console.log('Компонент SlotMachine загружен')

const gamesStore = useGamesStore()
const authStore = useAuthStore()
const bet = ref<string | number>('')
const presets = [50, 100, 500, 1000]
const slotIframe = ref<HTMLIFrameElement | null>(null)
const createdGameId = ref<number | null>(null)
const isSlotReady = ref(false)

const gameUrl = computed(() => `${window.location.origin}/games/slot-machine/index.html`)

// Инициализация игры
async function initializeGame() {
  gamesStore.lastPlayResult = null // Сбросить результат при входе в игру
  try {
    // Создаём новую игру
    const { data } = await gamesStore.createGame({
      name: 'Слоты',
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
  if (
    !isNaN(num) &&
    num >= 1 &&
    num <= (authStore.user?.balance || 0) &&
    createdGameId.value &&
    isSlotReady.value
  ) {
    try {
      // Сначала делаем ставку
      await gamesStore.playGame(createdGameId.value, num)
      // Отправляем сообщение в iframe для запуска вращения
      if (slotIframe.value && slotIframe.value.contentWindow) {
        slotIframe.value.contentWindow.postMessage({ type: 'SPIN_SLOTS', bet: num }, '*')
      }
      bet.value = ''
    } catch (error) {
      console.error('Ошибка при игре:', error)
    }
  }
}

onMounted(async () => {
  window.addEventListener('message', handleSlotMessage)
  await initializeGame()
})

onUnmounted(() => {
  window.removeEventListener('message', handleSlotMessage)
})

function handleSlotMessage(event: MessageEvent) {
  console.log('Получено сообщение от слота:', event.data)
  if (event.data && event.data.type === 'SLOT_READY') {
    isSlotReady.value = true
    console.log('Слот готов к игре')
  } else if (event.data && event.data.type === 'SLOT_RESULT') {
    const { result, winAmount } = event.data
    if (createdGameId.value) {
      // Добавляем задержку для анимации слотов
      setTimeout(() => {
        gamesStore.updateGameResult({
          gameId: createdGameId.value as number,
          result: result === 'win' ? 'win' : 'lose',
          win_amount: winAmount || 0,
        })
        authStore.fetchUser()
      }, 2000)
    }
  }
}

const lastResult = computed(() => gamesStore.lastPlayResult)

const isValid = computed(() => {
  const num = Number(bet.value)
  return !isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0) && isSlotReady.value
})

function onBetInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  bet.value = val.replace(/[^0-9]/g, '')
}

function onIframeLoad() {
  console.log('Iframe загружен')
  // Отправляем сообщение в iframe для инициализации
  if (slotIframe.value && slotIframe.value.contentWindow) {
    slotIframe.value.contentWindow.postMessage({ type: 'INIT_SLOT' }, '*')
  }
}
</script>
