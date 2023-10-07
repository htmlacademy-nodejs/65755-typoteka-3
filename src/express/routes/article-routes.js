'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const articlesRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `offers`, т.к. уже указали этот префикс при подключении
// модуля маршрута в `express.js`

articlesRoutes.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));
articlesRoutes.get(`/add`, (req, res) => res.send(`/articles/add`));
articlesRoutes.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articlesRoutes.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = articlesRoutes;
