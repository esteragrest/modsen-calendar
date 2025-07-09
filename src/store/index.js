import { combineReducers, createStore } from "redux";

import { appReducer } from "./reducers/app-reducer";
import { modalReducer } from "./reducers/modal-reducer";

const reducer = combineReducers({
  app: appReducer,
  modal: modalReducer,
});

export const store = createStore(reducer);
