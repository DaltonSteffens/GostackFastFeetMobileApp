import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';

import {
  orderFetchAllSuccess,
  orderFetchAllFailure,
  orderFetchSuccess,
  orderFetchFailure,
  orderIssuesFetchSuccess,
  orderIssuesFetchFailure,
  orderUpdateSuccess,
  orderUpdateFailure,
} from './actions';

export function* fetchAllOrders({ payload }) {
  try {
    const { page, status, deliveryman_id } = payload;

    const response = yield call(
      api.get,
      `deliveryman/${deliveryman_id}/orders`,
      {
        params: { page, status },
      }
    );

    const data = {
      page,
      response: response.data,
    };

    yield put(orderFetchAllSuccess(data));
  } catch (err) {
    errorHandling(err);
    yield put(orderFetchAllFailure());
  }
}

export function* fetchOrder({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `orders/${id}`);

    yield put(orderFetchSuccess(response.data));
  } catch (err) {
    errorHandling(err);
    yield put(orderFetchFailure());
  }
}

export function* fetchOrderIssues({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/order/${id}/issues`);

    yield put(orderIssuesFetchSuccess(response.data));
  } catch (err) {
    errorHandling(err);
    yield put(orderIssuesFetchFailure());
  }
}

export function* updateOrder({ payload }) {
  try {
    const { id, type, deliveryman_id } = payload;
    let orderData = {};

    if (type === 'confirm') {
      const { signature_id } = payload;
      orderData = {
        signature_id,
        end_date: new Date(),
      };
    } else {
      orderData = {
        start_date: new Date(),
      };
    }

    yield call(
      api.put,
      `deliveryman/${deliveryman_id}/orders/${id}`,
      orderData
    );

    yield put(orderUpdateSuccess());
  } catch (err) {
    errorHandling(err);
    yield put(orderUpdateFailure());
  }
}

export default all([
  takeLatest('@order/FETCH_ALL_REQUEST', fetchAllOrders),
  takeLatest('@order/FETCH_REQUEST', fetchOrder),
  takeLatest('@order/FETCH_ISSUES_REQUEST', fetchOrderIssues),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);
