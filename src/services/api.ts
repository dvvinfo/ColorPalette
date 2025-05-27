import axios from 'axios'
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    api.post<AuthResponse>('/auth/registration/', data),

  login: (data: { username: string; password: string }) =>
    api.post<AuthResponse>('/auth/login/', data),

  refresh: () => api.post<RefreshResponse>('/auth/refresh'),

  googleAuth: () => api.post<AuthResponse>('/auth/google'),

  telegramAuth: () => api.post<AuthResponse>('/auth/telegram'),

  vkAuth: () => api.post<AuthResponse>('/auth/vk'),

  googleCallback: (code: string) => api.get<AuthResponse>(`/auth/google/callback?code=${code}`),
}

export const userApi = {
  getProfile: () => api.get<User>('/user/me'),

  getAllUsers: () => api.get<User[]>('/user'),

  getUserById: (id: number) => api.get<User>(`/user/${id}`),

  updateProfile: (data: Partial<User>) => api.put<User>('/user/me', data),
}

export const balanceApi = {
  getBalance: () => api.get<{ balance: number }>('/balance/'),

  deposit: (data: { amount: number; method: string }) =>
    api.post<StatusResponse>('/balance/deposit', data),

  withdraw: (data: { amount: number; method: string }) =>
    api.post<StatusResponse>('/balance/withdraw', data),
}

export const gamesApi = {
  getAll: () => api.get<Game[]>('/game/'),

  getById: (id: number) => api.get<Game>(`/game/${id}`),

  create: (data: { name: string; chance: number; rtp: number }) => api.post<number>('/game/', data),

  update: (id: number, data: Partial<Game>) => api.put<StatusResponse>(`/game/${id}`, data),

  play: (id: number, data: { bet: number }) => api.post<GamePlayResponse>(`/game/${id}/play`, data),
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
      }
    }
    return Promise.reject(error)
  },
)

export default api
