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
      <h2 class="text-2xl font-bold mb-6 text-white">Входящие сообщения</h2>
      <div
        v-if="props.messages.length === 0 || unreadMessages.length === 0"
        class="text-gray-400 text-center py-8"
      >
        Нет новых сообщений
      </div>
      <div v-else>
        <div v-for="msg in unreadMessages" :key="msg.id" class="mb-8 last:mb-0">
          <div class="flex justify-between items-center mb-2">
            <div class="font-bold text-white">{{ msg.title }}</div>
            <div class="text-gray-400 text-sm">{{ msg.date }}</div>
          </div>
          <div class="text-white mb-2" v-html="msg.text"></div>
          <button class="text-gray-400 hover:text-red-500" @click="$emit('delete', msg.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center mt-8 text-sm">
        <a href="#" class="text-primary underline" @click.prevent="$emit('markAllRead')"
          >Отметить все сообщения как прочитанные</a
        >
        <a href="#" class="text-gray-400 hover:text-primary flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Включить push-уведомления
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  messages: {
    id: number | string
    title: string
    date: string
    text: string
    read?: boolean
  }[]
}>()

const unreadMessages = computed(() => props.messages.filter((m) => !m.read))
</script>
