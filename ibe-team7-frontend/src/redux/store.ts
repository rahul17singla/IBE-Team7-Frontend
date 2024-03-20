import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
