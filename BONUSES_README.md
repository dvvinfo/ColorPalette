# Система бонусов

Добавлена полная система бонусов с интеграцией к бэкенд API.

## Добавленные файлы и изменения

### 1. Типы (`src/types/index.ts`)

Добавлены типы для работы с бонусами:

- `Bonus` - базовая структура бонуса
- `BonusCreateRequest` - запрос на создание бонуса
- `BonusActivateRequest` - запрос на активацию бонуса по промокоду
- `BonusResponse` - стандартный ответ с сообщением

### 2. API (`src/services/api.ts`)

Добавлен `bonusApi` с методами:

- `getAll()` - получить все бонусы (GET /api/bonus/)
- `create(data)` - создать новый бонус (POST /api/bonus/)
- `delete(id)` - удалить бонус (DELETE /api/bonus/{id})
- `activate(data)` - активировать бонус по промокоду (POST /api/bonus/activate)

### 3. Компонент (`src/views/BonusesView.vue`)

Полностью переработан компонент страницы бонусов:

- Интеграция с реальным API
- Загрузка бонусов с сервера при открытии страницы
- Фильтрация по типам бонусов (welcome, promo, cashback)
- Активация бонусов через API
- Обработка промокодов с валидацией
- Состояния загрузки и ошибок
- Отображение информации о вейджере и лимитах

### 4. Локализация (`src/locales/`)

Добавлены переводы на русский и английский языки:

- Новые ключи в разделе `bonuses`
- Переводы для состояний бонусов
- Дополнительные тексты интерфейса
- Сообщения об ошибках и успешных операциях

## Типы бонусов

Поддерживаются следующие типы бонусов:

- `welcome` - приветственный бонус
- `promo` - промокод бонус
- `cashback` - кэшбэк бонус

## Структура данных бонуса

```typescript
interface Bonus {
  id: number
  title: string
  description: string
  type: 'welcome' | 'promo' | 'cashback'
  reward: string
  wager_multiplier: number
  is_active: boolean
  status: string
  participants_count: number
  total_reward: number
  promo_code: string | null
  max_activations: number | null
  activated_count: number
  start_date: string
  end_date: string | null
}
```

## Использование

### Загрузка бонусов:

```javascript
import { bonusApi } from '@/services/api'

// Получить все бонусы
const response = await bonusApi.getAll()
const bonuses = response.data
```

### Активация промокода:

```javascript
// Активировать бонус по промокоду
await bonusApi.activate({
  promo_code: 'MEGA2024',
})
```

### Создание бонуса:

```javascript
// Создать новый бонус
await bonusApi.create({
  title: 'MEGA2024',
  description: '50 фриспинов в слоте Book of Ra за промокод',
  type: 'promo',
  reward: '50 фриспинов',
  wager_multiplier: 25,
  promo_code: 'MEGA2024',
  max_activations: 1000,
  start_date: '2024-02-01T00:00:00Z',
  end_date: '2024-02-29T23:59:59Z',
})
```

### API эндпоинты:

- `GET /api/bonus/` - список бонусов
- `POST /api/bonus/` - создать бонус
- `DELETE /api/bonus/{id}` - удалить бонус
- `POST /api/bonus/activate` - активировать промокод

## Особенности

1. **Автоматическая загрузка**: Бонусы загружаются автоматически при открытии страницы
2. **Фильтрация**: Возможность фильтровать бонусы по типам
3. **Валидация промокодов**: Проверка корректности промокодов с обратной связью
4. **Обработка ошибок**: Все API вызовы содержат обработку ошибок с уведомлениями пользователя
5. **Состояния интерфейса**: Отображение состояний загрузки, ошибок и пустых списков
6. **Типизация**: Полная типизация всех данных с TypeScript
7. **Интернационализация**: Поддержка русского и английского языков

## Примеры API запросов

### Создание бонуса:

```http
POST /api/bonus/
Content-Type: application/json

{
  "title": "MEGA2024",
  "description": "50 фриспинов в слоте Book of Ra за промокод",
  "type": "promo",
  "reward": "5 000 ₽",
  "wager_multiplier": 25,
  "promo_code": "MEGA2024",
  "max_activations": 1000,
  "start_date": "2024-02-01T00:00:00Z",
  "end_date": "2024-02-29T23:59:59Z"
}
```

### Активация промокода:

```http
POST /api/bonus/activate
Content-Type: application/json

{
  "promo_code": "MEGA2024"
}
```

### Получение списка бонусов:

```http
GET /api/bonus/
```

## Интеграция с компонентами

Система бонусов интегрирована с существующими компонентами:

- `UniversalBonus.vue` - отображение отдельного бонуса
- `BonusCard.vue` - карточка бонуса (опционально)
- `BonusesView.vue` - главная страница с бонусами

## Безопасность

1. **Токен авторизации**: Все запросы к API бонусов требуют валидный JWT токен
2. **Обновление токенов**: Автоматическое обновление истекших токенов без потери пользовательской сессии
3. **Предотвращение циклов**: Защита от бесконечных циклов при обновлении токенов
4. **Валидация на сервере**: Все данные валидируются на сервере перед обработкой
