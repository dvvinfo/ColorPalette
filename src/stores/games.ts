import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game, GamePlayResponse } from '@/services/api'
import { gamesApi } from '@/services/api'
import { useBalanceStore } from './balance'
import { GAME_CONFIGS, getGameConfigById, getGameConfigByRoute } from '@/config/games'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])
  const currentGame = ref<Game | null>(null)
  const lastPlayResult = ref<GamePlayResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const gamesInitialized = ref(false)
  const balanceStore = useBalanceStore()

  async function fetchGames() {
    try {
      loading.value = true
      const { data } = await gamesApi.getAll()
      games.value = data
      error.value = null
    } catch (err) {
      error.value = 'Не удалось загрузить список игр'
      console.error('Ошибка при загрузке игр:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchGameById(id: number) {
    try {
      loading.value = true
      const { data } = await gamesApi.getById(id)
      currentGame.value = data
      error.value = null
    } catch (err) {
      error.value = 'Не удалось загрузить игру'
      console.error('Ошибка при загрузке игры:', err)
    } finally {
      loading.value = false
    }
  }

  async function playGame(id: number, bet: number) {
    try {
      loading.value = true
      const { data } = await gamesApi.play(id, { bet })
      lastPlayResult.value = data
      // Обновляем баланс после игры
      await balanceStore.fetchBalance()
      error.value = null
      return data
    } catch (err) {
      error.value = 'Произошла ошибка при игре'
      console.error('Ошибка при игре:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createGame(data: { name: string; chance: number; rtp: number }) {
    return await gamesApi.create(data)
  }

  async function initializeGames() {
    // Проверяем, что игры еще не были инициализированы
    if (gamesInitialized.value) {
      return
    }

    try {
      loading.value = true
      // Проверяем, существуют ли игры на сервере, если нет - создаем их
      for (const config of GAME_CONFIGS) {
        try {
          await gamesApi.getById(config.id)
        } catch {
          // Если игра не найдена, создаем её с нужным ID
          await gamesApi.create({
            name: config.name,
            chance: config.chance,
            rtp: config.rtp,
          })
        }
      }
      gamesInitialized.value = true
    } catch (err) {
      console.error('Ошибка при инициализации игр:', err)
      error.value = 'Не удалось инициализировать игры'
    } finally {
      loading.value = false
    }
  }

  function getGameIdByRoute(route: string): number | null {
    const config = getGameConfigByRoute(route)
    return config ? config.id : null
  }

  function getGameInfo(id: number) {
    return getGameConfigById(id)
  }

  async function initializeGameForRoute(route: string, authStore: { isAuthenticated: boolean }) {
    // Проверяем, что пользователь авторизован
    if (!authStore.isAuthenticated) {
      console.log('Пользователь не авторизован, игра не инициализируется')
      return null
    }

    lastPlayResult.value = null // Сбросить результат при входе в игру

    try {
      const gameId = getGameIdByRoute(route)
      if (gameId) {
        await fetchGameById(gameId)
        return gameId
      } else {
        console.error(`Не найден ID игры для маршрута: ${route}`)
        return null
      }
    } catch (e) {
      console.error('Ошибка при инициализации игры:', e)
      return null
    }
  }

  function updateGameResult(data: { gameId: number; result: 'win' | 'lose'; win_amount: number }) {
    lastPlayResult.value = {
      result: data.result,
      win_amount: data.win_amount,
      new_balance: 0, // This will be updated by the auth store
    }
  }

  return {
    games,
    currentGame,
    lastPlayResult,
    loading,
    error,
    gamesInitialized,
    fetchGames,
    fetchGameById,
    playGame,
    createGame,
    initializeGames,
    getGameIdByRoute,
    getGameInfo,
    initializeGameForRoute,
    updateGameResult,
  }
})
