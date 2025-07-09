import { ACTION_TYPE } from "../actions/action-type";

const initialModalState = {
  isOpen: false,
  eventIdToDelete: null,
};

export const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case ACTION_TYPE.OPEN_MODAL: {
      return {
        ...state,
        eventIdToDelete: action.payload,
        isOpen: true,
      };
    }
    case ACTION_TYPE.CLOSE_MODAL: {
      return initialModalState;
    }
    default:
      return state;
  }
};
