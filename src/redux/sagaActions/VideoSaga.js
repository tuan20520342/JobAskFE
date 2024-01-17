import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { videoActions } from '../reducer/VideoReducer';
import { VideoService } from '~/services/api/VideoAPI';

function* actGetVideo(action) {
  const { keyword, onStart, onFinish, fail } = action;
  try {
    onStart();
    const res = yield call(() => VideoService.getVideo(keyword ?? 'IT Jobs'));
    const { status, data } = res;
    if (status === 200) {
      yield put(videoActions.getVideoSuccess({ listVideo: data.items }));
    } else {
      fail();
    }
  } catch (err) {
    fail();
  } finally {
    onFinish();
  }
}

export function* followActGetVideo() {
  yield takeLatest(SagaActionTypes.GET_VIDEO_SAGA, actGetVideo);
}
