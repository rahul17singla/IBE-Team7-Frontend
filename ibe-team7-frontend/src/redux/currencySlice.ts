import { createSlice } from "@reduxjs/toolkit";
import { Currency } from "../types/Currency";

const initialState: Currency = {
    currency: "USD",
    value: 1,
};

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload.currency;
            state.value = action.payload.value;
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
