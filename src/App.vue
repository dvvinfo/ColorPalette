<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AuthModal from './components/AuthModal.vue'
import RegisterModal from './components/RegisterModal.vue'
import AppHeader from './components/AppHeader.vue'
import MessageModal from './components/MessageModal.vue'
import NotificationModal from './components/NotificationModal.vue'
import AppFooter from './components/AppFooter.vue'
import DepositModal from './components/DepositModal.vue'

const { t } = useI18n()
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showMessages = ref(false)
const showNotifications = ref(false)
const showDeposit = ref(false)

// Переводимые сообщения и уведомления
const messages = computed(() => [
  {
    id: 1,
    title: t('messages.welcome'),
    date: '20 мая 2025 10:46',
    text: t('messages.welcomeText') + '<br><br>' + t('messages.confirmEmail'),
    read: false,
  },
])

const notifications = computed(() => [
  {
    id: 1,
    title: t('messages.bonusActivated'),
    date: '20 мая 2025 11:00',
    text: 'Вы успешно активировали бонус 10% на депозит.',
  },
  {
    id: 2,
    title: t('messages.newPromotion'),
    date: '19 мая 2025 18:30',
    text: 'Не пропустите новую акцию! Получите до 50 фриспинов.',
  },
])

// Локальные изменяемые копии для удаления/изменения
const localMessages = ref([...messages.value])
const localNotifications = ref([...notifications.value])

function deleteMessage(id: number) {
  localMessages.value = localMessages.value.filter((m) => m.id !== id)
}

function deleteNotification(id: number) {
  localNotifications.value = localNotifications.value.filter((n) => n.id !== id)
}

function markAllMessagesRead() {
  localMessages.value = localMessages.value.map((m) => ({ ...m, read: true }))
}

// Синхронизация при изменении языка
watch(
  messages,
  (newMessages) => {
    localMessages.value = [...newMessages]
  },
  { immediate: true },
)

watch(
  notifications,
  (newNotifications) => {
    localNotifications.value = [...newNotifications]
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-screen bg-background text-white mx-auto px-4 py-8">
    <AppHeader
      @login="showLoginModal = true"
      @register="showRegisterModal = true"
      @openMessages="showMessages = true"
      @openNotifications="showNotifications = true"
      @openCashier="showDeposit = true"
    />

    <main class="container mx-auto w-full">
      <router-view />
    </main>
    <AppFooter />

    <!-- Модалки -->
    <AuthModal v-if="showLoginModal" @close="showLoginModal = false" />
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
    <MessageModal
      v-if="showMessages"
      :messages="localMessages"
      @close="showMessages = false"
      @delete="deleteMessage"
      @markAllRead="markAllMessagesRead"
    />
    <NotificationModal
      v-if="showNotifications"
      :notifications="localNotifications"
      @close="showNotifications = false"
      @delete="deleteNotification"
      @clearAll="localNotifications = []"
    />
    <DepositModal v-if="showDeposit" @close="showDeposit = false" />
  </div>
</template>

<style scoped></style>
