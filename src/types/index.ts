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

// Bonus types
export interface Bonus {
  id: number
  title: string
  description: string
  type: 'welcome' | 'promo' | 'cashback'
  reward: string
  wager_multiplier: number
  is_active: boolean
  status: string
  participants_count: number
  total_reward: number
  promo_code: string | null
  max_activations: number | null
  activated_count: number
  start_date: string
  end_date: string | null
}

export interface BonusCreateRequest {
  title: string
  description: string
  type: 'welcome' | 'promo' | 'cashback'
  reward: string
  wager_multiplier: number
  promo_code?: string
  max_activations?: number
  start_date: string
  end_date?: string
}

export interface BonusActivateRequest {
  promo_code: string
}

export interface BonusResponse {
  message: string
}

// Bet History types
export interface BetHistoryGame {
  id: number
  name: string
}

export interface BetHistoryRecord {
  id: number
  game_id: number
  user_id: number
  bet: number
  win_ammount: number
  result: 'win' | 'lose'
  created_at: string
  game: BetHistoryGame
}

export interface BetHistoryResponse {
  pages: number
  page: number
  data: BetHistoryRecord[]
}
