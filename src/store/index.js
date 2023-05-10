import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newsSlice from "./slices/newsSlice";
import userSlice from "./slices/userSlice";
import aboutSlice from "./slices/aboutSlice";
import modalsSlice from "./slices/modalsSlice";

const rootReducer = combineReducers({
  user: userSlice,
  news: newsSlice,
  abouts: aboutSlice,
  modals: modalsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

window.store = store;
export default store;
