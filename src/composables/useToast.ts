import { ref } from 'vue'

export interface ToastItem {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  show?: boolean
}

const toasts = ref<ToastItem[]>([])
const timeouts = new Map<string, number>()

const addToast = (toast: Omit<ToastItem, 'id' | 'show'>) => {
  const id = Math.random().toString(36).substr(2, 9)
  const newToast: ToastItem = {
    ...toast,
    id,
    show: false,
    duration: toast.duration || 5000,
  }

  toasts.value.push(newToast)

  // Показываем toast с небольшой задержкой для анимации
  setTimeout(() => {
    const toastIndex = toasts.value.findIndex((t) => t.id === id)
    if (toastIndex !== -1) {
      toasts.value[toastIndex].show = true
    }
  }, 100)

  // Автоматически удаляем toast
  const timeout = setTimeout(() => {
    removeToast(id)
  }, newToast.duration)

  timeouts.set(id, timeout)
  return id
}

const removeToast = (id: string) => {
  const toastIndex = toasts.value.findIndex((t) => t.id === id)
  if (toastIndex !== -1) {
    // Скрываем toast
    toasts.value[toastIndex].show = false

    // Удаляем из массива через 300ms (время анимации)
    setTimeout(() => {
      const currentIndex = toasts.value.findIndex((t) => t.id === id)
      if (currentIndex !== -1) {
        toasts.value.splice(currentIndex, 1)
      }
    }, 300)
  }

  // Очищаем timeout
  const timeout = timeouts.get(id)
  if (timeout) {
    clearTimeout(timeout)
    timeouts.delete(id)
  }
}

export const useToast = () => {
  const showSuccess = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'success', title, message, duration })
  }

  const showError = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'error', title, message, duration })
  }

  const showWarning = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'warning', title, message, duration })
  }

  const showInfo = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'info', title, message, duration })
  }

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
