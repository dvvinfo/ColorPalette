import axios from 'axios'
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import type {
  UserNotification,
  NotificationCreateRequest,
  Bonus,
  BonusCreateRequest,
  BonusActivateRequest,
  BonusResponse,
  BetHistoryResponse,
} from '@/types'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Определяем базовый URL в зависимости от режима
const getBaseURL = () => {
  // Логируем для отладки
  console.log('🔍 Environment check:', {
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
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

// Расширенный интерфейс для конфигурации с полем _retry
interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
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

  // GET /user/history - получить историю ставок пользователя
  getBetHistory: (page: number = 1) =>
    api.get<BetHistoryResponse>(`/api/user/history?page=${page}`),
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

  create: (data: { name: string; chance: number; rtp: number }) =>
    api.post<number>('/api/game/', data),

  update: (id: number, data: Partial<Game>) => api.put<StatusResponse>(`/api/game/${id}`, data),

  play: (id: number, data: { bet: number }) =>
    api.post<GamePlayResponse>(`/api/game/${id}/play`, data),
}

export const notificationApi = {
  // GET /notification/ - получить список уведомлений
  getAll: () => api.get<UserNotification[]>('/api/notification/'),

  // PATCH /notification/{id} - переключить статус уведомления
  toggleStatus: (id: number) => api.patch<StatusResponse>(`/api/notification/${id}`),

  // PATCH /notification/all - прочитать все уведомления
  readAll: () => api.patch<StatusResponse>('/api/notification/all'),

  // GET /notification/count - получить количество уведомлений
  getCount: (status?: 'read' | 'unread') => {
    const params = status ? `?status=${status}` : ''
    return api.get<number>(`/api/notification/count${params}`)
  },

  // POST /notification/ - создать уведомление
  create: (data: NotificationCreateRequest) => api.post<StatusResponse>('/api/notification/', data),

  // DELETE /notification/{id} - удалить уведомление
  delete: (id: number) => api.delete<StatusResponse>(`/api/notification/${id}`),

  // DELETE /notification/all - удалить все уведомления
  deleteAll: () => api.delete<StatusResponse>('/api/notification/all'),
}

export const bonusApi = {
  // GET /bonus/ - получить список бонусов
  getAll: () => api.get<Bonus[]>('/api/bonus/'),

  // POST /bonus/ - создать бонус
  create: (data: BonusCreateRequest) => api.post<BonusResponse>('/api/bonus/', data),

  // DELETE /bonus/{id} - удалить бонус
  delete: (id: number) => api.delete<BonusResponse>(`/api/bonus/${id}`),

  // POST /bonus/activate - активировать бонус по промокоду
  activate: (data: BonusActivateRequest) => api.post<BonusResponse>('/api/bonus/activate', data),

  // POST /bonus/activate/{id} - активировать бонус по ID
  activateById: (id: number) => api.post<BonusResponse>(`/api/bonus/activate/${id}`, {}),
}

// Флаг для предотвращения бесконечного цикла refresh
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: string | null) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })

  failedQueue = []
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
    const originalRequest = error.config as RetryableAxiosRequestConfig

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // Если уже идет процесс обновления токена, добавляем запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await authApi.refresh()
        const newToken = data.access_token

        Cookies.set('access_token', newToken, {
          secure: true,
          sameSite: 'strict',
          expires: 1 / 24,
        })

        // Обновляем токен в заголовках оригинального запроса
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }

        processQueue(null, newToken)

        return api(originalRequest)
      } catch (refreshError) {
        // Если не удалось обновить токен, выходим из системы
        processQueue(refreshError, null)

        Cookies.remove('access_token')
        Cookies.remove('refresh_token')

        // Перенаправляем на страницу логина только если мы в браузере
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
