import { configureStore } from '@reduxjs/toolkit';
import api from './api';
import { authAPIs } from './features/auth/authApis';
import authReducer from './features/auth/authSlice';


export const makeStore = () => {
    return configureStore({
        reducer: {
            auth : authReducer,
            [api.reducerPath]: api.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPIs.middleware)
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']