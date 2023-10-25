'use strict';

const {MONTH_HADICAP} = require(`./constants`);

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = () => {
  const currentDate = new Date();
  return new Date(currentDate.setMonth(currentDate.getMonth() - getRandomInt(0, MONTH_HADICAP)));
};

const getRandomArray = (arr) => shuffle(arr).slice(1, getRandomInt(0, arr.length - 1));

const ensureArray = (value) => Array.isArray(value) ? value : [value];

module.exports = {
  getRandomInt,
  getRandomDate,
  getRandomArray,
  ensureArray,
  shuffle
};
