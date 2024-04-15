import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";
import resultReducer from "./resultSlice";
import roomDetailsReducer from "./roomDetailsSlice";
import { useDispatch } from "react-redux";
import checkoutReducer from "./checkoutSlice";
import userInfoReducer from "./userInfoSlice";
import selectedPromoReducer from "./selectedPromoSlice";
import timerReducer from "./timerSlice";
import awsReducer from "./awsSlice";

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        user: userReducer,
        filterStates: searchReducer,
        results: resultReducer,
        roomDetails: roomDetailsReducer,
        checkout: checkoutReducer,
        userInfo: userInfoReducer,
        selectedPromo: selectedPromoReducer,
        timer: timerReducer,
        aws: awsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
