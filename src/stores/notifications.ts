import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { notificationApi } from '@/services/api'
import type { UserNotification, NotificationCreateRequest } from '@/types'

export const useNotificationStore = defineStore('notifications', () => {
  // Состояние
  const notifications = ref<UserNotification[]>([])
  const loading = ref(false)
  const error = ref('')
  const unreadCount = ref(0)

  // Геттеры
  const unreadNotifications = computed(() => notifications.value.filter((n) => !n.is_read))

  const readNotifications = computed(() => notifications.value.filter((n) => n.is_read))

  const getNotificationById = computed(() => {
    return (id: number) => notifications.value.find((n) => n.id === id)
  })

  // Действия
  const fetchNotifications = async () => {
    try {
      loading.value = true
      error.value = ''

      const response = await notificationApi.getAll()
      notifications.value = response.data
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при загрузке уведомлений'
      error.value = errorMessage
      console.error('Ошибка при загрузке уведомлений:', err)
    } finally {
      loading.value = false
    }
  }

  const toggleNotificationStatus = async (id: number) => {
    try {
      loading.value = true
      error.value = ''

      await notificationApi.toggleStatus(id)

      // Обновляем локальное состояние
      const notification = notifications.value.find((n) => n.id === id)
      if (notification) {
        notification.is_read = !notification.is_read
        notification.read_at = notification.is_read ? new Date().toISOString() : null
      }

      // Обновляем счетчик непрочитанных
      await fetchUnreadCount()
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка при обновлении статуса уведомления'
      error.value = errorMessage
      console.error('Ошибка при обновлении статуса уведомления:', err)
    } finally {
      loading.value = false
    }
  }

  const markAllAsRead = async () => {
    try {
      loading.value = true
      error.value = ''

      await notificationApi.readAll()

      // Обновляем локальное состояние
      notifications.value.forEach((notification) => {
        if (!notification.is_read) {
          notification.is_read = true
          notification.read_at = new Date().toISOString()
        }
      })

      unreadCount.value = 0
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка при отметке всех уведомлений как прочитанных'
      error.value = errorMessage
      console.error('Ошибка при отметке всех уведомлений как прочитанных:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationApi.getCount('unread')
      unreadCount.value = response.data
    } catch (err: unknown) {
      console.error('Ошибка при получении количества непрочитанных уведомлений:', err)
    }
  }

  const createNotification = async (data: NotificationCreateRequest) => {
    try {
      loading.value = true
      error.value = ''

      await notificationApi.create(data)

      // Перезагружаем уведомления после создания
      await fetchNotifications()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при создании уведомления'
      error.value = errorMessage
      console.error('Ошибка при создании уведомления:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteNotification = async (id: number) => {
    try {
      loading.value = true
      error.value = ''

      await notificationApi.delete(id)

      // Удаляем из локального состояния
      const index = notifications.value.findIndex((n) => n.id === id)
      if (index !== -1) {
        notifications.value.splice(index, 1)
      }

      // Обновляем счетчик непрочитанных
      await fetchUnreadCount()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при удалении уведомления'
      error.value = errorMessage
      console.error('Ошибка при удалении уведомления:', err)
    } finally {
      loading.value = false
    }
  }

  const deleteAllNotifications = async () => {
    try {
      loading.value = true
      error.value = ''

      await notificationApi.deleteAll()

      // Очищаем локальное состояние
      notifications.value = []
      unreadCount.value = 0
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка при удалении всех уведомлений'
      error.value = errorMessage
      console.error('Ошибка при удалении всех уведомлений:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    // Состояние
    notifications,
    loading,
    error,
    unreadCount,

    // Геттеры
    unreadNotifications,
    readNotifications,
    getNotificationById,

    // Действия
    fetchNotifications,
    toggleNotificationStatus,
    markAllAsRead,
    fetchUnreadCount,
    createNotification,
    deleteNotification,
    deleteAllNotifications,
  }
})
