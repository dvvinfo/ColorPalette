<template>
  <div class="relative mt-4 overflow-hidden rounded-lg">
    <!-- Banner Slider -->
    <div class="relative">
      <swiper
        :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
        :slidesPerView="1"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        class="banner-swiper rounded-lg overflow-hidden"
      >
        <swiper-slide v-for="banner in banners" :key="banner.id">
          <div
            class="banner-slide relative h-[200px] md:h-[300px] bg-cover bg-center flex items-center before:content-[''] before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-secondary/80 before:to-primary/80 before:bg-black/30"
            :style="{ backgroundImage: `url(${banner.image})` }"
          >
            <div class="relative z-10 p-6 md:p-10 max-w-md">
              <h2 class="text-2xl md:text-4xl font-bold mb-3 text-white">{{ banner.title }}</h2>
              <p class="text-white/80 mb-5">{{ banner.description }}</p>
              <button
                class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-all"
              >
                {{ banner.buttonText }}
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { banners } from '../assets/mock/promotions'

// Import modules for Swiper
const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination
const SwiperNavigation = Navigation
</script>

<style scoped>
.banner-swiper :deep(.swiper-pagination-bullet) {
  background-color: white;
  opacity: 0.5;
}

.banner-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: var(--primary);
  opacity: 1;
}

.banner-swiper :deep(.swiper-button-next),
.banner-swiper :deep(.swiper-button-prev) {
  color: var(--primary);
  background-color: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-swiper :deep(.swiper-button-next)::after,
.banner-swiper :deep(.swiper-button-prev)::after {
  font-size: 16px;
  font-weight: bold;
}
</style>
