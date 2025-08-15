import {configureStore} from "@reduxjs/toolkit";
import reducer from "./authSlice";

const store = configureStore({
    reducer:{
        auth:reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;