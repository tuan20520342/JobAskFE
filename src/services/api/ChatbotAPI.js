import axios from 'axios';
import * as UrlApi from '../url';

export const ChatbotService = {
  postMessage: (message) => {
    const data = {
      question: message,
    };
    return axios.post(UrlApi.URL_CHATBOT, data);
  },
  postImgMessage: (question, base64) => {
    const data = {
      question: question,
      base64: base64.substring(base64.indexOf(',') + 1),
    };
    return axios.post(UrlApi.URL_IMG_CHAT, data);
  },
};
