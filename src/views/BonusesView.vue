<template>
  <div class="min-h-screen bg-background w-full">
    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4">
        <!-- Back Button -->
        <BackButton class="mb-6" />

        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-text-primary mb-4">{{ $t('bonuses.title') }}</h1>
          <p class="text-text-secondary text-lg">
            {{ $t('bonuses.description') }}
          </p>
        </div>

        <!-- Bonus Categories -->
        <div class="mb-8">
          <div class="flex flex-wrap gap-2">
            <BaseButton
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :variant="selectedCategory === category.id ? 'primary' : 'outline'"
              size="sm"
            >
              {{ $t(category.nameKey) }}
            </BaseButton>
          </div>
        </div>

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

        <!-- Bonuses Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UniversalBonus
            v-for="bonus in filteredBonuses"
            :key="bonus.id"
            :title="bonus.title"
            :subtitle="getSubtitle(bonus)"
            :amount="bonus.reward"
            :description="bonus.description"
            :requirements="getRequirements(bonus)"
            :button-text="getButtonText(bonus)"
            :button-variant="getButtonVariant(bonus)"
            :disabled="!bonus.is_active || bonus.isActivated"
            :needs-promo-code="!!bonus.promo_code"
            :has-invalid-promo="bonus.hasInvalidPromo"
            :background-type="getBackgroundType(bonus.type)"
            :info-text="getInfoText(bonus)"
            :is-activated="bonus.isActivated"
            @activate="handleActivateBonus(bonus, $event)"
            @invalid-promo="handleInvalidPromo(bonus.id)"
          />
        </div>

        <!-- Empty State -->
        <div v-if="!loading && !error && filteredBonuses.length === 0" class="text-center py-12">
          <div class="text-text-secondary">{{ $t('bonuses.noBonuses') }}</div>
        </div>

        <!-- Terms and Conditions -->
        <div class="bg-card-bg rounded-lg p-6">
          <h3 class="text-xl font-semibold text-text-primary mb-4">
            {{ $t('bonuses.termsTitle') }}
          </h3>
          <div class="text-text-secondary space-y-2 text-sm">
            <p>• {{ $t('bonuses.terms.registeredOnly') }}</p>
            <p>• {{ $t('bonuses.terms.oncePerBonus') }}</p>
            <p>• {{ $t('bonuses.terms.wagering') }}</p>
            <p>• {{ $t('bonuses.terms.limitedTime') }}</p>
            <p>• {{ $t('bonuses.terms.adminRights') }}</p>
          </div>
        </div>
      </div>

      <RightSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import UniversalBonus from '@/components/UniversalBonus.vue'
import BackButton from '@/components/BackButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import RightSidebar from '@/components/RightSidebar.vue'

import { useToast } from '@/composables/useToast'
import { bonusApi } from '@/services/api'
import type { Bonus } from '@/types'

const { t } = useI18n()
const { showSuccess, showError } = useToast()
const selectedCategory = ref('all')
const loading = ref(false)
const error = ref('')

interface Category {
  id: string
  nameKey: string
}

interface BonusWithState extends Bonus {
  hasInvalidPromo?: boolean
  isActivated?: boolean
}

const categories: Category[] = [
  { id: 'all', nameKey: 'bonuses.categories.all' },
  { id: 'welcome', nameKey: 'bonuses.categories.welcome' },
  { id: 'promo', nameKey: 'bonuses.categories.promo' },
  { id: 'cashback', nameKey: 'bonuses.categories.cashback' },
]

const bonuses = ref<BonusWithState[]>([])

const filteredBonuses = computed(() => {
  let filtered = bonuses.value.map((bonus) => ({
    ...bonus,
    isActivated: bonus.activated_count > 0,
  }))

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter((bonus) => bonus.type === selectedCategory.value)
  }

  return filtered
})

const getSubtitle = (bonus: BonusWithState): string => {
  if (bonus.end_date) {
    const endDate = new Date(bonus.end_date)
    return `${t('bonuses.validUntil')}: ${endDate.toLocaleDateString()}`
  }
  return ''
}

const getRequirements = (bonus: BonusWithState) => {
  const requirements: Record<string, string> = {}

  if (bonus.wager_multiplier) {
    requirements.wager = `${t('bonuses.wager')}: x${bonus.wager_multiplier}`
  }

  if (bonus.max_activations) {
    const remaining = bonus.max_activations - bonus.activated_count
    requirements.activations = `${t('bonuses.activationsLeft')}: ${remaining}`
  }

  return Object.keys(requirements).length > 0 ? requirements : undefined
}

const getButtonText = (bonus: BonusWithState): string => {
  if (bonus.isActivated) {
    return t('bonuses.activated')
  }
  if (!bonus.is_active) {
    return t('bonuses.inactive')
  }
  if (bonus.promo_code) {
    return t('bonuses.enterPromoCode')
  }
  return t('bonus.activate')
}

const getButtonVariant = (bonus: BonusWithState): 'primary' | 'secondary' | 'outline' | 'ghost' => {
  if (bonus.isActivated || !bonus.is_active) {
    return 'outline'
  }
  return 'primary'
}

const getBackgroundType = (type: string): 'red' | 'blue' | 'purple' | 'gradient' => {
  switch (type) {
    case 'welcome':
      return 'blue'
    case 'promo':
      return 'red'
    case 'cashback':
      return 'purple'
    default:
      return 'gradient'
  }
}

const getInfoText = (bonus: BonusWithState): string => {
  let info = bonus.description
  if (bonus.wager_multiplier) {
    info += ` ${t('bonuses.wagerInfo', { multiplier: bonus.wager_multiplier })}`
  }
  return info
}

const loadBonuses = async () => {
  try {
    loading.value = true
    error.value = ''

    // Загружаем все бонусы
    const response = await bonusApi.getAll()
    bonuses.value = response.data.map((bonus) => ({
      ...bonus,
      hasInvalidPromo: false,
      isActivated: false,
    }))
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

const handleActivateBonus = async (bonus: BonusWithState, promoCode?: string) => {
  if (!bonus.is_active || bonus.isActivated) return

  try {
    if (bonus.promo_code && promoCode) {
      // Активация по промокоду
      await bonusApi.activate({ promo_code: promoCode })
      // Обновляем счетчик активации
      bonus.activated_count += 1
      bonus.hasInvalidPromo = false
      showSuccess(
        t('bonuses.promoActivated'),
        t('bonuses.promoActivatedMessage', { code: promoCode }),
      )
    } else if (!bonus.promo_code) {
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
    if (bonus.promo_code && promoCode) {
      bonus.hasInvalidPromo = true
      setTimeout(() => {
        bonus.hasInvalidPromo = false
      }, 3000)
    }
    const errorMessage =
      err instanceof Error && 'response' in err && err.response
        ? (err.response as { data?: { error?: string } }).data?.error
        : undefined
    showError(t('bonuses.activationError'), errorMessage || t('bonuses.activationErrorMessage'))
  }
}

const handleInvalidPromo = (bonusId: number) => {
  console.log('Invalid promo code for bonus:', bonusId)
  showError(t('bonus.invalidPromoCode'), t('bonus.invalidPromoCodeMessage'))
}

onMounted(() => {
  loadBonuses()
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
