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

        <!-- Bonuses Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UniversalBonus
            v-for="bonus in filteredBonuses"
            :key="bonus.id"
            :title="$t(bonus.titleKey)"
            :subtitle="bonus.subtitleKey ? $t(bonus.subtitleKey) : bonus.subtitle"
            :amount="bonus.amount"
            :description="bonus.descriptionKey ? $t(bonus.descriptionKey) : bonus.description"
            :requirements="bonus.requirements"
            :button-text="$t(bonus.buttonTextKey || 'bonus.activate')"
            :button-variant="bonus.buttonVariant"
            :disabled="bonus.disabled"
            :needs-promo-code="bonus.needsPromoCode"
            :has-invalid-promo="bonus.hasInvalidPromo"
            :background-type="bonus.backgroundType"
            :background-image="bonus.backgroundImage"
            :info-text="bonus.infoTextKey ? $t(bonus.infoTextKey) : bonus.infoText"
            :is-activated="bonus.isActivated"
            @activate="handleActivateBonus(bonus.id, $event)"
            @invalid-promo="handleInvalidPromo(bonus.id)"
          />
        </div>

        <!-- Terms and Conditions -->
        <div class="bg-card-bg rounded-lg p-6 border border-border">
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
import { ref, computed } from 'vue'
import UniversalBonus from '@/components/UniversalBonus.vue'
import BackButton from '@/components/BackButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const selectedCategory = ref('all')

interface Category {
  id: string
  nameKey: string
}

interface BonusItem {
  id: string
  titleKey: string
  subtitleKey?: string
  subtitle?: string
  amount?: string
  descriptionKey?: string
  description?: string
  requirements?: {
    deposit?: string
    timer?: string
    minAmount?: string
  }
  buttonTextKey?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  disabled?: boolean
  needsPromoCode?: boolean
  hasInvalidPromo?: boolean
  backgroundType?: 'red' | 'blue' | 'purple' | 'gradient'
  backgroundImage?: string
  infoTextKey?: string
  infoText?: string
  isActivated?: boolean
  category: string
}

const categories: Category[] = [
  { id: 'all', nameKey: 'bonuses.categories.all' },
  { id: 'welcome', nameKey: 'bonuses.categories.welcome' },
  { id: 'deposit', nameKey: 'bonuses.categories.deposit' },
  { id: 'freespins', nameKey: 'bonuses.categories.freespins' },
  { id: 'cashback', nameKey: 'bonuses.categories.cashback' },
  { id: 'special', nameKey: 'bonuses.categories.special' },
]

const bonuses = ref<BonusItem[]>([
  {
    id: 'promo-code',
    titleKey: 'bonuses.promoCode.title',
    subtitleKey: 'bonuses.promoCode.subtitle',
    descriptionKey: 'bonuses.promoCode.description',
    buttonTextKey: 'bonus.activate',
    buttonVariant: 'primary',
    needsPromoCode: true,
    backgroundType: 'red',
    infoTextKey: 'bonuses.promoCode.info',
    category: 'special',
  },
  {
    id: 'tiktok-bonus',
    titleKey: 'bonuses.tiktok.title',
    subtitleKey: 'bonuses.tiktok.subtitle',
    amount: 'На депозит от 600 ₽',
    descriptionKey: 'bonuses.tiktok.description',
    requirements: {
      deposit: '600 ₽',
    },
    buttonTextKey: 'bonus.activate',
    buttonVariant: 'primary',
    backgroundType: 'purple',
    infoTextKey: 'bonuses.tiktok.info',
    category: 'special',
  },
  {
    id: 'welcome-bonus',
    titleKey: 'bonuses.welcome.title',
    subtitleKey: 'bonuses.welcome.subtitle',
    amount: 'Первый депозит от 550 ₽',
    description: 'До завершения 03:00:00',
    requirements: {
      deposit: '550 ₽',
      timer: '03:00:00',
    },
    buttonTextKey: 'bonus.activate',
    buttonVariant: 'primary',
    backgroundType: 'blue',
    infoTextKey: 'bonuses.welcome.info',
    category: 'welcome',
  },
  {
    id: 'deposit-bonus',
    titleKey: 'bonuses.depositBonus.title',
    subtitleKey: 'bonuses.depositBonus.subtitle',
    amount: 'Осталось внести еще 1000 ₽',
    descriptionKey: 'bonuses.depositBonus.description',
    requirements: {
      minAmount: '1 000 ₽',
      timer: '02:00:00',
    },
    buttonTextKey: 'bonus.activate',
    buttonVariant: 'primary',
    backgroundType: 'gradient',
    infoTextKey: 'bonuses.depositBonus.info',
    category: 'deposit',
  },
  {
    id: 'weekend-bonus',
    titleKey: 'bonuses.weekend.title',
    subtitleKey: 'bonuses.weekend.subtitle',
    amount: 'До 50 000 ₽',
    description: 'Минимальный депозит 1000 ₽',
    requirements: {
      deposit: '1 000 ₽',
    },
    buttonTextKey: 'bonus.activate',
    buttonVariant: 'primary',
    backgroundType: 'blue',
    infoTextKey: 'bonuses.weekend.info',
    category: 'special',
  },
  {
    id: 'cashback-weekly',
    titleKey: 'bonuses.cashbackWeekly.title',
    subtitleKey: 'bonuses.cashbackWeekly.subtitle',
    amount: 'До 25 000 ₽',
    description: 'Каждый понедельник',
    buttonTextKey: 'bonus.activate',
    buttonVariant: 'primary',
    backgroundType: 'purple',
    infoTextKey: 'bonuses.cashbackWeekly.info',
    category: 'cashback',
  },
])

const filteredBonuses = computed(() => {
  if (selectedCategory.value === 'all') {
    return bonuses.value
  }
  return bonuses.value.filter((bonus) => bonus.category === selectedCategory.value)
})

const handleActivateBonus = (bonusId: string, promoCode?: string) => {
  const bonus = bonuses.value.find((b) => b.id === bonusId)
  if (!bonus) return

  console.log(
    t('bonuses.debug.activating'),
    bonusId,
    promoCode ? `${t('bonuses.debug.withPromoCode')}: ${promoCode}` : '',
  )

  // Эмуляция активации бонуса
  if (promoCode && bonusId === 'promo-code') {
    // Проверка промокода (эмуляция)
    if (promoCode.toLowerCase() === 'test123') {
      bonus.isActivated = true
      bonus.buttonTextKey = 'bonuses.activated'
      bonus.disabled = true
      alert(t('bonuses.promoActivated'))
    } else {
      bonus.hasInvalidPromo = true
      setTimeout(() => {
        bonus.hasInvalidPromo = false
      }, 3000)
    }
  } else {
    bonus.isActivated = true
    bonus.buttonTextKey = 'bonuses.activated'
    bonus.disabled = true
    alert(t('bonuses.bonusActivated', { title: t(bonus.titleKey) }))
  }
}

const handleInvalidPromo = (bonusId: string) => {
  console.log(t('bonuses.debug.invalidPromoCode'), bonusId)
  alert(t('bonus.invalidPromoCode'))
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
