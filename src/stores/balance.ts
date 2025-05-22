import { defineStore } from 'pinia'
import { ref } from 'vue'
import { balanceApi } from '@/services/api'

export const useBalanceStore = defineStore('balance', () => {
  const balance = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBalance() {
    try {
      loading.value = true
      const { data } = await balanceApi.getBalance()
      balance.value = data.balance
      error.value = null
    } catch (err) {
      error.value = 'Не удалось загрузить баланс'
      console.error('Error fetching balance:', err)
    } finally {
      loading.value = false
    }
  }

  async function deposit(amount: number, method: string) {
    try {
      loading.value = true
      await balanceApi.deposit({ amount, method })
      await fetchBalance() // Обновляем баланс после депозита
      error.value = null
    } catch (err) {
      error.value = 'Ошибка при пополнении баланса'
      console.error('Error depositing:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function withdraw(amount: number, method: string) {
    try {
      loading.value = true
      await balanceApi.withdraw({ amount, method })
      await fetchBalance() // Обновляем баланс после вывода
      error.value = null
    } catch (err) {
      error.value = 'Ошибка при выводе средств'
      console.error('Error withdrawing:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    balance,
    loading,
    error,
    fetchBalance,
    deposit,
    withdraw,
  }
})
