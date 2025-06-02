# Bet History Component Documentation

## Overview

Компонент истории ставок позволяет пользователям просматривать свою игровую активность с детальной информацией о каждой ставке, выигрышах/проигрышах и общей статистике.

## Files Created/Modified

### 1. Types (`src/types/index.ts`)

```typescript
// Добавлены интерфейсы для истории ставок
export interface BetHistoryGame {
  id: number
  name: string
}

export interface BetHistoryRecord {
  id: number
  game_id: number
  user_id: number
  bet: number
  win_ammount: number
  result: 'win' | 'lose'
  created_at: string
  game: BetHistoryGame
}

export interface BetHistoryResponse {
  pages: number
  page: number
  data: BetHistoryRecord[]
}
```

### 2. API Integration (`src/services/api.ts`)

```typescript
export const userApi = {
  // ... existing methods

  // GET /user/history - получить историю ставок пользователя
  getBetHistory: (page: number = 1) =>
    api.get<BetHistoryResponse>(`/api/user/history?page=${page}`),
}
```

### 3. BetHistory Component (`src/components/BetHistory.vue`)

Полнофункциональный компонент включающий:

- Загрузку данных с API
- Отображение статистики (общие ставки, выигрыши, процент побед)
- Таблицу с историей ставок
- Пагинацию
- Состояния загрузки, ошибок и пустых данных
- Форматирование валюты и дат

### 4. Profile Integration (`src/views/UserProfile.vue`)

Интегрирован компонент в профиль пользователя:

```vue
<div v-if="activeTab === $t('profile.betHistory')">
  <BetHistory />
</div>
```

### 5. Localization

Добавлены переводы на русский и английский языки для всех элементов интерфейса.

## API Endpoint Documentation

### GET /user/history

Получение истории ставок пользователя с пагинацией.

**Parameters:**

- `page` (query, optional): Номер страницы (по умолчанию 1)

**Response Format:**

```json
{
  "pages": 5,
  "page": 1,
  "data": [
    {
      "id": 1,
      "game_id": 1,
      "user_id": 3,
      "bet": 100,
      "win_ammount": 200,
      "result": "win",
      "created_at": "2025-05-20T16:52:21.494024Z",
      "game": {
        "id": 1,
        "name": "test"
      }
    }
  ]
}
```

**Response Fields:**

- `pages` (number): Общее количество страниц
- `page` (number): Текущая страница
- `data` (array): Массив записей о ставках
  - `id` (number): Уникальный ID записи
  - `game_id` (number): ID игры
  - `user_id` (number): ID пользователя
  - `bet` (number): Размер ставки
  - `win_ammount` (number): Сумма выигрыша
  - `result` (string): Результат ("win" или "lose")
  - `created_at` (string): Дата и время ставки (ISO 8601)
  - `game` (object): Информация об игре
    - `id` (number): ID игры
    - `name` (string): Название игры

## Component Features

### 1. Statistics Dashboard

- **Total Bets**: Количество ставок на текущей странице
- **Total Wins**: Общая сумма выигрышей
- **Win Rate**: Процент выигрышных ставок

### 2. History Table

Отображает следующую информацию для каждой ставки:

- Название игры
- Размер ставки
- Результат (выигрыш/проигрыш)
- Сумма выигрыша
- Дата и время

### 3. Pagination

- Переход между страницами
- Отображение текущей страницы и общего количества
- Отключение кнопок при достижении границ

### 4. Responsive Design

- Адаптивная таблица с горизонтальной прокруткой на мобильных устройствах
- Responsive grid для статистики

### 5. Internationalization

Поддержка русского и английского языков с переводами для:

- Заголовков таблицы
- Статистики
- Кнопок навигации
- Состояний загрузки и ошибок

## Usage Examples

### HTTP Request Example

```bash
curl -X GET "http://localhost:3000/api/user/history?page=1" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Vue Component Usage

```vue
<template>
  <div>
    <BetHistory />
  </div>
</template>

<script setup>
import BetHistory from '@/components/BetHistory.vue'
</script>
```

## Error Handling

Компонент обрабатывает следующие типы ошибок:

- Ошибки сети
- Ошибки авторизации
- Пустые ответы от API
- Неверные форматы данных

## Security Considerations

- Доступ к истории ставок только для авторизованных пользователей
- Токен авторизации передается через заголовок Authorization
- Пользователь может видеть только свою историю ставок

## Performance Optimizations

- Пагинация для больших объемов данных
- Кэширование состояния загрузки
- Ленивая загрузка компонента

## Future Enhancements

- Фильтрация по периоду времени
- Фильтрация по типу игры
- Экспорт истории в CSV/PDF
- Поиск по названию игры
- Сортировка по различным полям
