import axios from 'axios'
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Определяем базовый URL в зависимости от режима
const getBaseURL = () => {
  // Логируем для отладки
  console.log('🔍 Environment check:', {
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL
  })

  // В режиме разработки используем Vite прокси
  if (import.meta.env.DEV) {
    console.log('🚀 Using DEV mode - Vite proxy: /api')
    return '/api'
  }

  // В продакшене на Vercel используем API route для проксирования
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    console.log('🌐 Using Vercel production - API proxy: /api/proxy')
    return '/api/proxy'
  }

  // Для других случаев (например, самостоятельный хостинг)
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://77.246.247.145'
  console.log('🏠 Using direct connection:', baseUrl)
  return baseUrl
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Важно для работы с cookies
})

// Интерфейсы для ответов
export interface AuthResponse {
  role: string
  user_id: number
  access_token: string
  refresh_token: string
}

export interface RefreshResponse {
  access_token: string
}

export interface Role {
  id: number
  name: string
  permissions: null
}

export interface User {
  id: number
  username: string
  email: string | null
  role_id: number
  provider: string
  provider_id: string
  balance: number
  created_at: string
  updated_at: string
  role: Role
}

export interface Game {
  id: number
  name: string
  rtp: number
  chance: number
}

export interface GamePlayResponse {
  result: 'win' | 'lose'
  win_amount: number
  new_balance: number
}

export interface ValidationError {
  field: string
  error: string
}

export interface ErrorResponse {
  error: string
}

export interface StatusResponse {
  message: string
}

// API методы
export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post<AuthResponse>('/api/registration', data),

  login: (data: { username: string; password: string }) =>
    api.post<AuthResponse>('/api/auth/login', data),

  refresh: () => api.post<RefreshResponse>('/api/refresh'),

  googleAuth: () => api.post<AuthResponse>('/api/google'),

  telegramAuth: () => api.post<AuthResponse>('/api/telegram'),

  vkAuth: () => api.post<AuthResponse>('/api/vk'),

  googleCallback: (code: string) => api.get<AuthResponse>(`/api/google/callback?code=${code}`),
}

export const userApi = {
  getProfile: () => api.get<User>('/api/user/me'),

  getAllUsers: () => api.get<User[]>('/api/user/'),

  getUserById: (id: number) => api.get<User>(`/api/user/${id}`),

  updateProfile: (data: Partial<User>) => api.put<User>('/api/user/me', data),

  updateUser: (id: number, data: Partial<User>) => api.put<User>(`/api/user/${id}`, data),

    setUserRole: (userId: number, roleId: number) =>
    api.put<StatusResponse>(`/api/user/${userId}/role`, { role_id: roleId }),

  setUserBalance: (userId: number, amount: number) =>
    api.put<StatusResponse>(`/api/user/${userId}/balance`, { amount }),
}



export const balanceApi = {
  getBalance: () => api.get<{ balance: number }>('/api/balance/'),

  deposit: (data: { amount: number; method: string }) =>
    api.post<StatusResponse>('/api/balance/deposit', data),

  withdraw: (data: { amount: number; method: string }) =>
    api.post<StatusResponse>('/api/balance/withdraw', data),
}

export const gamesApi = {
  getAll: () => api.get<Game[]>('/api/game/list'),

  getById: (id: number) => api.get<Game>(`/api/game/${id}`),

  create: (data: { name: string; chance: number; rtp: number }) => api.post<number>('/api/game/', data),

  update: (id: number, data: Partial<Game>) => api.put<StatusResponse>(`/api/game/${id}`, data),

  play: (id: number, data: { bet: number }) => api.post<GamePlayResponse>(`/api/game/${id}/play`, data),
}

// Добавляем перехватчик для установки токена
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get('access_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Добавляем перехватчик для обработки ошибок
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await authApi.refresh()
        Cookies.set('access_token', data.access_token, {
          secure: true,
          sameSite: 'strict',
          expires: 1 / 24,
        })
        // Повторяем запрос с новым токеном
        const config = error.config
        if (config && config.headers) {
          config.headers.Authorization = `Bearer ${data.access_token}`
          return api(config)
        }
            } catch {
        // Если не удалось обновить токен, выходим из системы
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')

        // Перенаправляем на страницу логина
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  },
)

export default api
