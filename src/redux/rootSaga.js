import { all } from 'redux-saga/effects';
import * as ChatbotSaga from './sagaActions/ChatbotSaga';
import * as VideoSaga from './sagaActions/VideoSaga';
import * as NewsSaga from './sagaActions/NewsSaga';
import * as ProductSaga from './sagaActions/ProductSaga';
import * as StoreSaga from './sagaActions/StoreSaga';

export default function* rootSaga() {
  yield all([
    //Chatbot
    ChatbotSaga.followActSendMessage(),
    ChatbotSaga.followActSendImgQuestion(),
    //Video
    VideoSaga.followActGetVideo(),
    //News
    NewsSaga.followActGetNews(),
    //Product
    ProductSaga.followActGetProducts(),
    //Store
    StoreSaga.followActGetLocalStore(),
  ]);
}
