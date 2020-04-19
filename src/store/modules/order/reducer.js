import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  success: false,
  order: {},
  orders: [],
  ordersTotal: 0,
  issues: [],
  issuesTotal: 0,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@order/FETCH_ALL_SUCCESS': {
        const { page, response } = action.payload;
        draft.orders =
          page >= 2 ? [...draft.orders, ...response.rows] : response.rows;
        draft.ordersTotal = response.count;
        draft.loading = false;
        break;
      }
      case '@order/FETCH_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/FETCH_SUCCESS': {
        draft.order = action.payload;
        draft.loading = false;
        draft.success = false;
        break;
      }
      case '@order/FETCH_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/FETCH_ISSUES_SUCCESS': {
        draft.issues = action.payload;
        draft.issuesTotal = action.payload.length;
        draft.success = false;
        break;
      }
      case '@order/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.success = true;
        break;
      }
      case '@order/UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
