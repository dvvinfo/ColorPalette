<template>
  <div class="news-carousel">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold">Последние новости</h3>
      <router-link to="/news" class="text-primary hover:text-primary/80 text-sm font-semibold">
        Все новости →
      </router-link>
    </div>

    <div v-if="newsStore.loading" class="flex justify-center items-center h-32">
      <div class="text-sm">Загрузка новостей...</div>
    </div>

    <div v-else-if="newsStore.error" class="flex justify-center items-center h-32">
      <div class="text-red-500 text-sm">{{ newsStore.error }}</div>
    </div>

    <div v-else class="relative">
      <swiper
        :modules="[SwiperNavigation]"
        :slidesPerView="1"
        :spaceBetween="16"
        :navigation="true"
        :breakpoints="{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }"
        class="news-carousel-swiper"
      >
        <swiper-slide v-for="newsItem in newsStore.news.slice(0, 5)" :key="newsItem.id">
          <div
            class="news-card bg-card-bg rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            @click="navigateToNews(newsItem.id)"
          >
            <div class="relative h-32 overflow-hidden">
              <img :src="newsItem.image" :alt="newsItem.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-2 left-2">
                <span class="text-primary bg-white/20 px-2 py-1 rounded text-xs font-semibold">
                  НОВОСТИ
                </span>
              </div>
            </div>

            <div class="p-4">
              <div class="text-xs text-text-secondary mb-2">{{ newsItem.date }}</div>
              <h4 class="font-semibold text-sm mb-2 line-clamp-2">{{ newsItem.title }}</h4>
              <p class="text-xs text-text-secondary line-clamp-2">
                {{ truncateDescription(newsItem.description, 80) }}
              </p>
              <button class="text-primary text-xs font-semibold mt-2 hover:text-primary/80">
                Читать далее →
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useNewsStore } from '@/stores/news'

const SwiperNavigation = Navigation
const router = useRouter()
const newsStore = useNewsStore()

// Загружаем новости при монтировании компонента
onMounted(() => {
  if (newsStore.news.length === 0) {
    newsStore.fetchAllNews()
  }
})

// Функция для навигации к странице новости
const navigateToNews = (newsId: number) => {
  router.push(`/news/${newsId}`)
}

// Функция для обрезания описания
const truncateDescription = (description: string, maxLength: number = 80) => {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength) + '...'
}
</script>

<style scoped>
.news-carousel-swiper :deep(.swiper-button-next),
.news-carousel-swiper :deep(.swiper-button-prev) {
  color: var(--primary);
  background-color: rgba(255, 255, 255, 0.9);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-carousel-swiper :deep(.swiper-button-next)::after,
.news-carousel-swiper :deep(.swiper-button-prev)::after {
  font-size: 12px;
  font-weight: bold;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
