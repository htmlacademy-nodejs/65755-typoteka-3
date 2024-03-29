'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {ANNOUNCE_LENGTH} = require(`../../constants`);
const {
  getRandomInt,
  getRandomDate,
  // getRandomArray,
  shuffle
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MIN_COMMENTS = 2;
const MAX_COMMENTS = 4;

const FILE_NAME = `fill-db.sql`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const pictureFileName = [
  `forest`,
  `sea`,
  `sea-fullsize`,
  `skyscraper`
];

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, articleId, userCount, comments) => (
  Array(count).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    articleId,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateArticles = (count, titles, categoryCount, userCount, sentences, comments) => (
  Array(count).fill({}).map((_, index) => ({
    userId: getRandomInt(1, userCount),
    category: [getRandomInt(1, categoryCount)],
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, getRandomInt(0, ANNOUNCE_LENGTH)).join(` `),
    fullText: shuffle(sentences).slice(1, getRandomInt(0, sentences.length - 1)).join(` `),
    createdDate: getRandomDate(),
    picture: pictureFileName[getRandomInt(0, pictureFileName.length - 1)],
    comments: generateComments(getRandomInt(MIN_COMMENTS, MAX_COMMENTS), index + 1, userCount, comments)
  }))
);

module.exports = {
  name: `--fill`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const commentSentences = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const users = [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar-1.jpg`
      },
      {
        email: `ivanova@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `София`,
        lastName: `Иванова`,
        avatar: `avatar-2.jpg`
      },
      {
        email: `petrova@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Анна`,
        lastName: `Петрова`,
        avatar: `avatar-3.jpg`
      },
      {
        email: `sidorova@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Мария`,
        lastName: `Сидорова`,
        avatar: `avatar-4.jpg`
      },
      {
        email: `petrov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Пётр`,
        lastName: `Петров`,
        avatar: `avatar-5.jpg`
      }
    ];


    const articles = generateArticles(countArticles, titles, categories.length, users.length, sentences, commentSentences);

    const comments = articles.flatMap((article) => article.comments);

    const articleCategories = articles.map((article, index) => ({articleId: index + 1, categoryId: article.category[0]}));

    const userValues = users.map(
        ({email, passwordHash, firstName, lastName, avatar}) =>
          `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const articleValues = articles.map(
        ({title, announce, fullText, picture, userId}) =>
          `('${title}', '${announce}', '${fullText}', '${picture}.jpg', ${userId})`
    ).join(`,\n`);

    const articleCategoryValues = articleCategories.map(
        ({articleId, categoryId}) =>
          `(${articleId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
        ({text, userId, articleId}) =>
          `('${text}', ${userId}, ${articleId})`
    ).join(`,\n`);

    const content = `INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
${userValues};

INSERT INTO categories(name) VALUES
${categoryValues};

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, full_text, picture, user_id) VALUES
${articleValues};
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories(article_id, category_id) VALUES
${articleCategoryValues};
ALTER TABLE article_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id, article_id) VALUES
${commentValues};
ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};

