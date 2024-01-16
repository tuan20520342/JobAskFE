import axios from 'axios';
import * as UrlApi from '../url';

export const ProductService = {
  getProducts: (productName) => {
    const data = {
      productName: productName.replace(/\s/g, '+'),
    };
    return axios.post(UrlApi.URL_GET_PRODUCTS, data);
  },
};
