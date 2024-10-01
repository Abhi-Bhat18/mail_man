import { createSlice } from "@reduxjs/toolkit";
import { authAPIs } from "./authApis";

interface IinitialState {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    img_url?: string | null;
    role: string;
  } | null;

  defaultProject: {
    project_access_id: string;
    project_id: string;
    project_name: string;
    project_role: string;
    project_status: string;
    role_id: number;
    contact : string;
  } | null;
  isLoggedIn: boolean;
}
const initialState: IinitialState = {
  user: null,
  defaultProject: null,
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
        state.user = action.payload.user;
        state.defaultProject = action.payload.defaultProject;
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
