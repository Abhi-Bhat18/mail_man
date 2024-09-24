import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    user : null, 
    isLoggedIn : false
};

const authSlice = createSlice({ 
    name : 'auth',
    initialState : initialState, 
    
    reducers : { 
        setUserLogin :(state , action) => { 
            state.user = action.payload,
            state.isLoggedIn = true
        }
    }
})

export const { setUserLogin } = authSlice.actions;

export default authSlice.reducer;