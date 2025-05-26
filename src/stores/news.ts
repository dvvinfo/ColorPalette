import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Интерфейс для новости
export interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  date: string
  link: string
}

export const useNewsStore = defineStore('news', () => {
  // Состояние
  const news = ref<NewsItem[]>([])
  const loading = ref(false)
  const error = ref('')

  // Моковые данные
  const mockNewsData: NewsItem[] = [
    {
      id: 1,
      title: 'Бонусы и акции',
      description:
        'Уже скоро начнется грандиозный розыгрыш призов. Участвуйте в розыгрыше и выигрывайте призы! Не упустите свой шанс стать победителем и получить крупный выигрыш.',
      image: '/images/banners/1502x444_newsweb-4.webp',
      date: '20 мая 2025',
      link: '/news/1',
    },
    {
      id: 2,
      title: 'Новые игры',
      description:
        'Познакомьтесь с новыми захватывающими играми в нашем казино. Попробуйте свою удачу в слотах с прогрессивными джекпотами и уникальными бонусными раундами.',
      image: '/images/banners/playstation-g5038a4164_1280.jpg',
      date: '18 мая 2025',
      link: '/news/2',
    },
    {
      id: 3,
      title: 'Турнир по слотам',
      description:
        'Участвуйте в еженедельном турнире по слотам и выигрывайте крупные призы! Соревнуйтесь с другими игроками за звание лучшего и получите эксклюзивные награды.',
      image: '/images/banners/1502x444_newsweb-4.webp',
      date: '15 мая 2025',
      link: '/news/3',
    },
    {
      id: 4,
      title: 'Обновление платформы',
      description:
        'Мы улучшили нашу платформу для более комфортной игры. Узнайте о новых функциях, улучшенном интерфейсе и повышенной безопасности вашего аккаунта.',
      image: '/images/banners/playstation-g5038a4164_1280.jpg',
      date: '12 мая 2025',
      link: '/news/4',
    },
    {
      id: 5,
      title: 'Программа лояльности',
      description:
        'Новая программа лояльности с еще большими преимуществами для наших постоянных игроков. Получайте очки за каждую игру и обменивайте их на ценные призы.',
      image: '/images/banners/1502x444_newsweb-4.webp',
      date: '10 мая 2025',
      link: '/news/5',
    },
  ]

  // Геттеры
  const getNewsById = computed(() => {
    return (id: number | string) => {
      const numId = typeof id === 'string' ? parseInt(id) : id
      return news.value.find((item) => item.id === numId)
    }
  })

  // Действия
  const fetchAllNews = async () => {
    try {
      loading.value = true
      error.value = ''

      // Эмуляция задержки сети
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 1000))

      // Эмуляция случайной ошибки (5% вероятность)
      if (Math.random() < 0.05) {
        throw new Error('Ошибка загрузки новостей')
      }

      news.value = [...mockNewsData]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке новостей'
    } finally {
      loading.value = false
    }
  }

  const fetchNewsById = async (id: number | string) => {
    try {
      loading.value = true
      error.value = ''

      // Эмуляция задержки сети
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 500))

      // Эмуляция случайной ошибки (5% вероятность)
      if (Math.random() < 0.05) {
        throw new Error('Ошибка загрузки новости')
      }

      const numId = typeof id === 'string' ? parseInt(id) : id
      const newsItem = mockNewsData.find((item) => item.id === numId)

      if (!newsItem) {
        throw new Error('Новость не найдена')
      }

      // Если новости еще не загружены, загружаем все
      if (news.value.length === 0) {
        news.value = [...mockNewsData]
      }

      return newsItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке новости'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // Состояние
    news,
    loading,
    error,

    // Геттеры
    getNewsById,

    // Действия
    fetchAllNews,
    fetchNewsById,
  }
})
