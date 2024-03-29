import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: {
            cart: [],
            total: 0,
        },
    },
    reducers: {
        setCart: (state, action) => {
            state.checkout.cart = action.payload;
        },
        setTotal: (state, action) => {
            state.checkout.total = action.payload;
        },
    },
});

export const { setCart, setTotal } = checkoutSlice.actions;

export default checkoutSlice.reducer;
