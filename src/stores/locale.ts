import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

type Locale = 'ru' | 'en'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref<Locale>(i18n.global.locale.value as Locale)

  const supportedLocales = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ] as const

  function setLocale(locale: string) {
    if (supportedLocales.some((l) => l.code === locale)) {
      const typedLocale = locale as Locale
      currentLocale.value = typedLocale
      i18n.global.locale.value = typedLocale
      localStorage.setItem('locale', locale)

      // Обновляем язык в HTML
      document.documentElement.lang = locale
    }
  }

  function toggleLocale() {
    const newLocale: Locale = currentLocale.value === 'ru' ? 'en' : 'ru'
    setLocale(newLocale)
  }

  function getCurrentLocaleData() {
    return supportedLocales.find((l) => l.code === currentLocale.value)
  }

  return {
    currentLocale,
    supportedLocales,
    setLocale,
    toggleLocale,
    getCurrentLocaleData,
  }
})
