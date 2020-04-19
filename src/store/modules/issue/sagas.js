import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';

import {
  issueFetchAllSuccess,
  issueFetchAllFailure,
  issueCreateSuccess,
  issueCreateFailure,
} from './actions';

export function* fetchAllIssues({ payload }) {
  try {
    const { page, status, deliveryman_id } = payload;

    const response = yield call(
      api.get,
      `deliveryman/${deliveryman_id}/orders`,
      {
        params: { page, status },
      }
    );

    yield put(issueFetchAllSuccess(response.data));
  } catch (err) {
    errorHandling(err);
    yield put(issueFetchAllFailure());
  }
}

export function* createIssue({ payload }) {
  try {
    const { id, full_description } = payload;

    const response = yield call(api.post, `order/${id}/issues`, {
      full_description,
    });

    yield put(issueCreateSuccess(response.data));
  } catch (err) {
    errorHandling(err);
    yield put(issueCreateFailure());
  }
}

export default all([
  takeLatest('@issue/FETCH_ALL_REQUEST', fetchAllIssues),
  takeLatest('@issue/CREATE_REQUEST', createIssue),
]);
