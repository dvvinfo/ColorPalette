import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game, GamePlayResponse } from '@/services/api'
import { gamesApi } from '@/services/api'
import { useBalanceStore } from './balance'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])
  const currentGame = ref<Game | null>(null)
  const lastPlayResult = ref<GamePlayResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
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
    fetchGames,
    fetchGameById,
    playGame,
    createGame,
    updateGameResult,
  }
})
