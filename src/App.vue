<script setup lang="ts">
import { ref, watch } from 'vue'
import AuthModal from './components/AuthModal.vue'
import RegisterModal from './components/RegisterModal.vue'
import AppHeader from './components/AppHeader.vue'
import MessageModal from './components/MessageModal.vue'
import NotificationModal from './components/NotificationModal.vue'
import AppFooter from './components/AppFooter.vue'
import DepositModal from './components/DepositModal.vue'

const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showMessages = ref(false)
const showNotifications = ref(false)
const showDeposit = ref(false)

const messages = ref([
  {
    id: 1,
    title: 'Добро пожаловать!',
    date: '20 мая 2025 10:46',
    text: `Поздравляем с регистрацией в клубе! Впереди — вулкан удовольствий и крупных выигрышей!<br><br>Чтобы защитить свой аккаунт и получить доступ к <b>эксклюзивным бонусам</b> — подтвердите email, который вы указали при регистрации.<br><br>Письмо с ссылкой на подтверждение уже отправлено на вашу почту. Если письмо не пришло в течение 2 минут, пожалуйста, проверьте папку «Спам».`,
    read: false,
  },
])

const notifications = ref([
  {
    id: 1,
    title: 'Бонус активирован!',
    date: '20 мая 2025 11:00',
    text: 'Вы успешно активировали бонус 10% на депозит.',
  },
  {
    id: 2,
    title: 'Новая акция',
    date: '19 мая 2025 18:30',
    text: 'Не пропустите новую акцию! Получите до 50 фриспинов.',
  },
])

function deleteMessage(id: number) {
  messages.value = messages.value.filter((m) => m.id !== id)
}
function deleteNotification(id: number) {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}

function markAllMessagesRead() {
  messages.value = messages.value.map((m) => ({ ...m, read: true }))
}

// Синхронизация счетчиков в сторе
watch(
  messages,
  (val) => {
    // Обновляем только локальное состояние
    messages.value = val
  },
  { deep: true },
)

watch(
  notifications,
  (val) => {
    // Обновляем только локальное состояние
    notifications.value = val
  },
  { deep: true },
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
      :messages="messages"
      @close="showMessages = false"
      @delete="deleteMessage"
      @markAllRead="markAllMessagesRead"
    />
    <NotificationModal
      v-if="showNotifications"
      :notifications="notifications"
      @close="showNotifications = false"
      @delete="deleteNotification"
      @clearAll="notifications = []"
    />
    <DepositModal v-if="showDeposit" @close="showDeposit = false" />
  </div>
</template>

<style scoped></style>
