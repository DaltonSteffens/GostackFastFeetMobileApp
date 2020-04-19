import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import issue from './issue/sagas';
import order from './order/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([auth, issue, order, user]);
}
