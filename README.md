
# NEST-AUTH

Бекэнд приложение для аутентификации и авторизации. (Не забудь поставить звезду!)

## Установка

Склонировать репозиторий

```bash
git clone https://github.com/anvar2705/nest-auth.git
```

Перейти в директорию проекта

```bash
cd nest-auth
```

Установить зависимости

```bash
npm install
```

## Запуск приложения

### 1 вариант: запуск api с помощью docker
Нужно установить docker.
Параметры подключения к базе находятся в src/common/envs/production.env

```bash
# Запустить
npm run docker-start

# Остановить 
npm run docker-stop
```

### 2 вариант: запуск api локально
Нужно установить базу данных postgres.
Параметры подключения к базе находятся в src/common/envs/development.env, при необходимости изменить.

```bash
# Запустить миграции для создания таблиц в базе,
# дефолтных ролей и пользователя с правами админа
npm run migration:run

# Запустить приложение
npm run start:dev
```

## Документация Swagger

### localhost:5000/api/docs

## Примечание
С помощью миграций, создаются стандартные роли (USER, ADMIN) и пользователь с правами
админа (username: "admin", password: "123456789"). Все роуты, кроме роутов логина или регистрации,
защищены авторизацией по роли админа.


## Migrations

Generate initial migration

```bash
npm run migration:generate src/db/migrations/Initial
```

Create empty migration

```bash
npm run migration:create src/db/migrations/MigrationName
```

Run migration

```bash
npm run migration:run
```

