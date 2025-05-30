<template>
  <div class="min-h-screen bg-background w-full">
    <div v-if="newsStore.loading" class="flex justify-center items-center h-64">
      <div class="text-lg">{{ $t('news.loadingNews') }}</div>
    </div>

    <div v-else-if="newsStore.error" class="flex justify-center items-center h-64">
      <div class="text-red-500 text-lg">{{ newsStore.error }}</div>
    </div>

    <div v-else class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4 flex flex-col gap-6">
        <!-- Back Button -->
        <BackButton />

        <AppNews
          v-for="newsItem in newsStore.news"
          :key="newsItem.id"
          :title="newsItem.title"
          :description="newsItem.description"
          :image="newsItem.image"
          :date="newsItem.date"
          :link="newsItem.link"
        />
      </div>

      <div class="w-full md:w-1/4">
        <!-- Jackpot Counter -->
        <JackpotCounter class="mb-8" />
        <BonusCard :title="$t('bonus.title')" amount="1000" :time="10000" class="mb-8" />
        <!-- Promotions Side Panel -->
        <PromotionPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppNews from '@/components/AppNews.vue'
import JackpotCounter from '@/components/JackpotCounter.vue'
import BonusCard from '@/components/BonusCard.vue'
import PromotionPanel from '@/components/PromotionPanel.vue'
import BackButton from '@/components/BackButton.vue'
import { useNewsStore } from '@/stores/news'

const newsStore = useNewsStore()

// Загружаем данные при монтировании компонента
onMounted(() => {
  newsStore.fetchAllNews()
})
</script>

<style scoped></style>
