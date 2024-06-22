import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import jobsReducer from "./reducer";

// Deprecated createStore usage - (warning)
// For better explanation:
//  https://stackoverflow.com/questions/71944111/redux-createstore-is-deprecated-cannot-get-state-from-getstate-in-redux-ac

const store = createStore(jobsReducer, applyMiddleware(thunk));

export default store;
