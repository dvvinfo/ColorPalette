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
