import { useI18n } from 'vue-i18n'

export interface GameConfig {
  id: number
  nameKey: string
  chance: number
  rtp: number
  route: string
}

// Функция для получения названия игры с переводом
export function getGameName(route: string): string {
  const { t } = useI18n()
  return t(`navigation.${route}`)
}

// Статическое использование для случаев, когда нужна базовая конфигурация
export const GAME_CONFIGS: GameConfig[] = [
  {
    id: 1,
    nameKey: 'navigation.roulette',
    chance: 0.1,
    rtp: 15,
    route: 'roulette',
  },
  {
    id: 2,
    nameKey: 'navigation.slots',
    chance: 0.1,
    rtp: 15,
    route: 'slots',
  },
  {
    id: 3,
    nameKey: 'navigation.blackjack',
    chance: 0.1,
    rtp: 15,
    route: 'blackjack',
  },
  {
    id: 4,
    nameKey: 'navigation.wheel',
    chance: 0.1,
    rtp: 15,
    route: 'wheel',
  },
  {
    id: 5,
    nameKey: 'navigation.dice',
    chance: 0.1,
    rtp: 15,
    route: 'dice',
  },
  {
    id: 6,
    nameKey: 'navigation.crash',
    chance: 0.1,
    rtp: 15,
    route: 'crash',
  },
  {
    id: 7,
    nameKey: 'navigation.coinFlip',
    chance: 0.1,
    rtp: 15,
    route: 'coin-flip',
  },
  {
    id: 8,
    nameKey: 'navigation.slotMachine',
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
