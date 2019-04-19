import { applyMiddleware, createStore, compose } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
