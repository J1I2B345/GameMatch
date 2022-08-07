import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import createReducer from "../reducers/createReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers({ games: createReducer });

const configureStore = () => {
  return createStore(rootReducer, composedEnhancer);
};

export default configureStore;
