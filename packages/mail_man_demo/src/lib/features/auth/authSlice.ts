import { createSlice } from "@reduxjs/toolkit";
import { authAPIs } from "./authApis";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      authAPIs.endpoints.checkLogin.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authAPIs.endpoints.logout.matchFulfilled,
      (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
      }
    );
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
