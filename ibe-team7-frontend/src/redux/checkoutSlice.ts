import { createSlice } from "@reduxjs/toolkit";

interface RoomCheckout {
    room: string;
    price: number;
    quantity: number;
}

interface CheckoutState {
    checkout: {
        cart: RoomCheckout[];
        total: number;
    };
}

const initialState: CheckoutState = {
    checkout: {
        cart: [],
        total: 0,
    },
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.checkout.cart.push(action.payload);
        },
        setCart: (state, action) => {
            state.checkout.cart = action.payload;
        },
        setTotal: (state, action) => {
            state.checkout.total = action.payload;
        },
    },
});

export const { addToCart, setCart, setTotal } = checkoutSlice.actions;

export default checkoutSlice.reducer;
