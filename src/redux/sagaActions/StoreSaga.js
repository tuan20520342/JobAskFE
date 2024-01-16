import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { storeActions } from '../reducer/StoreReducer';
import { StoreService } from '~/services/api/StoreAPI';

function* actGetLocalStore(action) {
  const { storeName, callback, fail } = action;

  try {
    const res = yield call(() => StoreService.getLocalStores(storeName));
    const { status, data } = res;
    console.log(res);
    if (status === 200) {
      yield put(storeActions.getStoresSuccess({ listStores: data }));
    } else {
      fail();
    }
  } catch (err) {
    fail();
  } finally {
    callback();
  }
}

export function* followActGetLocalStore() {
  yield takeLatest(SagaActionTypes.GET_LOCALSTORES_SAGA, actGetLocalStore);
}
