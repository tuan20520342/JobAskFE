import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import chatbotSlice from './reducer/ChatbotReducer';
import videoSlice from './reducer/VideoReducer';
import modalSlice from './reducer/ModalReducer';
import newsSlice from './reducer/NewsReducer';
import jobSlice from './reducer/JobReducer';
import storeSlice from './reducer/StoreReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  chatbotSlice,
  videoSlice,
  modalSlice,
  newsSlice,
  jobSlice,
  storeSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
