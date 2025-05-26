<template>
  <div class="min-h-screen bg-background w-full">
    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4">
        <!-- Back Button -->
        <BackButton class="mb-6" />

        <!-- FAQ Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-text-primary mb-4">Часто задаваемые вопросы</h1>
          <p class="text-text-secondary text-lg">
            Здесь вы найдете ответы на самые популярные вопросы о нашем казино
          </p>
        </div>

        <!-- Search FAQ -->
        <div class="mb-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по FAQ..."
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
              {{ category.name }}
            </BaseButton>
          </div>
        </div>

        <!-- FAQ Accordion -->
        <Accordion :items="filteredFaqItems" />

        <!-- Contact Support -->
        <div class="mt-12 p-6 bg-card-bg rounded-lg">
          <h3 class="text-xl font-semibold text-text-primary mb-3">
            Не нашли ответ на свой вопрос?
          </h3>
          <p class="text-text-secondary mb-4">
            Наша служба поддержки работает круглосуточно и готова помочь вам
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <BaseButton variant="primary" size="lg"> Связаться с поддержкой </BaseButton>
            <BaseButton variant="outline" size="lg"> Написать в чат </BaseButton>
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

const searchQuery = ref('')
const selectedCategory = ref('all')

interface Category {
  id: string
  name: string
}

interface FaqItem {
  question: string
  answer: string
  category: string
}

const categories: Category[] = [
  { id: 'all', name: 'Все' },
  { id: 'account', name: 'Аккаунт' },
  { id: 'games', name: 'Игры' },
  { id: 'payments', name: 'Платежи' },
  { id: 'bonuses', name: 'Бонусы' },
  { id: 'security', name: 'Безопасность' },
]

const faqItems: FaqItem[] = [
  {
    question: 'Как создать аккаунт в казино?',
    answer:
      'Для создания аккаунта нажмите на кнопку "Регистрация" в правом верхнем углу сайта. Заполните все необходимые поля: email, пароль, имя и фамилию. После этого подтвердите свой email адрес, перейдя по ссылке в письме.',
    category: 'account',
  },
  {
    question: 'Как пополнить счет?',
    answer:
      'Пополнить счет можно несколькими способами: банковской картой (Visa/Mastercard), электронными кошельками (Qiwi, WebMoney, ЮMoney), банковским переводом или криптовалютой. Минимальная сумма пополнения составляет 100 рублей.',
    category: 'payments',
  },
  {
    question: 'Как вывести выигрыш?',
    answer:
      'Для вывода средств перейдите в раздел "Касса" и выберите "Вывод средств". Укажите сумму и способ вывода. Обработка заявки занимает от нескольких минут до 24 часов в зависимости от способа вывода.',
    category: 'payments',
  },
  {
    question: 'Какие игры доступны в казино?',
    answer:
      'В нашем казино доступны: слоты от ведущих провайдеров, настольные игры (рулетка, блэкджек, покер), live-казино с реальными дилерами, спортивные ставки и эксклюзивные игры.',
    category: 'games',
  },
  {
    question: 'Как получить приветственный бонус?',
    answer:
      'Приветственный бонус начисляется автоматически после первого пополнения счета на сумму от 1000 рублей. Бонус составляет 100% от суммы депозита + 100 фриспинов в слоте Book of Ra.',
    category: 'bonuses',
  },
  {
    question: 'Что такое вейджер?',
    answer:
      'Вейджер (отыгрыш) - это условие, которое необходимо выполнить для вывода бонусных средств. Например, если вейджер x35, то нужно поставить сумму в 35 раз больше полученного бонуса.',
    category: 'bonuses',
  },
  {
    question: 'Безопасно ли играть в вашем казино?',
    answer:
      'Да, наше казино имеет лицензию и использует современные технологии шифрования SSL для защиты ваших данных. Все игры сертифицированы и используют генератор случайных чисел.',
    category: 'security',
  },
  {
    question: 'Как восстановить пароль?',
    answer:
      'Нажмите на "Забыли пароль?" на странице входа, введите ваш email. На почту придет письмо с инструкциями по восстановлению пароля.',
    category: 'account',
  },
  {
    question: 'Можно ли играть с мобильного устройства?',
    answer:
      'Да, наш сайт полностью адаптирован для мобильных устройств. Также доступно мобильное приложение для iOS и Android.',
    category: 'games',
  },
  {
    question: 'Какие лимиты на вывод средств?',
    answer:
      'Минимальная сумма вывода - 300 рублей. Максимальная сумма зависит от VIP статуса: обычные игроки - 100,000 руб/день, VIP игроки - без лимитов.',
    category: 'payments',
  },
]

const filteredFaqItems = computed(() => {
  let filtered = faqItems

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
