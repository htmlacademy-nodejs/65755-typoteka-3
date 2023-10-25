'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main`, {articles});
});

mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));

mainRouter.get(`/search`, async (req, res) => {
  const {search} = req.query;

  if (!search) {
    res.render(`search/search`);
  } else {
    try {
      const results = await api.search(search);

      res.render(`search/search-results`, {
        search,
        results
      });
    } catch (error) {

      res.render(`search/search-empty`, {
        search
      });
    }
  }
});

module.exports = mainRouter;
