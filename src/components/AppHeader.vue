<template>
  <header class="bg-card-bg border-b border-white/10 container mx-auto">
    <div
      class="container mx-auto px-4 py-3 flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between"
    >
      <!-- Логотип -->

      <div class="text-primary font-bold text-3xl">
        <span class="text-primary">Казино</span>
      </div>

      <!-- Профиль пользователя или кнопки авторизации -->
      <div
        v-if="authStore.isAuthenticated && authStore.user"
        class="flex items-center gap-6 flex-col sm:flex-row"
      >
        <!-- Информация о пользователе -->
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/profile')">
            <div class="text-sm">
              <div class="text-white">{{ authStore.user.username }}</div>
              <div class="text-gray-400">
                {{ authStore.user.rank }} · {{ authStore.user.percentage }}%
              </div>
            </div>
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img
                :src="authStore.user.avatarUrl"
                alt="Аватар пользователя"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <!-- Сообщения и уведомления -->
          <div class="flex items-center gap-3">
            <button class="relative" @click="emit('openMessages')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400 hover:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <span
                v-if="authStore.user.messagesCount > 0"
                class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              >
                {{ authStore.user.messagesCount }}
              </span>
            </button>
            <button class="relative" @click="emit('openNotifications')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-400 hover:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                v-if="authStore.user.notificationsCount > 0"
                class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              >
                {{ authStore.user.notificationsCount }}
              </span>
            </button>
          </div>
        </div>
        <!-- Баланс -->
        <div class="flex items-center gap-4">
          <div class="text-sm">
            <div class="text-gray-400">Кэшбэк</div>
            <div class="text-white">{{ authStore.user.cashback }} ₽</div>
          </div>
          <div class="text-sm">
            <div class="text-gray-400">Баллы</div>
            <div class="text-white">{{ authStore.user.points }}</div>
          </div>
          <div class="text-sm">
            <div class="text-gray-400">На счете</div>
            <div class="text-white">{{ authStore.user.balance }} ₽</div>
          </div>
        </div>
        <!-- Касса -->
        <BaseButton variant="primary" size="sm" @click="emit('openCashier')">Пополнить</BaseButton>
      </div>
      <div v-else class="flex items-center gap-3">
        <BaseButton variant="outline" size="sm" @click="emit('login')">Вход</BaseButton>
        <BaseButton variant="primary" size="sm" @click="emit('register')">Регистрация</BaseButton>
      </div>
    </div>
    <!-- Навигация -->
    <nav class="container mx-auto px-4 py-2 overflow-x-auto">
      <AppMenu />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import BaseButton from './BaseButton.vue'
import AppMenu from './AppMenu.vue'
import { useRouter } from 'vue-router'
const emit = defineEmits(['login', 'register', 'openCashier', 'openMessages', 'openNotifications'])
const authStore = useAuthStore()
const router = useRouter()
</script>
