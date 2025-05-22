<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-card-bg rounded-lg p-6">
      <div class="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 class="text-2xl font-bold">{{ game?.name }}</h1>
      </div>

      <!-- Игровое поле -->
      <div class="aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-6">
        <div v-if="game" class="text-center">
          <div class="text-4xl mb-4">
            {{ lastResult ? (lastResult.result === 'win' ? '🎉' : '😢') : '🎲' }}
          </div>
          <div v-if="lastResult" class="text-xl">
            {{
              lastResult.result === 'win'
                ? `Выигрыш: ${lastResult.win_amount} ₽`
                : 'Попробуйте еще раз!'
            }}
          </div>
        </div>
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
        </div>
      </form>

      <!-- Информация об игре -->
      <div v-if="game" class="mt-8 grid grid-cols-2 gap-4 text-center">
        <div class="bg-black/20 p-4 rounded-lg">
          <div class="text-gray-400">RTP</div>
          <div class="text-xl font-bold">{{ game.rtp }}%</div>
        </div>
        <div class="bg-black/20 p-4 rounded-lg">
          <div class="text-gray-400">Шанс выигрыша</div>
          <div class="text-xl font-bold">{{ game.chance }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from '@/components/BackButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useGamesStore } from '@/stores/games'
import { useAuthStore } from '@/stores/auth'
import { games as mockGames } from '@/assets/mock/games'

const route = useRoute()
const gamesStore = useGamesStore()
const authStore = useAuthStore()
const bet = ref<string | number>('')
const presets = [50, 100, 500, 1000]

const game = computed(() => gamesStore.currentGame)
const lastResult = computed(() => gamesStore.lastPlayResult)

const createdGameId = ref<number | null>(null)

async function createAndFetchGame() {
  const gameId = Number(route.params.id)
  const mockGame = mockGames.find((g) => g.id === gameId)
  const name = mockGame ? mockGame.title : `game_${gameId}`
  try {
    const { data } = await gamesStore.createGame({
      name,
      chance: 0.1,
      rtp: 15,
    })
    createdGameId.value = data
    await gamesStore.fetchGameById(createdGameId.value)
  } catch (e) {
    console.error('Ошибка при создании игры:', e)
  }
}

onMounted(() => {
  createAndFetchGame()
})

watch(
  () => route.params.id,
  () => {
    createAndFetchGame()
  },
)

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
      await authStore.fetchUser()
      bet.value = ''
    } catch (error) {
      console.error('Ошибка при игре:', error)
    }
  }
}
</script>
