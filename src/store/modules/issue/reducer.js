import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  success: false,
  issues: [],
  issuesTotal: 0,
};

export default function issue(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@issue/FETCH_ALL_SUCCESS': {
        draft.issues = action.payload.rows;
        draft.issuesTotal = action.payload.count;
        draft.loading = false;
        break;
      }
      case '@issue/FETCH_ALL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@issue/CREATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/FETCH_SUCCESS': {
        draft.success = false;
        break;
      }
      case '@issue/CREATE_SUCCESS': {
        draft.loading = false;
        draft.success = true;
        break;
      }
      default:
    }
  });
}
