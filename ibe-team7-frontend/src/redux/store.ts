import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";
import resultReducer from "./resultSlice";
import roomDetailsReducer from "./roomDetailsSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        user: userReducer,
        filterStates: searchReducer,
        results: resultReducer,
        roomDetails: roomDetailsReducer,
        loading: loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
