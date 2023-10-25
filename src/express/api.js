'use strict';

const axios = require(`axios`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

class API {

  constructor(baseURL, timeout) {
    console.log(`baseURL`, baseURL);
    console.log(`timeout`, timeout);
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    console.log(`url`, url);
    console.log(`options`, options);
    const response = await this._http.request({url, ...options});
    console.log(`response.data`, response.data);
    return response.data;
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  async getCategories() {
    return await this._load(`/category`);
  }

  async createArticle(data) {
    console.log(`data`, data);
    return await this._load(`/articles`, {
      method: `POST`,
      data
    });
  }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};

