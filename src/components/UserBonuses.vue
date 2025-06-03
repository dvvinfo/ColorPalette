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

    <!-- Bonuses Content -->
    <div v-else>
      <!-- Active Bonuses -->
      <div v-if="activeBonuses.length > 0" class="mb-8">
        <h3 class="text-xl font-semibold text-text-primary mb-4">
          {{ $t('profile.activatedBonuses') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="bonus in activeBonuses" :key="bonus.id" class="bg-card-bg rounded-lg p-4">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-semibold text-text-primary">{{ bonus.title }}</h4>
                <p class="text-sm text-text-secondary">{{ bonus.description }}</p>
              </div>
              <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {{ $t('bonuses.activated') }}
              </span>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-text-secondary">{{ $t('bonuses.reward') }}:</span>
                <span class="text-text-primary font-medium">{{ bonus.reward }}</span>
              </div>

              <div v-if="bonus.wager_multiplier" class="flex justify-between">
                <span class="text-text-secondary">{{ $t('bonuses.wager') }}:</span>
                <span class="text-text-primary font-medium">x{{ bonus.wager_multiplier }}</span>
              </div>

              <div v-if="bonus.end_date" class="flex justify-between">
                <span class="text-text-secondary">{{ $t('bonuses.validUntil') }}:</span>
                <span class="text-text-primary font-medium">{{ formatDate(bonus.end_date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Available Bonuses -->
      <div v-if="availableBonuses.length > 0" class="mb-8">
        <h3 class="text-xl font-semibold text-text-primary mb-4">
          {{ $t('profile.availableBonuses') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="bonus in availableBonuses" :key="bonus.id" class="bg-card-bg rounded-lg p-4">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-semibold text-text-primary">{{ bonus.title }}</h4>
                <p class="text-sm text-text-secondary">{{ bonus.description }}</p>
              </div>
              <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {{ $t('profile.available') }}
              </span>
            </div>

            <div class="space-y-2 text-sm mb-4">
              <div class="flex justify-between">
                <span class="text-text-secondary">{{ $t('bonuses.reward') }}:</span>
                <span class="text-text-primary font-medium">{{ bonus.reward }}</span>
              </div>

              <div v-if="bonus.wager_multiplier" class="flex justify-between">
                <span class="text-text-secondary">{{ $t('bonuses.wager') }}:</span>
                <span class="text-text-primary font-medium">x{{ bonus.wager_multiplier }}</span>
              </div>
            </div>

            <!-- Promo Code Input for promo bonuses -->
            <div v-if="bonus.promo_code" class="space-y-3">
              <div class="flex gap-2">
                <BaseInput
                  v-model="promoInputs[bonus.id]"
                  type="text"
                  :placeholder="$t('bonus.promoCode')"
                />
                <BaseButton
                  size="sm"
                  @click="activateBonus(bonus)"
                  :disabled="!promoInputs[bonus.id]?.trim()"
                >
                  {{ $t('bonus.activate') }}
                </BaseButton>
              </div>
            </div>

            <!-- Regular activation button -->
            <BaseButton
              v-else-if="!bonus.promo_code"
              size="md"
              class="w-full"
              @click="activateBonus(bonus)"
            >
              {{ $t('bonus.activate') }}
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="activeBonuses.length === 0 && availableBonuses.length === 0"
        class="text-center py-12"
      >
        <div class="text-text-secondary mb-4">{{ $t('profile.noBonuses') }}</div>
        <BaseButton variant="outline" @click="$router.push('/bonuses')">
          {{ $t('profile.viewAllBonuses') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/composables/useToast'
import { bonusApi } from '@/services/api'
import type { Bonus } from '@/types'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'

const { t } = useI18n()
const { showSuccess, showError } = useToast()
const loading = ref(false)
const error = ref('')
const bonuses = ref<Bonus[]>([])
const promoInputs = reactive<Record<number, string>>({})

// Разделяем бонусы на активированные и доступные
// Предполагаем, что активированные бонусы имеют activated_count > 0
// или есть другое поле для определения активации пользователем
const activeBonuses = computed(() => bonuses.value.filter((bonus) => bonus.activated_count > 0))

const availableBonuses = computed(() =>
  bonuses.value.filter((bonus) => bonus.activated_count === 0 && bonus.is_active),
)

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

const loadBonuses = async () => {
  try {
    loading.value = true
    error.value = ''

    // Загружаем все бонусы
    const response = await bonusApi.getAll()
    bonuses.value = response.data
  } catch (err: unknown) {
    console.error('Error loading bonuses:', err)
    const errorMessage =
      err instanceof Error && 'response' in err && err.response
        ? (err.response as { data?: { error?: string } }).data?.error
        : undefined
    error.value = errorMessage || t('bonuses.loadError')
  } finally {
    loading.value = false
  }
}

const activateBonus = async (bonus: Bonus) => {
  try {
    if (bonus.promo_code) {
      // Активация промокода
      const promoCode = promoInputs[bonus.id]?.trim()
      if (!promoCode) return

      await bonusApi.activate({ promo_code: promoCode })
      // Обновляем счетчик активации
      bonus.activated_count += 1
      promoInputs[bonus.id] = ''
      showSuccess(
        t('bonuses.promoActivated'),
        t('bonuses.promoActivatedMessage', { code: promoCode }),
      )
    } else {
      // Активация обычного бонуса по ID
      await bonusApi.activateById(bonus.id)
      // Обновляем счетчик активации
      bonus.activated_count += 1
      showSuccess(
        t('bonuses.bonusActivated', { title: bonus.title }),
        t('bonuses.bonusActivatedMessage'),
      )
    }
  } catch (err: unknown) {
    console.error('Error activating bonus:', err)
    const errorMessage =
      err instanceof Error && 'response' in err && err.response
        ? (err.response as { data?: { error?: string } }).data?.error
        : undefined
    showError(t('bonuses.activationError'), errorMessage || t('bonuses.activationErrorMessage'))
  }
}

onMounted(() => {
  loadBonuses()
})
</script>

<style scoped></style>
