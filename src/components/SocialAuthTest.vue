<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">{{ $t('auth.testing.title') }}</h2>

    <!-- Тестовые данные -->
    <div class="mb-6 p-4 bg-card-bg rounded-lg">
      <h3 class="font-bold mb-2">{{ $t('auth.testing.testData') }}:</h3>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-gray-400">{{ $t('auth.email') }}:</span>
          <span class="text-white">test@example.com</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-400">{{ $t('auth.password') }}:</span>
          <span class="text-white">password123</span>
        </div>
      </div>
    </div>

    <!-- Тестовые кнопки -->
    <div class="space-y-4">
      <BaseButton variant="primary" @click="testGoogleAuth" :disabled="loading">
        {{ $t('auth.testing.testGoogle') }}
      </BaseButton>

      <BaseButton variant="primary" @click="testTelegramAuth" :disabled="loading">
        {{ $t('auth.testing.testTelegram') }}
      </BaseButton>

      <BaseButton variant="primary" @click="testVKAuth" :disabled="loading">
        {{ $t('auth.testing.testVK') }}
      </BaseButton>
    </div>

    <!-- Результаты тестов -->
    <div v-if="testResults.length" class="mt-6">
      <h3 class="font-bold mb-2">{{ $t('auth.testing.results') }}:</h3>
      <div class="space-y-2">
        <div
          v-for="(result, index) in testResults"
          :key="index"
          class="p-3 rounded-lg"
          :class="result.success ? 'bg-green-500/20' : 'bg-red-500/20'"
        >
          <div class="font-medium">{{ result.provider }}</div>
          <div class="text-sm">{{ result.message }}</div>
          <div v-if="result.data" class="mt-2 text-xs font-mono bg-black/20 p-2 rounded">
            {{ JSON.stringify(result.data, null, 2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from './BaseButton.vue'

const { t } = useI18n()
const loading = ref(false)
const testResults = ref<
  Array<{
    provider: string
    success: boolean
    message: string
    data?: Record<string, unknown> | null
  }>
>([])

async function testGoogleAuth() {
  try {
    loading.value = true
    // Google OAuth endpoint
    const clientId = 'YOUR_GOOGLE_CLIENT_ID'
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/google/callback')
    const scope = encodeURIComponent('email profile')
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
  } catch (error) {
    testResults.value.push({
      provider: 'Google',
      success: false,
      message: error instanceof Error ? error.message : t('auth.testing.errors.google'),
    })
  } finally {
    loading.value = false
  }
}

async function testTelegramAuth() {
  try {
    loading.value = true
    // Telegram Login Widget
    const botId = 'YOUR_BOT_ID'
    const redirectUrl = encodeURIComponent('http://localhost:3000/auth/telegram/callback')
    window.location.href = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${window.location.origin}&return_to=${redirectUrl}`
  } catch (error) {
    testResults.value.push({
      provider: 'Telegram',
      success: false,
      message: error instanceof Error ? error.message : t('auth.testing.errors.telegram'),
    })
  } finally {
    loading.value = false
  }
}

async function testVKAuth() {
  try {
    loading.value = true
    // VK OAuth endpoint
    const clientId = 'YOUR_VK_CLIENT_ID'
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/vk/callback')
    const scope = encodeURIComponent('email')
    window.location.href = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
  } catch (error) {
    testResults.value.push({
      provider: 'VK',
      success: false,
      message: error instanceof Error ? error.message : t('auth.testing.errors.vk'),
    })
  } finally {
    loading.value = false
  }
}
</script>
