<template>
  <div class="min-h-screen bg-background w-full">
    <div v-if="newsStore.loading" class="flex justify-center items-center h-64">
      <div class="text-lg">Загрузка новости...</div>
    </div>

    <div v-else-if="newsStore.error" class="flex justify-center items-center h-64">
      <div class="text-red-500 text-lg">{{ newsStore.error }}</div>
    </div>

    <div v-else-if="!newsItem" class="flex justify-center items-center h-64">
      <div class="text-lg">Новость не найдена</div>
    </div>

    <div v-else class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4 flex flex-col gap-6">
        <BackButton />

        <AppNews
          :title="newsItem.title"
          :description="newsItem.description"
          :image="newsItem.image"
          :date="newsItem.date"
        />
      </div>

      <RightSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppNews from '@/components/AppNews.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import BackButton from '@/components/BackButton.vue'
import { useNewsStore } from '@/stores/news'
import type { NewsItem } from '@/stores/news'

const route = useRoute()
const id = route.params.id
const newsStore = useNewsStore()
const newsItem = ref<NewsItem | null>(null)

onMounted(async () => {
  try {
    const item = await newsStore.fetchNewsById(id as string)
    newsItem.value = item
  } catch (err) {
    // Ошибка уже обработана в store
    console.error('Ошибка загрузки новости:', err)
  }
})
</script>

<style scoped>
.news-detail {
  padding: 20px;
}
</style>
