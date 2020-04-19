import { combineReducers } from 'redux';

import auth from './auth/reducer';
import issue from './issue/reducer';
import order from './order/reducer';
import statusbar from './statusbar/reducer';
import user from './user/reducer';

export default combineReducers({
  auth,
  issue,
  order,
  statusbar,
  user,
});
