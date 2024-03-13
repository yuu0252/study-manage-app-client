import { Cookies } from "react-cookie";
import { createSlice } from "@reduxjs/toolkit";

const cookie = new Cookies();

const initialState = {
  isLogin: cookie.get("token") ? true : false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },

    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const selectLogin = (state: { login: { isLogin: boolean } }) =>
  state.login;

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
