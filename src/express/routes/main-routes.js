'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const mainRouter = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.

mainRouter.get(`/`, (req, res) => res.render(`main`));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));

module.exports = mainRouter;
