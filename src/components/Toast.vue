<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-3">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center gap-3 min-w-80 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        :class="[
          getToastClasses(toast.type),
          toast.show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
        ]"
      >
        <!-- Иконка -->
        <div class="flex-shrink-0">
          <svg
            v-if="toast.type === 'success'"
            class="w-6 h-6 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'error'"
            class="w-6 h-6 text-red-400"
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
          <svg
            v-else-if="toast.type === 'warning'"
            class="w-6 h-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <!-- Контент -->
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-white">{{ toast.title }}</div>
          <div v-if="toast.message" class="text-sm text-white/80 mt-1">
            {{ toast.message }}
          </div>
        </div>

        <!-- Кнопка закрытия -->
        <button
          @click="removeToast(toast.id)"
          class="flex-shrink-0 text-white/60 hover:text-white transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

defineOptions({
  name: 'ToastNotification',
})

const { toasts, removeToast } = useToast()

const getToastClasses = (type: string) => {
  const classes = {
    success: 'bg-green-600/90 border border-green-500/50',
    error: 'bg-red-600/90 border border-red-500/50',
    warning: 'bg-yellow-600/90 border border-yellow-500/50',
    info: 'bg-blue-600/90 border border-blue-500/50',
  }
  return classes[type as keyof typeof classes] || classes.info
}
</script>

<style scoped>
/* Дополнительные стили для анимации уже в классах */
</style>
