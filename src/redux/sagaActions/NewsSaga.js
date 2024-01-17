import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { newsActions } from '../reducer/NewsReducer';
import { NewsService } from '~/services/api/NewAPI';

function* actGetNews(action) {
  const { keyword, callback, fail } = action;
  try {
    const res = yield call(() => NewsService.getNews(keyword ?? 'Information Technology Jobs'));
    const { status, data } = res;
    if (status === 200) {
      const slicedData = data.slice(0, 30);
      yield put(newsActions.getNewsSuccess({ listNews: slicedData }));
    } else {
      fail();
    }
  } catch (err) {
    fail();
  } finally {
    callback();
  }
}

export function* followActGetNews() {
  yield takeLatest(SagaActionTypes.GET_NEWS_SAGA, actGetNews);
}
