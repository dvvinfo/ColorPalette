export interface GameConfig {
  id: number
  name: string
  chance: number
  rtp: number
  route: string
}

export const GAME_CONFIGS: GameConfig[] = [
  {
    id: 1,
    name: 'Рулетка',
    chance: 0.1,
    rtp: 15,
    route: 'roulette',
  },
  {
    id: 2,
    name: 'Слоты',
    chance: 0.1,
    rtp: 15,
    route: 'slots',
  },
  {
    id: 3,
    name: 'Блэкджек',
    chance: 0.1,
    rtp: 15,
    route: 'blackjack',
  },
  {
    id: 4,
    name: 'Колесо Фортуны',
    chance: 0.1,
    rtp: 15,
    route: 'wheel',
  },
  {
    id: 5,
    name: 'Кости',
    chance: 0.1,
    rtp: 15,
    route: 'dice',
  },
  {
    id: 6,
    name: 'Краш',
    chance: 0.1,
    rtp: 15,
    route: 'crash',
  },
  {
    id: 7,
    name: 'Орёл и Решка',
    chance: 0.1,
    rtp: 15,
    route: 'coin-flip',
  },
  {
    id: 8,
    name: 'Слот машина',
    chance: 0.1,
    rtp: 15,
    route: 'slot-machine',
  },
]

export function getGameConfigByRoute(route: string): GameConfig | undefined {
  return GAME_CONFIGS.find((config) => config.route === route)
}

export function getGameConfigById(id: number): GameConfig | undefined {
  return GAME_CONFIGS.find((config) => config.id === id)
}
