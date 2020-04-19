import produce from 'immer';

const INITIAL_STATE = {
  color: '#fff',
};

export default function statusbar(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@statusbar/UPDATE_COLOR': {
        draft.color = action.payload;
        break;
      }
      default:
        return state;
    }
  });
}
