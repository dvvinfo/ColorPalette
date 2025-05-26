<template>
  <div class="min-h-screen bg-background w-full">
    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4">
        <!-- Back Button -->
        <BackButton class="mb-6" />

        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-text-primary mb-4">Бонусы и акции</h1>
          <p class="text-text-secondary text-lg">
            Получайте щедрые бонусы и участвуйте в выгодных акциях нашего казино
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
              {{ category.name }}
            </BaseButton>
          </div>
        </div>

        <!-- Bonuses Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UniversalBonus
            v-for="bonus in filteredBonuses"
            :key="bonus.id"
            :title="bonus.title"
            :subtitle="bonus.subtitle"
            :amount="bonus.amount"
            :description="bonus.description"
            :requirements="bonus.requirements"
            :button-text="bonus.buttonText"
            :button-variant="bonus.buttonVariant"
            :disabled="bonus.disabled"
            :needs-promo-code="bonus.needsPromoCode"
            :has-invalid-promo="bonus.hasInvalidPromo"
            :background-type="bonus.backgroundType"
            :background-image="bonus.backgroundImage"
            :info-text="bonus.infoText"
            :is-activated="bonus.isActivated"
            @activate="handleActivateBonus(bonus.id, $event)"
            @invalid-promo="handleInvalidPromo(bonus.id)"
          />
        </div>

        <!-- Terms and Conditions -->
        <div class="bg-card-bg rounded-lg p-6 border border-border">
          <h3 class="text-xl font-semibold text-text-primary mb-4">Условия получения бонусов</h3>
          <div class="text-text-secondary space-y-2 text-sm">
            <p>• Бонусы доступны только зарегистрированным пользователям</p>
            <p>• Каждый бонус можно активировать только один раз</p>
            <p>• Для вывода бонусных средств необходимо выполнить условия отыгрыша</p>
            <p>• Бонусы имеют ограниченный срок действия</p>
            <p>• Администрация оставляет за собой право изменять условия акций</p>
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

const selectedCategory = ref('all')

interface Category {
  id: string
  name: string
}

interface BonusItem {
  id: string
  title: string
  subtitle?: string
  amount?: string
  description?: string
  requirements?: {
    deposit?: string
    timer?: string
    minAmount?: string
  }
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  disabled?: boolean
  needsPromoCode?: boolean
  hasInvalidPromo?: boolean
  backgroundType?: 'red' | 'blue' | 'purple' | 'gradient'
  backgroundImage?: string
  infoText?: string
  isActivated?: boolean
  category: string
}

const categories: Category[] = [
  { id: 'all', name: 'Все' },
  { id: 'welcome', name: 'Приветственные' },
  { id: 'deposit', name: 'На депозит' },
  { id: 'freespins', name: 'Фриспины' },
  { id: 'cashback', name: 'Кэшбэк' },
  { id: 'special', name: 'Специальные' },
]

const bonuses = ref<BonusItem[]>([
  {
    id: 'promo-code',
    title: 'Есть промокод?',
    subtitle: 'Активируй сейчас!',
    description: 'Введите ваш промокод и получите бонус',
    buttonText: 'Активировать',
    buttonVariant: 'primary',
    needsPromoCode: true,
    backgroundType: 'red',
    infoText: 'Введите промокод для активации специального бонуса',
    category: 'special',
  },
  {
    id: 'tiktok-bonus',
    title: 'Бонус TikTok 115% и 20 FS',
    subtitle: 'в Crazy Monkey',
    amount: 'На депозит от 600 ₽',
    description: 'Получите 115% к депозиту + 20 фриспинов',
    requirements: {
      deposit: '600 ₽',
    },
    buttonText: 'Активировать',
    buttonVariant: 'primary',
    backgroundType: 'purple',
    infoText: 'Специальный бонус для подписчиков TikTok',
    category: 'special',
  },
  {
    id: 'welcome-bonus',
    title: 'До 300 000 ₽ и 500 FS',
    subtitle: '+ Freebet',
    amount: 'Первый депозит от 550 ₽',
    description: 'До завершения 03:00:00',
    requirements: {
      deposit: '550 ₽',
      timer: '03:00:00',
    },
    buttonText: 'Активировать',
    buttonVariant: 'primary',
    backgroundType: 'blue',
    infoText: 'Максимальный приветственный бонус для новых игроков',
    category: 'welcome',
  },
  {
    id: 'deposit-bonus',
    title: 'Бонус 10%',
    subtitle: 'на минимальный депозит',
    amount: 'Осталось внести еще 1000 ₽',
    description: 'На сумму депозитов от 1 000 ₽',
    requirements: {
      minAmount: '1 000 ₽',
      timer: '02:00:00',
    },
    buttonText: 'Активировать',
    buttonVariant: 'primary',
    backgroundType: 'gradient',
    infoText: 'Дополнительный бонус на последующие депозиты',
    category: 'deposit',
  },
  {
    id: 'weekend-bonus',
    title: 'Выходной бонус 50%',
    subtitle: 'только в субботу и воскресенье',
    amount: 'До 50 000 ₽',
    description: 'Минимальный депозит 1000 ₽',
    requirements: {
      deposit: '1 000 ₽',
    },
    buttonText: 'Активировать',
    buttonVariant: 'primary',
    backgroundType: 'blue',
    infoText: 'Специальный бонус для выходных дней',
    category: 'special',
  },
  {
    id: 'cashback-weekly',
    title: 'Еженедельный кэшбэк 15%',
    subtitle: 'возврат проигранных средств',
    amount: 'До 25 000 ₽',
    description: 'Каждый понедельник',
    buttonText: 'Активировать',
    buttonVariant: 'primary',
    backgroundType: 'purple',
    infoText: 'Возврат части проигранных средств за неделю',
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

  console.log('Активация бонуса:', bonusId, promoCode ? `с промокодом: ${promoCode}` : '')

  // Эмуляция активации бонуса
  if (promoCode && bonusId === 'promo-code') {
    // Проверка промокода (эмуляция)
    if (promoCode.toLowerCase() === 'test123') {
      bonus.isActivated = true
      bonus.buttonText = 'Активирован'
      bonus.disabled = true
      alert('Промокод успешно активирован!')
    } else {
      bonus.hasInvalidPromo = true
      setTimeout(() => {
        bonus.hasInvalidPromo = false
      }, 3000)
    }
  } else {
    bonus.isActivated = true
    bonus.buttonText = 'Активирован'
    bonus.disabled = true
    alert(`Бонус "${bonus.title}" успешно активирован!`)
  }
}

const handleInvalidPromo = (bonusId: string) => {
  console.log('Неверный промокод для бонуса:', bonusId)
  alert('Неверный промокод. Попробуйте еще раз.')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
