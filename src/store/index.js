import { createStore } from "redux";
import tweetReducer from "../reducers/index";

const store = createStore(tweetReducer);

export default store;