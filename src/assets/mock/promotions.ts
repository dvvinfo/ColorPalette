import type { Promotion, Banner } from '../../types'

export const promotions: Promotion[] = [
  {
    id: 1,
    title: 'Получи бонус!',
    description: 'Получите 50000₽ на первый депозит',
    buttonText: 'Начать игру',
    buttonLink: '/in-development',
  },
]

export const banners: Banner[] = [
  {
    id: 1,
    title: 'Вытрясй свой бонус в приложении клуба!',
    description: 'Получите эксклюзивные бонусы и играйте на любом устройстве',
    image: '/images/banners/playstation-g5038a4164_1280.jpg',
    buttonText: 'Подробнее',
    buttonLink: '/in-development',
  },

  {
    id: 2,
    title: 'Чемпионат по хоккею',
    description: 'Делайте ставки на главные матчи сезона и увеличивайте свои выигрыши',
    image: '/images/banners/fortnite-g0a85e8283_1280.jpg',
    buttonText: 'Играть',
    buttonLink: '/in-development',
  },
]
