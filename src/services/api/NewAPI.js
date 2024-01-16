import axios from 'axios';
import * as UrlApi from '../url';

export const NewsService = {
  getNews: (keyword) => {
    return axios.get(UrlApi.URL_GET_NEWS(keyword));
  },
};
