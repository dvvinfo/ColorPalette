import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { User } from '@/services/api'
import { authApi, userApi } from '@/services/api'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  const { t } = useI18n()
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(Cookies.get('access_token') || null)
  const refreshToken = ref<string | null>(Cookies.get('refresh_token') || null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  async function login(username: string, password: string) {
    try {
      loading.value = true
      const { data } = await authApi.login({ username, password })
      setTokens(data.access_token, data.refresh_token)
      await fetchUser()
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      loading.value = true
      const { data } = await authApi.register({ username, email, password })
      setTokens(data.access_token, data.refresh_token)
      await fetchUser()
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function loginWithGoogle() {
    try {
      loading.value = true
      const { data } = await authApi.googleAuth()
      setTokens(data.access_token, data.refresh_token)
      await fetchUser()
      return true
    } catch (error) {
      console.error('Google login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function loginWithTelegram() {
    try {
      loading.value = true
      const { data } = await authApi.telegramAuth()
      setTokens(data.access_token, data.refresh_token)
      await fetchUser()
      return true
    } catch (error) {
      console.error('Telegram login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function loginWithVK() {
    try {
      loading.value = true
      const { data } = await authApi.vkAuth()
      setTokens(data.access_token, data.refresh_token)
      await fetchUser()
      return true
    } catch (error) {
      console.error('VK login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function handleGoogleCallback(code: string) {
    try {
      loading.value = true
      const { data } = await authApi.googleCallback(code)
      setTokens(data.access_token, data.refresh_token)
      await fetchUser()
      return true
    } catch (error) {
      console.error('Google callback error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      loading.value = true
      await authApi.refresh() // Обновляем токен перед выходом
      clearTokens()
      user.value = null
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    try {
      loading.value = true
      const { data } = await userApi.getProfile()
      user.value = data
      error.value = null

      // Инициализируем игры после успешной загрузки пользователя
      await initializeGamesAfterAuth()
    } catch (err: unknown) {
      console.error('Fetch user error:', err)
      clearTokens()
      error.value = err instanceof Error ? err.message : t('auth.errors.profileLoadError')
    } finally {
      loading.value = false
    }
  }

  async function initializeGamesAfterAuth() {
    try {
      // Динамический импорт для избежания циклических зависимостей
      const { useGamesStore } = await import('./games')
      const gamesStore = useGamesStore()
      await gamesStore.initializeGames()
    } catch (error) {
      console.error(t('auth.errors.gamesInitError'), error)
    }
  }

  function setTokens(access: string, refresh: string) {
    accessToken.value = access
    refreshToken.value = refresh
    // Устанавливаем cookies с настройками безопасности
    Cookies.set('access_token', access, {
      secure: true, // Только для HTTPS
      sameSite: 'strict', // Защита от CSRF
      expires: 1 / 24, // 1 час для access token
    })
    Cookies.set('refresh_token', refresh, {
      secure: true,
      sameSite: 'strict',
      expires: 7, // 7 дней для refresh token
    })
  }

  function clearTokens() {
    accessToken.value = null
    refreshToken.value = null
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
  }

  // Инициализация при загрузке приложения
  if (accessToken.value) {
    fetchUser()
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    loginWithTelegram,
    loginWithVK,
    handleGoogleCallback,
    logout,
    fetchUser,
  }
})
