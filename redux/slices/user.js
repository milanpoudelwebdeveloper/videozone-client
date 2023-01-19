import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      state.token = payload.token;
      state.user = payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setLogin, logout } = userSlice.actions;

export default userSlice.reducer;
