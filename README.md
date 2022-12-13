
# NEST-AUTH

Backend-app for authentication and authorization.

## Installation

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd nest-auth
```

Install dependencies

```bash
  npm install
```






## If database is EMPTY

Generate initial migration

```bash
  npm run migration:generate -- src/db/migrations/StartMigration
```

Run migration

```bash
  npm run migration:run
```

## Start the app (todo)

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

## Swagger docs
### localhost:5000/api/docs
