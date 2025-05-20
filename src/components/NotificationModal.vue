<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @mousedown.self="$emit('close')"
  >
    <div class="bg-card-bg rounded-2xl shadow-xl w-full max-w-xl p-8 relative">
      <button
        class="absolute top-4 right-4 text-2xl text-white/60 hover:text-primary"
        @click="$emit('close')"
      >
        &times;
      </button>
      <h2 class="text-2xl font-bold mb-6 text-white">Уведомления</h2>
      <div v-if="notifications.length === 0" class="text-gray-400 text-center py-8">
        Нет новых уведомлений
      </div>
      <div v-for="note in notifications" :key="note.id" class="mb-8 last:mb-0">
        <div class="flex justify-between items-center mb-2">
          <div class="font-bold text-white">{{ note.title }}</div>
          <div class="text-gray-400 text-sm">{{ note.date }}</div>
        </div>
        <div class="text-white mb-2" v-html="note.text"></div>
        <div class="flex justify-end">
          <button class="text-gray-400 hover:text-red-500" @click="$emit('delete', note.id)">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 5a1 1 0 00-1 1H8a1 1 0 00-1 1v1h10V7a1 1 0 00-1-1h-2a1 1 0 00-1-1h-2zm4 6H9v6h6v-6zM9 9H7v8c0 1.1.9 2 2 2h6a2 2 0 002-2V9H9z"
                fill="#fff"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex justify-end items-center mt-8 text-sm">
        <a href="#" class="text-primary underline" @click.prevent="$emit('clearAll')"
          >Очистить все уведомления</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  notifications: {
    id: number | string
    title: string
    date: string
    text: string
  }[]
}>()
</script>
