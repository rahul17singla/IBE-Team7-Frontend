import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";
import resultReducer from "./resultSlice";

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        user: userReducer,
        filterStates: searchReducer,
        results: resultReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
