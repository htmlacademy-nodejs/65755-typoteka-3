'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const myRouter = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `my`, т.к. уже указали этот префикс при подключении
// модуля маршрута в `express.js`

myRouter.get(`/`, (req, res) => res.send(`/my`));
myRouter.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = myRouter;
