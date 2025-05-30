import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ru from '../locales/ru.json'

const messages = {
  en,
  ru,
}

// Получаем язык из localStorage или используем русский по умолчанию
const getDefaultLocale = (): string => {
  const saved = localStorage.getItem('locale')
  if (saved && ['en', 'ru'].includes(saved)) {
    return saved
  }
  // Пытаемся определить язык браузера
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('en')) {
    return 'en'
  }
  return 'ru' // По умолчанию русский
}

export const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'ru',
  messages,
  globalInjection: true,
})

export default i18n
