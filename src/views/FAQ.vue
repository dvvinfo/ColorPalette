<template>
  <div class="min-h-screen bg-background w-full">
    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4">
        <!-- Back Button -->
        <BackButton class="mb-6" />

        <!-- FAQ Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-text-primary mb-4">{{ $t('faq.title') }}</h1>
          <p class="text-text-secondary text-lg">
            {{ $t('faq.description') }}
          </p>
        </div>

        <!-- Search FAQ -->
        <div class="mb-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('faq.searchPlaceholder')"
              class="w-full px-4 py-3 pl-12 bg-card-bg rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            <svg
              class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- FAQ Categories -->
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

        <!-- FAQ Accordion -->
        <Accordion :items="filteredFaqItems" />

        <!-- Contact Support -->
        <div class="mt-12 p-6 bg-card-bg rounded-lg">
          <h3 class="text-xl font-semibold text-text-primary mb-3">
            {{ $t('faq.noAnswer') }}
          </h3>
          <p class="text-text-secondary mb-4">
            {{ $t('faq.supportDescription') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <BaseButton variant="primary" size="lg"> {{ $t('faq.contactSupport') }} </BaseButton>
            <BaseButton variant="outline" size="lg"> {{ $t('faq.writeToChat') }} </BaseButton>
          </div>
        </div>
      </div>

      <RightSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Accordion from '@/components/AppAccordion.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import BaseButton from '@/components/BaseButton.vue'
import BackButton from '@/components/BackButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const searchQuery = ref('')
const selectedCategory = ref('all')

interface Category {
  id: string
  nameKey: string
}

interface FaqItem {
  question: string
  answer: string
  category: string
}

const categories: Category[] = [
  { id: 'all', nameKey: 'faq.categories.all' },
  { id: 'account', nameKey: 'faq.categories.account' },
  { id: 'games', nameKey: 'faq.categories.games' },
  { id: 'payments', nameKey: 'faq.categories.payments' },
  { id: 'bonuses', nameKey: 'faq.categories.bonuses' },
  { id: 'security', nameKey: 'faq.categories.security' },
]

const faqItems = computed((): FaqItem[] => [
  {
    question: t('faq.items.createAccount.question'),
    answer: t('faq.items.createAccount.answer'),
    category: 'account',
  },
  {
    question: t('faq.items.deposit.question'),
    answer: t('faq.items.deposit.answer'),
    category: 'payments',
  },
  {
    question: t('faq.items.withdraw.question'),
    answer: t('faq.items.withdraw.answer'),
    category: 'payments',
  },
  {
    question: t('faq.items.games.question'),
    answer: t('faq.items.games.answer'),
    category: 'games',
  },
  {
    question: t('faq.items.welcomeBonus.question'),
    answer: t('faq.items.welcomeBonus.answer'),
    category: 'bonuses',
  },
  {
    question: t('faq.items.wagering.question'),
    answer: t('faq.items.wagering.answer'),
    category: 'bonuses',
  },
  {
    question: t('faq.items.security.question'),
    answer: t('faq.items.security.answer'),
    category: 'security',
  },
  {
    question: t('faq.items.resetPassword.question'),
    answer: t('faq.items.resetPassword.answer'),
    category: 'account',
  },
  {
    question: t('faq.items.mobile.question'),
    answer: t('faq.items.mobile.answer'),
    category: 'games',
  },
  {
    question: t('faq.items.withdrawLimits.question'),
    answer: t('faq.items.withdrawLimits.answer'),
    category: 'payments',
  },
])

const filteredFaqItems = computed(() => {
  let filtered = faqItems.value

  // Фильтр по категории
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter((item) => item.category === selectedCategory.value)
  }

  // Поиск по тексту
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (item) =>
        item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
    )
  }

  return filtered
})
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
}
</style>
