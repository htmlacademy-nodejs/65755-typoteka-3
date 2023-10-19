'use strict';

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `fabXkO`,
    "title": `Обзор новейшего смартфона`,
    "announce": ``,
    "fullText": `Альбом стал настоящим открытием года. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Игры и программирование разные вещи. Этот смартфон — настоящая находка. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Не стоит идти в программисты, если вам нравятся только игры. Так ли это на самом деле? Стоит только немного постараться и запастись книгами. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Просто действуйте. Бороться с прокрастинацией несложно. Первая большая ёлка была установлена только в 1938 году. Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами.`,
    "createdDate": `2023-10-18T22:52:13.728Z`,
    "picture": `forest`,
    "category": [],
    "comments": [
      {
        "id": `KFW39_`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `4JW7sV`,
        "text": `Хочу такую же футболку :-)`
      },
      {
        "id": `6fOBar`,
        "text": `Плюсую, но слишком много буквы! Это где ж такие красоты?`
      }
    ]
  },
  {
    "id": `Z3PNVY`,
    "title": `Борьба с прокрастинацией`,
    "announce": `Не стоит идти в программисты, если вам нравятся только игры. Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка.`,
    "fullText": `Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "createdDate": `2023-09-18T22:52:13.729Z`,
    "picture": `sea`,
    "category": [
      `IT`,
      `Деревья`,
      `Разное`,
      `Железо`,
      `Без рамки`
    ],
    "comments": [
      {
        "id": `z5NdLt`,
        "text": `Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором!`
      },
      {
        "id": `VBnvBG`,
        "text": `Планируете записать видосик на эту тему? Совсем немного...`
      },
      {
        "id": `X_hjwB`,
        "text": `Согласен с автором! Это где ж такие красоты?`
      }
    ]
  },
  {
    "id": `1pIQPq`,
    "title": `Как начать программировать`,
    "announce": ``,
    "fullText": `Собрать камни бесконечности легко, если вы прирожденный герой. Игры и программирование разные вещи. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Бороться с прокрастинацией несложно. Рок-музыка всегда ассоциировалась с протестами. Как начать действовать? Для начала просто соберитесь. Альбом стал настоящим открытием года. Из под его пера вышло 8 платиновых альбомов.`,
    "createdDate": `2023-10-18T22:52:13.729Z`,
    "picture": `skyscraper`,
    "category": [],
    "comments": [
      {
        "id": `w_JNJc`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    "id": `NYTfjS`,
    "title": `Обзор новейшего смартфона`,
    "announce": ``,
    "fullText": `Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Вы можете достичь всего. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Не стоит идти в программисты, если вам нравятся только игры. Альбом стал настоящим открытием года. Ёлки — это не просто красивое дерево. Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко, если вы прирожденный герой. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Простые ежедневные упражнения помогут достичь успеха.`,
    "createdDate": `2023-08-18T22:52:13.729Z`,
    "picture": `skyscraper`,
    "category": [
      `Деревья`
    ],
    "comments": [
      {
        "id": `yeYbo3`,
        "text": `Согласен с автором!`
      },
      {
        "id": `XWwTsK`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  },
  {
    "id": `voSG0L`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "announce": `Ёлки — это не просто красивое дерево. Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году.`,
    "fullText": `Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "createdDate": `2023-07-18T22:52:13.729Z`,
    "picture": `sea-fullsize`,
    "category": [
      `Железо`,
      `Деревья`
    ],
    "comments": [
      {
        "id": `cjvhRw`,
        "text": `Совсем немного...`
      },
      {
        "id": `vLFqCE`,
        "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First offer's id equals "fabXkO"`, () => expect(response.body[0].id).toBe(`fabXkO`));

});

describe(`API returns an offer with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/fabXkO`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Обзор новейшего смартфона"`, () => expect(response.body.title).toBe(`Обзор новейшего смартфона`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    title: `Заголовок`,
    fullText: `Текст`,
    category: [`Без рамки`],
    picture: `picture`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    title: `Заголовок`,
    fullText: `Текст`,
    category: [`Без рамки`],
    picture: `picture`
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    title: `Новый заголовок`,
    fullText: `Текст`,
    category: [`Без рамки`],
    picture: `picture`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/fabXkO`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/fabXkO`)
    .expect((res) => expect(res.body.title).toBe(`Новый заголовок`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validOffer = {
    title: `Это`,
    fullText: `валидный`,
    category: [`объект`],
    picture: `однако`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    title: `Это`,
    fullText: `невалидный`,
    category: [`объект без picture`]
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/fabXkO`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`fabXkO`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/fabXkO/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's id is "KFW39_"`, () => expect(response.body[0].id).toBe(`KFW39_`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/fabXkO/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/fabXkO/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/fabXkO/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/fabXkO/comments/KFW39_`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`KFW39_`));

  test(`Comments count is 2 now`, () => request(app)
    .get(`/articles/fabXkO/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/fabXkO/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/KFW39_`)
    .expect(HttpCode.NOT_FOUND);

});
