import axios from 'axios';
import * as UrlApi from '../url';

export const VideoService = {
  getVideo: (keyword) => {
    return axios.get(UrlApi.URL_GET_VIDEO(keyword));
  },
};
