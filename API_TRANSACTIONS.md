## Transactions API

### POST `/transactions`

Создание денежной транзакции для текущего авторизованного пользователя.

**Request body**

```json
{
  "amount": 1200.5,
  "currency": "USD",
  "type": "income",
  "status": "completed",
  "category": "Subscriptions",
  "description": "Pro plan purchase"
}
```

**Response 201**

```json
{
  "id": 1,
  "amount": 1200.5,
  "currency": "USD",
  "type": "income",
  "status": "completed",
  "category": "Subscriptions",
  "description": "Pro plan purchase",
  "created_at": "2026-03-16T10:00:00Z"
}
```

### GET `/transactions`

Получение списка транзакций текущего пользователя с пагинацией.

**Query params**

- `limit` — количество элементов на странице (по умолчанию 20, максимум 100).
- `offset` — смещение (по умолчанию 0).

**Response 200**

```json
{
  "total": 1,
  "items": [
    {
      "id": 1,
      "amount": 1200.5,
      "currency": "USD",
      "type": "income",
      "status": "completed",
      "category": "Subscriptions",
      "description": "Pro plan purchase",
      "created_at": "2026-03-16T10:00:00Z"
    }
  ]
}
```

### GET `/transactions/{id}`

Получение одной транзакции по идентификатору (только если она принадлежит текущему пользователю).

**Response 200**

Тело ответа совпадает со схемой `TransactionRead`, как в примерах выше.

