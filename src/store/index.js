import { createStore } from "redux";

import { appReducer } from "./reducers/app-reducer";

export const store = createStore(appReducer);
