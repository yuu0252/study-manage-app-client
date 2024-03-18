import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: { login: loginReducer, loading: loadingReducer },
});
