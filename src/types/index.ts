export interface Game {
  id: number
  title: string
  category: string
  image: string
  provider: string
  isNew?: boolean
  isHot?: boolean
  link: string
}

export interface Promotion {
  id: number
  title: string
  description: string
  image?: string
  buttonText: string
  buttonLink: string
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface Banner {
  id: number
  title: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
}

export type ThemeOption = 'default' | 'red' | 'blue' | 'green' | 'purple'

// Notification types
export interface Notification {
  id: number
  title: string
  message: string
  type: 'new_user' | 'info' | 'warning' | 'success' | 'error'
  created_at: string
}

export interface UserNotification {
  id: number
  user_id: number
  notification_id: number
  is_read: boolean
  read_at: string | null
  notification: Notification
}

export interface NotificationCreateRequest {
  title: string
  message: string
  type: 'new_user' | 'info' | 'warning' | 'success' | 'error'
}

export interface NotificationCountResponse {
  count: number
}
