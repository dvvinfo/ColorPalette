import type { Game, Category } from '../../types'

export const games: Game[] = [
  // {
  //   id: 1,
  //   title: 'Слоты',
  //   category: 'slots',
  //   image: '/images/games/1.png',
  //   provider: 'Казино',
  //   isHot: true,
  //   link: '/games/slots',
  // },
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
  // {
  //   id: 4,
  //   title: 'Колесо Фортуны',
  //   category: 'wheel',
  //   image: '/images/games/4.png',
  //   provider: 'Казино',
  //   isHot: true,
  //   link: '/games/wheel',
  // },
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
