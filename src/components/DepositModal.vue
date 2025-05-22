<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @mousedown.self="$emit('close')"
  >
    <div class="bg-card-bg rounded-2xl shadow-xl w-full max-w-3xl p-8 relative">
      <button
        class="absolute top-4 right-4 text-2xl text-white/60 hover:text-primary"
        @click="$emit('close')"
      >
        &times;
      </button>
      <BaseTabs v-model="activeTab" :tabs="tabs" />
      <div v-if="activeTab === 'Пополнение счета'">
        <form
          @submit.prevent="onSubmit"
          class="flex flex-col items-center gap-6 mt-8 max-w-lg mx-auto"
        >
          <div class="relative w-full">
            <BaseInput
              v-model="amount"
              type="text"
              placeholder="Введите сумму"
              class="pr-10"
              required
              @input="onAmountInput"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₽</span>
          </div>
          <div class="flex flex-wrap gap-4 w-full justify-center">
            <BaseButton
              v-for="preset in presets"
              :key="preset"
              type="button"
              variant="outline"
              class="px-8 py-3 font-bold text-lg"
              @click="amount = preset"
            >
              {{ preset.toLocaleString() }}
            </BaseButton>
          </div>
          <BaseButton
            type="submit"
            variant="primary"
            class="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-3 rounded-lg"
            :disabled="!isValid || balanceStore.loading"
          >
            {{ balanceStore.loading ? 'Загрузка...' : 'Оплатить' }}
          </BaseButton>
          <div v-if="successMessage" class="text-green-500 text-sm mt-2">
            {{ successMessage }}
          </div>
          <div v-if="balanceStore.error" class="text-red-500 text-sm mt-2">
            {{ balanceStore.error }}
          </div>
        </form>
      </div>
      <div v-else-if="activeTab === 'Получить выигрыш'">
        <form
          @submit.prevent="onWithdraw"
          class="flex flex-col items-center gap-6 mt-8 max-w-lg mx-auto"
        >
          <div class="relative w-full">
            <BaseInput
              v-model="withdrawAmount"
              type="text"
              placeholder="Введите сумму"
              class="pr-10"
              required
              @input="onWithdrawInput"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₽</span>
          </div>
          <div class="flex flex-wrap gap-4 w-full justify-center">
            <BaseButton
              v-for="preset in presets"
              :key="preset"
              type="button"
              variant="outline"
              class="px-8 py-3 font-bold text-lg"
              @click="withdrawAmount = preset"
            >
              {{ preset.toLocaleString() }}
            </BaseButton>
          </div>
          <BaseButton
            type="submit"
            variant="primary"
            class="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-3 rounded-lg"
            :disabled="!isWithdrawValid || balanceStore.loading"
          >
            {{ balanceStore.loading ? 'Загрузка...' : 'Вывести' }}
          </BaseButton>
          <div v-if="withdrawSuccessMessage" class="text-green-500 text-sm mt-2">
            {{ withdrawSuccessMessage }}
          </div>
          <div v-if="balanceStore.error" class="text-red-500 text-sm mt-2">
            {{ balanceStore.error }}
          </div>
        </form>
      </div>
      <div v-else-if="activeTab === 'История операций'">
        <div class="text-center text-white py-12">Здесь будет история операций</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTabs from '@/components/BaseTabs.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useBalanceStore } from '@/stores/balance'
import { useAuthStore } from '@/stores/auth'

const tabs = ['Пополнение счета', 'Получить выигрыш', 'История операций']
const activeTab = ref(tabs[0])
const amount = ref<string | number>('')
const withdrawAmount = ref<string | number>('')
const presets = [1000, 5000, 7500, 10000]
const balanceStore = useBalanceStore()
const authStore = useAuthStore()
const successMessage = ref<string | null>(null)
const withdrawSuccessMessage = ref<string | null>(null)

const isValid = computed(() => {
  const num = Number(amount.value)
  return !isNaN(num) && num >= 1
})

const isWithdrawValid = computed(() => {
  const num = Number(withdrawAmount.value)
  return !isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0)
})

function onAmountInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  amount.value = val.replace(/[^0-9]/g, '')
}

function onWithdrawInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  withdrawAmount.value = val.replace(/[^0-9]/g, '')
}

async function onSubmit() {
  const num = Number(amount.value)
  if (!isNaN(num) && num >= 1) {
    try {
      await balanceStore.deposit(num, 'default')
      await authStore.fetchUser()
      successMessage.value = `Успешно пополнено на сумму ${num.toLocaleString()} ₽`
      amount.value = ''
    } catch (error) {
      console.error('Ошибка при пополнении:', error)
    }
  }
}

async function onWithdraw() {
  const num = Number(withdrawAmount.value)
  if (!isNaN(num) && num >= 1 && num <= (authStore.user?.balance || 0)) {
    try {
      await balanceStore.withdraw(num, 'default')
      await authStore.fetchUser()
      withdrawSuccessMessage.value = `Успешно выведено ${num.toLocaleString()} ₽`
      withdrawAmount.value = ''
    } catch (error) {
      console.error('Ошибка при выводе:', error)
    }
  }
}
</script>
