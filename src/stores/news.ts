import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

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
  const { t } = useI18n()

  // Состояние
  const news = ref<NewsItem[]>([])
  const loading = ref(false)
  const error = ref('')

  // Моковые данные с переводами
  const getMockNewsData = (): NewsItem[] => [
    {
      id: 1,
      title: t('news.mockData.bonuses.title'),
      description: t('news.mockData.bonuses.description'),
      image: '/images/banners/1502x444_newsweb-4.webp',
      date: t('news.mockData.bonuses.date'),
      link: '/news/1',
    },
    {
      id: 2,
      title: t('news.mockData.newGames.title'),
      description: t('news.mockData.newGames.description'),
      image: '/images/banners/playstation-g5038a4164_1280.jpg',
      date: t('news.mockData.newGames.date'),
      link: '/news/2',
    },
    {
      id: 3,
      title: t('news.mockData.tournament.title'),
      description: t('news.mockData.tournament.description'),
      image: '/images/banners/1502x444_newsweb-4.webp',
      date: t('news.mockData.tournament.date'),
      link: '/news/3',
    },
    {
      id: 4,
      title: t('news.mockData.platformUpdate.title'),
      description: t('news.mockData.platformUpdate.description'),
      image: '/images/banners/playstation-g5038a4164_1280.jpg',
      date: t('news.mockData.platformUpdate.date'),
      link: '/news/4',
    },
    {
      id: 5,
      title: t('news.mockData.loyalty.title'),
      description: t('news.mockData.loyalty.description'),
      image: '/images/banners/1502x444_newsweb-4.webp',
      date: t('news.mockData.loyalty.date'),
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
        throw new Error(t('news.errors.loadingError'))
      }

      news.value = [...getMockNewsData()]
    } catch (err) {
      error.value = err instanceof Error ? err.message : t('news.errors.generalError')
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
        throw new Error(t('news.errors.loadingError'))
      }

      const numId = typeof id === 'string' ? parseInt(id) : id
      const mockNewsData = getMockNewsData()
      const newsItem = mockNewsData.find((item) => item.id === numId)

      if (!newsItem) {
        throw new Error(t('news.newsNotFound'))
      }

      // Если новости еще не загружены, загружаем все
      if (news.value.length === 0) {
        news.value = [...mockNewsData]
      }

      return newsItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : t('news.errors.generalError')
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
