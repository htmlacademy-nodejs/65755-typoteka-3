'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const myRouter = new Router();
const api = require(`../api`).getAPI();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `my`, т.к. уже указали этот префикс при подключении
// модуля маршрута в `express.js`

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my-articles`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`comments`, {articles: articles.slice(0, 3)});
});

module.exports = myRouter;
