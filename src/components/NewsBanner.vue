<template>
  <div class="relative mt-4 overflow-hidden rounded-lg">
    <div
      v-if="newsStore.loading"
      class="flex justify-center items-center h-[200px] md:h-[300px] bg-card-bg rounded-lg"
    >
      <div class="text-lg">Загрузка новостей...</div>
    </div>

    <div
      v-else-if="newsStore.error"
      class="flex justify-center items-center h-[200px] md:h-[300px] bg-card-bg rounded-lg"
    >
      <div class="text-red-500 text-lg">{{ newsStore.error }}</div>
    </div>

    <!-- News Banner Slider -->
    <div v-else class="relative">
      <swiper
        :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
        :slidesPerView="1"
        :loop="true"
        :autoplay="{
          delay: 6000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        class="news-banner-swiper rounded-lg overflow-hidden"
      >
        <swiper-slide v-for="newsItem in newsStore.news" :key="newsItem.id">
          <div
            class="news-banner-slide relative h-[200px] md:h-[300px] bg-cover bg-center flex items-center before:content-[''] before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-secondary/80 before:to-primary/80 before:bg-black/30 cursor-pointer"
            :style="{ backgroundImage: `url(${newsItem.image})` }"
            @click="navigateToNews(newsItem.id)"
          >
            <div class="relative z-10 p-6 md:p-10 max-w-2xl">
              <div class="flex items-center gap-2 mb-2">
                <!-- <span class="text-primary bg-white/20 px-2 py-1 rounded text-sm font-semibold">
                  НОВОСТИ
                </span> -->
                <span class="text-white/80 text-sm">{{ newsItem.date }}</span>
              </div>
              <h2 class="text-2xl md:text-4xl font-bold mb-3 text-white">{{ newsItem.title }}</h2>
              <p class="text-white/80 mb-5 line-clamp-2">
                {{ truncateDescription(newsItem.description) }}
              </p>
              <button
                @click.stop="navigateToNews(newsItem.id)"
                class="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition-all font-semibold"
              >
                Читать далее
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
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNewsStore } from '@/stores/news'

// Import modules for Swiper
const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination
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
const truncateDescription = (description: string, maxLength: number = 150) => {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength) + '...'
}
</script>

<style scoped>
.news-banner-swiper :deep(.swiper-pagination-bullet) {
  background-color: white;
  opacity: 0.5;
}

.news-banner-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: var(--primary);
  opacity: 1;
}

.news-banner-swiper :deep(.swiper-button-next),
.news-banner-swiper :deep(.swiper-button-prev) {
  color: var(--primary);
  background-color: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.news-banner-swiper :deep(.swiper-button-next)::after,
.news-banner-swiper :deep(.swiper-button-prev)::after {
  font-size: 16px;
  font-weight: bold;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-banner-slide {
  transition: transform 0.3s ease;
}

.news-banner-slide:hover {
  transform: scale(1.02);
}
</style>
