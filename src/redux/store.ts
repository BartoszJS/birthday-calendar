import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addBirthdaySlice from "./birthdaySlice";

const rootReducer = combineReducers({
  addBirthday: addBirthdaySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
