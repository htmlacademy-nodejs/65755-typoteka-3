'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const articlesRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `offers`, т.к. уже указали этот префикс при подключении
// модуля маршрута в `express.js`

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`categori`));
articlesRoutes.get(`/add`, (req, res) => res.render(`posts/post`));
articlesRoutes.get(`/edit/:id`, (req, res) => res.render(`posts/post`));
articlesRoutes.get(`/all-categories`, (req, res) => res.render(`posts/all-categories`));
articlesRoutes.get(`/:id`, (req, res) => res.render(`posts/post-detail`));

module.exports = articlesRoutes;
