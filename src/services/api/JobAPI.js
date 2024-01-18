import axios from 'axios';
import * as UrlApi from '../url';

export const JobService = {
  getJobs: (title, level) => {
    const data = {
      title: title,
      level: level,
    };
    return axios.post(UrlApi.URL_GET_JOBS, data);
  },
};
