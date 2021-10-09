import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name : "auth",
    initialState : {
        ownerId : "",
        username : "",
        email : "",
        authenticated : false,
    },
    reducers : {
        setAuthState(state,action){
                state.ownerId=action.payload.ownerId;
                state.username=action.payload.username;
                state.email=action.payload.email;
                state.authenticated=action.payload.authenticated;
        },
        resetState(state){
            state.ownerId="";
                state.username="";
                state.email="";
                state.authenticated=false;
        }
    }

})
export const authActions = authSlice.actions;
export default authSlice;