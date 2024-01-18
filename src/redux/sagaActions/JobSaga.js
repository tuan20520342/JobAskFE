import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { jobActions } from '../reducer/JobReducer';
import { JobService } from '~/services/api/JobAPI';

function* actGetJobs(action) {
  const { job, callback, fail } = action;
  try {
    const { title, level } = job;
    const res = yield call(() => JobService.getJobs(title, level));
    const { status, data } = res;
    console.log(res);
    if (status === 200) {
      yield put(jobActions.getJobsSuccess({ listJobs: data }));
    } else {
      fail();
    }
  } catch (err) {
    fail();
  } finally {
    callback();
  }
}

export function* followActGetJobs() {
  yield takeLatest(SagaActionTypes.GET_JOBS_SAGA, actGetJobs);
}
