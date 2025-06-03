<script setup lang="ts">
import { ref } from 'vue'
import AuthModal from './components/AuthModal.vue'
import RegisterModal from './components/RegisterModal.vue'
import AppHeader from './components/AppHeader.vue'
import NotificationModal from './components/NotificationModal.vue'
import AppFooter from './components/AppFooter.vue'
import DepositModal from './components/DepositModal.vue'
import Toast from './components/Toast.vue'
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showMessages = ref(false)
const showNotifications = ref(false)
const showDeposit = ref(false)
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
    <!-- Уведомления теперь используют store и не нуждаются в пропсах -->
    <NotificationModal v-if="showNotifications" @close="showNotifications = false" />
    <DepositModal v-if="showDeposit" @close="showDeposit = false" />

    <!-- Toast уведомления -->
    <Toast />
  </div>
</template>

<style scoped></style>
