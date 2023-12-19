# menzen

Серверная часть проекта menzen, приложения для хранения информации о коллекциях монет.

## Используемые технологии и библиотеки:
- TypeScript
- ExpressJS
- Zod
- JWT
- S3


## Запуск
`npm run start`

Для запуска нужно задать env переменные:
- POSTGRES_URL // адрес базы данных.
- JWT_KEY // Ключ для JWT.
- FRONTEND_DOMAIN // Домен на котором размещен Frontend (нужно для CORS).
- RESEND_KEY (Ключ от сервиса Resend для верификации почты)
- S3_ACCESS_KEY и S3_SECRET_KEY   // Ключи от S3
- BUCKET_API_URL // Адрес bucket'а
- BUCKET_NAME // Название bucket'а
