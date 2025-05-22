<template>
  <div class="flex flex-col gap-4 w-full max-w-[300px] mx-auto">
    <BaseButton
      variant="primary"
      class="flex items-center justify-center gap-2 bg-[#DB4437] hover:bg-[#c13a2e]"
      @click="handleGoogleLogin"
      :disabled="loading"
    >
      <img src="@/assets/google-icon.svg" alt="Google" class="w-6 h-6" />
      Войти через Google
    </BaseButton>

    <BaseButton
      variant="primary"
      class="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b3]"
      @click="handleTelegramLogin"
      :disabled="loading"
    >
      <img src="@/assets/telegram-icon.svg" alt="Telegram" class="w-6 h-6" />
      Войти через Telegram
    </BaseButton>

    <BaseButton
      variant="primary"
      class="flex items-center justify-center gap-2 bg-[#4C75A3] hover:bg-[#3b5a7d]"
      @click="handleVKLogin"
      :disabled="loading"
    >
      <img src="@/assets/vk-icon.svg" alt="VK" class="w-6 h-6" />
      Войти через VK
    </BaseButton>

    <div v-if="error" class="text-red-500 text-sm text-center mt-2">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from './BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref<string | null>(null)

const handleGoogleLogin = async () => {
  try {
    loading.value = true
    error.value = null
    await authStore.loginWithGoogle()
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при входе через Google'
  } finally {
    loading.value = false
  }
}

const handleTelegramLogin = async () => {
  try {
    loading.value = true
    error.value = null
    await authStore.loginWithTelegram()
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при входе через Telegram'
  } finally {
    loading.value = false
  }
}

const handleVKLogin = async () => {
  try {
    loading.value = true
    error.value = null
    await authStore.loginWithVK()
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при входе через VK'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.social-auth {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.social-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.social-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.social-icon {
  width: 24px;
  height: 24px;
}

.google {
  background-color: #db4437;
}

.telegram {
  background-color: #0088cc;
}

.vk {
  background-color: #4c75a3;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
