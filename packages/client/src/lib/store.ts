import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import { authAPIs } from "./features/auth/authApis";
import authReducer from "./features/auth/authSlice";
import templateReducer from "./features/email-template/emailTemplateSlice";
import contactListReducer from './features/contact-list/contactList.slice';


import { userAPIs } from "./features/user/userApis";
import { campaignAPIs } from "./features/campaign/campaignApis";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      template: templateReducer,
      contactList : contactListReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPIs.middleware,
        userAPIs.middleware,
        campaignAPIs.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
