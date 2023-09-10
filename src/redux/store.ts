import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import caseReducer from "./features/caseSlice";

export const store = configureStore({
  reducer: { search: searchReducer, case: caseReducer },
  //   Not sure if I want this
  //   devTools: process.env.NODE_ENV !== "production",
});

// Extract the RootState and Dispatch types from the store instance
// By inferring these types from the store,
// we ensure that they stay up to date as we
// 1) add new state slices
// 2) make changes to the middleware settings
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
