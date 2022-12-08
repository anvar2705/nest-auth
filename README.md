# NEST-AUTH

## Установка зависимостей

```bash
$ npm install
```

### Приложение запускается на 5000 порту.

## 1 вариант: запуск api с помощью docker
Нужно установить докер.
База данных и апи запускаются в докер-контейнерах.

```bash
# Запустить
$ npm run docker-compose-up

# Остановить 
$ npm run docker-compose-down
```

## 2 вариант: запуск api локально
Нужно установить базу данных postgres.
В файле .env изменить значение POSTGRES_HOST=localhost (вместо db).
Также изменить порт, пароль или название базы, если нужно.

```bash
# Запустить
$ npm run start:dev
```

## Swagger
### localhost:5000/api/docs
