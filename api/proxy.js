export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обрабатываем preflight запросы
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Формируем URL для бэкенда
    const backendUrl = `http://77.246.247.145${req.url.replace('/api/proxy', '')}`;

    console.log('Proxying request:', {
      method: req.method,
      url: backendUrl,
      headers: req.headers
    });

    // Подготавливаем заголовки для запроса к бэкенду
    const headers = {
      'Content-Type': 'application/json',
      ...(req.headers.authorization && { 'Authorization': req.headers.authorization }),
    };

    // Подготавливаем опции для fetch
    const fetchOptions = {
      method: req.method,
      headers,
    };

    // Добавляем тело запроса для POST/PUT
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    // Делаем запрос к бэкенду
    const response = await fetch(backendUrl, fetchOptions);
    const data = await response.text();

    // Пытаемся распарсить JSON, если возможно
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      jsonData = data;
    }

    // Возвращаем ответ клиенту
    res.status(response.status).json(jsonData);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'Proxy error',
      message: error.message,
      details: error.toString()
    });
  }
}
