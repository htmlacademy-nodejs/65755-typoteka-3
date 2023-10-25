'use strict';

// Подключаем и инициализируем экземпляр Router
const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {ensureArray} = require(`../../utils`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const api = require(`../api`).getAPI();
const articlesRoutes = new Router();

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
// Следует помнить, что в первом параметре мы указываем путь маршрута
// без `offers`, т.к. уже указали этот префикс при подключении
// модуля маршрута в `express.js`

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`category`));

articlesRoutes.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  const article = {
    // id: ``,
    // title: ``,
    // announce: ``,
    // fullText: ``,
    createdDate: ``,
    // picture: ``,
    category: [],
    // comments: []
  };
  res.render(`posts/post`, {article, categories});
});

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`posts/post`, {article, categories});
});

articlesRoutes.post(`/add`,
    upload.single(`upload`), // применяем middleware
    async (req, res) => {

      // в `body` содержатся текстовые данные формы
      // в `file` — данные о сохранённом файле

      // console.log(`req`, req);

      const {body, file} = req;

      console.log(`body`, body);
      console.log(`file`, file);

      const getBodyCategories = (requestBody, categories) => {
        const bodyCategories = [];

        const bodyKeys = Object.keys(requestBody);

        const filteredKeys = bodyKeys.filter((el) => /^category-/.test(el));

        const areKeysOn = filteredKeys.every((el) => requestBody[el] === `on`);

        if (areKeysOn) {
          filteredKeys.forEach(
              (el) => bodyCategories.push(categories[el.split(`category-`)[1]])
          );
        }

        return bodyCategories;
      };

      const categories = await api.getCategories();

      const articleData = {
        picture: file ? file.filename : ``,
        title: body.title,
        fullText: body[`full-text`],
        announce: body.announcement,
        createdDate: new Date(body.date),
        category: ensureArray(getBodyCategories(body, categories))
      };

      try {
        await api.createArticle(articleData);
        res.redirect(`/my`);
      } catch (error) {
        res.redirect(`back`);
      }
    }
);

articlesRoutes.get(`/all-categories`, (req, res) => res.render(`posts/all-categories`));
articlesRoutes.get(`/:id`, (req, res) => res.render(`posts/post-detail`));

module.exports = articlesRoutes;
