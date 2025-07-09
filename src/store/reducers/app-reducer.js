import { ACTION_TYPE } from "../actions/action-type";

const initialAppState = {
  reloadFlag: false,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_RELOAD_FLAG: {
      return { ...state, reloadFlag: !state.reloadFlag };
    }
    default:
      return state;
  }
};
