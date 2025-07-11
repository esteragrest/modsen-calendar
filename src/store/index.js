import { combineReducers, createStore } from "redux";

import { appReducer, modalReducer } from "./reducers";

const reducer = combineReducers({
  app: appReducer,
  modal: modalReducer,
});

export const store = createStore(reducer);
