import { createSlice } from "@reduxjs/toolkit";

interface AuthSliceState {
    isAuthenticated: boolean
}

const INITIAL_STATE: AuthSliceState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true"
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", "true");
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.setItem("isAuthenticated", "false");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
