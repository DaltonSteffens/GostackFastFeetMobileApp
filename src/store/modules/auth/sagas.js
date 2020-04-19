import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';

import { loginSuccess, loginFailure } from './actions';

export function* login({ payload }) {
  try {
    const { deliveryman_id } = payload;

    const response = yield call(api.post, 'sessions?mobile=1', {
      deliveryman_id,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(loginSuccess(token, user));
  } catch (err) {
    console.log('ERR', err);
    errorHandling(err);
    yield put(loginFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
]);
