import axios from 'axios';
import * as UrlApi from '../url';

export const StoreService = {
  getLocalStores: (shopName) => {
    const data = {
      storeName: shopName.replace(/\s/g, '+'),
    };
    return axios.post(UrlApi.URL_GET_LOCALSTORES, data);
  },
};
