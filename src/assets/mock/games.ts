import type { Game, Category } from '../../types'
import { useI18n } from 'vue-i18n'

// Функция для получения переведенных игр
export function getGames(): Game[] {
  const { t } = useI18n()

  return [
    {
      id: 2,
      title: t('navigation.roulette'),
      category: 'roulette',
      image: '/images/games/2.png',
      provider: t('header.casino'),
      isHot: true,
      link: '/games/roulette',
    },
    {
      id: 3,
      title: t('navigation.blackjack'),
      category: 'blackjack',
      image: '/images/games/3.png',
      provider: t('header.casino'),
      isHot: true,
      link: '/games/blackjack',
    },
    {
      id: 5,
      title: t('navigation.dice'),
      category: 'dice',
      image: '/images/games/5.png',
      provider: t('header.casino'),
      isHot: true,
      link: '/games/dice',
    },
  ]
}

export function getNewGames(): Game[] {
  const { t } = useI18n()

  return [
    {
      id: 3,
      title: t('navigation.blackjack'),
      category: 'blackjack',
      image: '/images/games/3.png',
      provider: t('header.casino'),
      isNew: true,
      link: '/games/blackjack',
    },
    {
      id: 4,
      title: t('navigation.wheel'),
      category: 'wheel',
      image: '/images/games/4.png',
      provider: t('header.casino'),
      isNew: true,
      link: '/games/wheel',
    },
    {
      id: 5,
      title: t('navigation.dice'),
      category: 'dice',
      image: '/images/games/5.png',
      provider: t('header.casino'),
      isNew: true,
      link: '/games/dice',
    },
  ]
}

export function getCategories(): Category[] {
  const { t } = useI18n()

  return [
    { id: 'all', name: t('games.allGames'), icon: 'game-controller' },
    { id: 'slots', name: t('navigation.slots'), icon: 'view-grid' },
    { id: 'roulette', name: t('navigation.roulette'), icon: 'view-grid' },
    { id: 'blackjack', name: t('navigation.blackjack'), icon: 'view-grid' },
    { id: 'wheel', name: t('navigation.wheel'), icon: 'view-grid' },
    { id: 'dice', name: t('navigation.dice'), icon: 'view-grid' },
  ]
}

// Статические экспорты для обратной совместимости
export const games: Game[] = [
  {
    id: 2,
    title: 'Рулетка',
    category: 'roulette',
    image: '/images/games/2.png',
    provider: 'Казино',
    isHot: true,
    link: '/games/roulette',
  },
  {
    id: 3,
    title: 'Блэкджек',
    category: 'blackjack',
    image: '/images/games/3.png',
    provider: 'Казино',
    isHot: true,
    link: '/games/blackjack',
  },
  {
    id: 5,
    title: 'Кости',
    category: 'dice',
    image: '/images/games/5.png',
    provider: 'Казино',
    isHot: true,
    link: '/games/dice',
  },
]

export const newGames: Game[] = [
  {
    id: 3,
    title: 'Блэкджек',
    category: 'blackjack',
    image: '/images/games/3.png',
    provider: 'Казино',
    isNew: true,
    link: '/games/blackjack',
  },
  {
    id: 4,
    title: 'Колесо Фортуны',
    category: 'wheel',
    image: '/images/games/4.png',
    provider: 'Казино',
    isNew: true,
    link: '/games/wheel',
  },
  {
    id: 5,
    title: 'Кости',
    category: 'dice',
    image: '/images/games/5.png',
    provider: 'Казино',
    isNew: true,
    link: '/games/dice',
  },
]

export const categories: Category[] = [
  { id: 'all', name: 'Все игры', icon: 'game-controller' },
  { id: 'slots', name: 'Слоты', icon: 'view-grid' },
  { id: 'roulette', name: 'Рулетка', icon: 'view-grid' },
  { id: 'blackjack', name: 'Блэкджек', icon: 'view-grid' },
  { id: 'wheel', name: 'Колесо Фортуны', icon: 'view-grid' },
  { id: 'dice', name: 'Кости', icon: 'view-grid' },
]
