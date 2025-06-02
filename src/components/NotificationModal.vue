<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @mousedown.self="$emit('close')"
  >
    <div
      class="bg-card-bg rounded-2xl shadow-xl w-full max-w-xl p-8 relative max-h-[80vh] overflow-hidden flex flex-col"
    >
      <button
        class="absolute top-4 right-4 text-2xl text-white/60 hover:text-primary"
        @click="$emit('close')"
      >
        &times;
      </button>

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white">{{ $t('header.notifications') }}</h2>
        <div class="flex items-center gap-2">
          <span
            v-if="notificationStore.unreadCount > 0"
            class="bg-red-500 text-white text-xs px-2 py-1 rounded-full"
          >
            {{ notificationStore.unreadCount }}
          </span>
          <button
            v-if="notificationStore.notifications.length > 0"
            @click="handleMarkAllAsRead"
            class="text-sm text-primary hover:text-primary/80 transition-colors"
            :disabled="notificationStore.loading"
          >
            {{ $t('notifications.markAllRead') }}
          </button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="notificationStore.loading" class="text-gray-400 text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p class="mt-2">{{ $t('common.loading') }}</p>
      </div>

      <!-- Error state -->
      <div v-else-if="notificationStore.error" class="text-red-400 text-center py-8">
        <p>{{ notificationStore.error }}</p>
        <button
          @click="notificationStore.fetchNotifications()"
          class="mt-2 text-primary hover:text-primary/80 underline"
        >
          {{ $t('common.retry') }}
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="notificationStore.notifications.length === 0"
        class="text-gray-400 text-center py-8"
      >
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          />
        </svg>
        <p>{{ $t('notifications.noNotifications') }}</p>
      </div>

      <!-- Notifications list -->
      <div v-else class="flex-1 overflow-y-auto space-y-4">
        <div
          v-for="notification in notificationStore.notifications"
          :key="notification.id"
          class="p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
          :class="[
            notification.is_read
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-blue-900/20 border-blue-600/30',
          ]"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                :class="notification.is_read ? 'bg-gray-500' : 'bg-blue-500'"
              ></div>
              <div class="font-bold text-white">{{ notification.notification.title }}</div>
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getTypeClass(notification.notification.type)"
              >
                {{ getTypeLabel(notification.notification.type) }}
              </span>
            </div>
            <div class="text-gray-400 text-sm flex-shrink-0">
              {{ formatDate(notification.notification.created_at) }}
            </div>
          </div>

          <div class="text-white/90 mb-3 ml-4">
            {{ notification.notification.message }}
          </div>

          <div class="flex justify-between items-center ml-4">
            <div class="text-xs text-gray-500">
              <span v-if="notification.is_read && notification.read_at">
                {{ $t('notifications.readAt') }}: {{ formatDate(notification.read_at) }}
              </span>
              <span v-else>
                {{ $t('notifications.unread') }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                @click="handleToggleStatus(notification.id)"
                class="text-sm px-3 py-1 rounded transition-colors"
                :class="
                  notification.is_read
                    ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30'
                    : 'text-green-400 hover:text-green-300 hover:bg-green-900/30'
                "
                :disabled="notificationStore.loading"
              >
                {{
                  notification.is_read
                    ? $t('notifications.markUnread')
                    : $t('notifications.markRead')
                }}
              </button>

              <button
                @click="handleDelete(notification.id)"
                class="text-gray-400 hover:text-red-500 p-1 rounded transition-colors hover:bg-red-900/30"
                :disabled="notificationStore.loading"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11 5a1 1 0 00-1 1H8a1 1 0 00-1 1v1h10V7a1 1 0 00-1-1h-2a1 1 0 00-1-1h-2zm4 6H9v6h6v-6zM9 9H7v8c0 1.1.9 2 2 2h6a2 2 0 002-2V9H9z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer actions -->
      <div
        v-if="notificationStore.notifications.length > 0"
        class="flex justify-between items-center mt-6 pt-4 border-t border-gray-700"
      >
        <div class="text-sm text-gray-400">
          {{ $t('notifications.total') }}: {{ notificationStore.notifications.length }}
          <span v-if="notificationStore.unreadCount > 0">
            ({{ $t('notifications.unread') }}: {{ notificationStore.unreadCount }})
          </span>
        </div>
        <button
          @click="handleClearAll"
          class="text-sm text-red-400 hover:text-red-300 underline transition-colors"
          :disabled="notificationStore.loading"
        >
          {{ $t('notifications.clearAll') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '@/stores/notifications'

const { t } = useI18n()
const notificationStore = useNotificationStore()

// Загружаем уведомления при монтировании компонента
onMounted(async () => {
  await notificationStore.fetchNotifications()
  await notificationStore.fetchUnreadCount()
})

// Обработчики событий
const handleToggleStatus = async (id: number) => {
  await notificationStore.toggleNotificationStatus(id)
}

const handleMarkAllAsRead = async () => {
  await notificationStore.markAllAsRead()
}

const handleDelete = async (id: number) => {
  await notificationStore.deleteNotification(id)
}

const handleClearAll = async () => {
  if (confirm(t('notifications.confirmClearAll'))) {
    await notificationStore.deleteAllNotifications()
  }
}

// Утилитарные функции
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  )
}

const getTypeClass = (type: string) => {
  const classes = {
    new_user: 'bg-green-900/50 text-green-300',
    info: 'bg-blue-900/50 text-blue-300',
    warning: 'bg-yellow-900/50 text-yellow-300',
    success: 'bg-green-900/50 text-green-300',
    error: 'bg-red-900/50 text-red-300',
  }
  return classes[type as keyof typeof classes] || 'bg-gray-900/50 text-gray-300'
}

const getTypeLabel = (type: string) => {
  const labels = {
    new_user: t('notifications.types.newUser'),
    info: t('notifications.types.info'),
    warning: t('notifications.types.warning'),
    success: t('notifications.types.success'),
    error: t('notifications.types.error'),
  }
  return labels[type as keyof typeof labels] || type
}

defineEmits<{
  close: []
}>()
</script>
