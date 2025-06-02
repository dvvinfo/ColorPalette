# Система уведомлений

Добавлена полная система уведомлений с интеграцией к бэкенд API.

## Добавленные файлы и изменения

### 1. Типы (`src/types/index.ts`)

Добавлены типы для работы с уведомлениями:

- `Notification` - базовая структура уведомления
- `UserNotification` - уведомление пользователя с статусом прочитано/непрочитано
- `NotificationCreateRequest` - запрос на создание уведомления
- `NotificationCountResponse` - ответ с количеством уведомлений

### 2. API (`src/services/api.ts`)

Добавлен `notificationApi` с методами:

- `getAll()` - получить все уведомления (GET /api/notification/)
- `toggleStatus(id)` - переключить статус прочитано/непрочитано (PATCH /api/notification/{id})
- `readAll()` - отметить все как прочитанные (PATCH /api/notification/all)
- `getCount(status?)` - получить количество уведомлений (GET /api/notification/count)
- `create(data)` - создать новое уведомление (POST /api/notification/)
- `delete(id)` - удалить уведомление (DELETE /api/notification/{id})
- `deleteAll()` - удалить все уведомления (DELETE /api/notification/all)

### 3. Store (`src/stores/notifications.ts`)

Создан Pinia store с функциональностью:

- Управление состоянием уведомлений
- Загрузка и обновление уведомлений
- Отметка как прочитанные/непрочитанные
- Создание и удаление уведомлений
- Подсчет непрочитанных уведомлений

### 4. Компонент (`src/components/NotificationModal.vue`)

Полностью переработан компонент модального окна уведомлений:

- Интеграция с реальным API через store
- Отображение статуса прочитано/непрочитано
- Возможность отметить отдельные уведомления или все сразу
- Удаление уведомлений
- Показ типов уведомлений с цветовым кодированием
- Состояния загрузки и ошибок

### 5. Локализация (`src/locales/`)

Добавлены переводы на русский и английский языки:

- Новые ключи в разделе `notifications`
- Переводы для типов уведомлений
- Дополнительные тексты интерфейса

## Типы уведомлений

Поддерживаются следующие типы уведомлений:

- `new_user` - новый пользователь зарегистрирован
- `info` - информационное уведомление
- `warning` - предупреждение
- `success` - успешная операция
- `error` - ошибка

## Использование

### В компоненте:

```javascript
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()

// Загрузить уведомления
await notificationStore.fetchNotifications()

// Создать уведомление
await notificationStore.createNotification({
  title: 'Заголовок',
  message: 'Текст уведомления',
  type: 'info',
})

// Отметить как прочитанное
await notificationStore.toggleNotificationStatus(notificationId)
```

### API эндпоинты:

- `GET /api/notification/` - список уведомлений
- `PATCH /api/notification/{id}` - переключить статус
- `PATCH /api/notification/all` - прочитать все
- `GET /api/notification/count?status=unread` - количество непрочитанных
- `POST /api/notification/` - создать уведомление
- `DELETE /api/notification/{id}` - удалить уведомление
- `DELETE /api/notification/all` - удалить все

## Особенности

1. **Автоматическое обновление**: При изменении статуса уведомления автоматически обновляется счетчик непрочитанных
2. **Обработка ошибок**: Все API вызовы содержат обработку ошибок с уведомлениями пользователя
3. **Оптимистичные обновления**: Локальное состояние обновляется сразу, не дожидаясь ответа сервера
4. **Типизация**: Полная типизация всех данных с TypeScript
5. **Интернационализация**: Поддержка русского и английского языков
