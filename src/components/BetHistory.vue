<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="text-text-secondary">{{ $t('common.loading') }}</div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
    >
      {{ error }}
    </div>

    <!-- History Content -->
    <div v-else>
      <!-- Summary Stats -->
      <div
        v-if="historyData && historyData.data.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <div class="bg-card-bg rounded-lg p-4 ">
          <div class="text-text-secondary text-sm">{{ $t('profile.totalBets') }}</div>
          <div class="text-text-primary font-bold text-xl">{{ totalBets }}</div>
        </div>
        <div class="bg-card-bg rounded-lg p-4">
          <div class="text-text-secondary text-sm">{{ $t('profile.totalWins') }}</div>
          <div class="text-green-500 font-bold text-xl">{{ formatCurrency(totalWins) }}</div>
        </div>
        <div class="bg-card-bg rounded-lg p-4">
          <div class="text-text-secondary text-sm">{{ $t('profile.winRate') }}</div>
          <div class="text-text-primary font-bold text-xl">{{ winRate }}%</div>
        </div>
      </div>

      <!-- History Table -->
      <div
        v-if="historyData && historyData.data.length > 0"
        class="bg-card-bg rounded-lg  overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-background">
              <tr>
                <th class="px-4 py-3 text-left text-text-secondary font-medium">
                  {{ $t('profile.game') }}
                </th>
                <th class="px-4 py-3 text-left text-text-secondary font-medium">
                  {{ $t('profile.bet') }}
                </th>
                <th class="px-4 py-3 text-left text-text-secondary font-medium">
                  {{ $t('profile.result') }}
                </th>
                <th class="px-4 py-3 text-left text-text-secondary font-medium">
                  {{ $t('profile.winAmount') }}
                </th>
                <th class="px-4 py-3 text-left text-text-secondary font-medium">
                  {{ $t('profile.date') }}
                </th>
              </tr>
            </thead>
            <tbody class="">
              <tr v-for="bet in historyData.data" :key="bet.id" class="hover:bg-background/50">
                <td class="px-4 py-3">
                  <div class="font-medium text-text-primary">{{ bet.game.name }}</div>
                </td>
                <td class="px-4 py-3">
                  <div class="text-text-primary">{{ formatCurrency(bet.bet) }}</div>
                </td>
                <td class="px-4 py-3">
                  <span
                    :class="{
                      'bg-green-100 text-green-800': bet.result === 'win',
                      'bg-red-100 text-red-800': bet.result === 'lose',
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ bet.result === 'win' ? $t('games.win') : $t('games.lose') }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div
                    :class="{
                      'text-green-500': bet.win_ammount > 0,
                      'text-red-500': bet.win_ammount < 0,
                      'text-text-secondary': bet.win_ammount === 0,
                    }"
                    class="font-medium"
                  >
                    {{ bet.win_ammount > 0 ? '+' : '' }}{{ formatCurrency(bet.win_ammount) }}
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div class="text-text-secondary text-sm">{{ formatDate(bet.created_at) }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="historyData.pages > 1"
          class="px-4 py-3 bg-background border-t border-border flex items-center justify-between"
        >
          <div class="text-text-secondary text-sm">
            {{ $t('profile.page') }} {{ currentPage }} {{ $t('profile.of') }}
            {{ historyData.pages }}
          </div>
          <div class="flex gap-2">
            <BaseButton
              size="sm"
              variant="outline"
              :disabled="currentPage <= 1"
              @click="loadPage(currentPage - 1)"
            >
              {{ $t('common.back') }}
            </BaseButton>
            <BaseButton
              size="sm"
              variant="outline"
              :disabled="currentPage >= historyData.pages"
              @click="loadPage(currentPage + 1)"
            >
              {{ $t('common.next') }}
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-text-secondary mb-4">{{ $t('profile.noBetHistory') }}</div>
        <BaseButton variant="outline" @click="$router.push('/games')">
          {{ $t('profile.startPlaying') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { userApi } from '@/services/api'
import type { BetHistoryResponse } from '@/types'
import BaseButton from './BaseButton.vue'

const { t } = useI18n()
const loading = ref(false)
const error = ref('')
const historyData = ref<BetHistoryResponse | null>(null)
const currentPage = ref(1)

// Computed статистика
const totalBets = computed(() => {
  if (!historyData.value?.data) return 0
  return historyData.value.data.length
})

const totalWins = computed(() => {
  if (!historyData.value?.data) return 0
  return historyData.value.data
    .filter((bet) => bet.result === 'win')
    .reduce((sum, bet) => sum + bet.win_ammount, 0)
})

const winRate = computed(() => {
  if (!historyData.value?.data || historyData.value.data.length === 0) return 0
  const wins = historyData.value.data.filter((bet) => bet.result === 'win').length
  return Math.round((wins / historyData.value.data.length) * 100)
})

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const loadBetHistory = async (page: number = 1) => {
  try {
    loading.value = true
    error.value = ''
    const response = await userApi.getBetHistory(page)
    historyData.value = response.data
    currentPage.value = page
  } catch (err: unknown) {
    console.error('Error loading bet history:', err)
    const errorMessage =
      err instanceof Error && 'response' in err && err.response
        ? (err.response as { data?: { error?: string } }).data?.error
        : undefined
    error.value = errorMessage || t('profile.loadHistoryError')
  } finally {
    loading.value = false
  }
}

const loadPage = (page: number) => {
  if (page >= 1 && historyData.value && page <= historyData.value.pages) {
    loadBetHistory(page)
  }
}

onMounted(() => {
  loadBetHistory()
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
