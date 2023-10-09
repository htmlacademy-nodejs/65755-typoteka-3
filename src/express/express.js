'use strict';

const express = require(`express`);
const path = require(`path`);

// Маршруты приложения мы опишем в отдельных файлах.
// Для определения маршрутов мы воспользуемся Router().
// Примеры маршрутов будут продемонстрированы ниже по тексту.
const articlesRoutes = require(`./routes/article-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

// Зафиксируем порт для сервера
const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

// Подключим созданные маршруты
app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use((req, res) => res.status(400).render(`errors/404`));
app.use((err, req, res, next) => res.status(500).render(`errors/500`));


app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);


// Запуск сервера
app.listen(DEFAULT_PORT);
