import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { chatbotActions } from '../reducer/ChatbotReducer';
import { ChatbotService } from '~/services/api/ChatbotAPI';

function* actSendMessage(action) {
  const { message, onLoading, onFinish } = action;
  let responseMessage;
  try {
    const newMessage = {
      isAnswer: false,
      content: { message: message },
    };
    yield put(chatbotActions.sendMessage({ data: newMessage }));
    onLoading();
    const res = yield call(() => ChatbotService.postMessage(message));
    const { status, data } = res;
    console.log(res);
    if (status === 200) {
      responseMessage = {
        isAnswer: true,
        content: data,
      };
    } else {
      responseMessage = {
        isAnswer: true,
        content: { answer: 'Oops! Something went wrong' },
      };
    }
  } catch (err) {
    console.log(err);
    const { response } = err;
    responseMessage = {
      isAnswer: true,
      content: { answer: response.data.error },
    };
  } finally {
    onFinish();
    yield put(chatbotActions.responseMessage({ data: responseMessage }));
  }
}

function* actSendImgQuestion(action) {
  const { message, imageUrl, onLoading, onFinish } = action;
  let responseMessage;
  try {
    const newMessage = {
      isAnswer: false,
      content: {
        message: message,
        imageUrl: imageUrl,
      },
    };
    yield put(chatbotActions.sendMessage({ data: newMessage }));
    onLoading();
    const res = yield call(() => ChatbotService.postImgMessage(message, imageUrl));
    const { status, data } = res;
    console.log(res);
    if (status === 200) {
      responseMessage = {
        isAnswer: true,
        content: data,
      };
    } else {
      responseMessage = {
        isAnswer: true,
        content: { answer: 'Oops! Something went wrong' },
      };
    }
  } catch (err) {
    console.log(err);
    const { response } = err;
    responseMessage = {
      isAnswer: true,
      content: { answer: response.data.error },
    };
  } finally {
    onFinish();
    yield put(chatbotActions.responseMessage({ data: responseMessage }));
  }
}

export function* followActSendMessage() {
  yield takeLatest(SagaActionTypes.SEND_MESSAGE_SAGA, actSendMessage);
}

export function* followActSendImgQuestion() {
  yield takeLatest(SagaActionTypes.SEND_IMG_MESSAGE_SAGA, actSendImgQuestion);
}
