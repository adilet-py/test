import { combineReducers, createStore } from "redux";
import usersReducer from "./user-reducer";

let reducers = combineReducers({
    usersPage: usersReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;
