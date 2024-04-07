import { createSlice } from "@reduxjs/toolkit";

interface RoomCheckout {
    room: string;
    price: number;
    quantity: number;
}

interface CheckoutState {
    checkout: {
        cart: RoomCheckout;
        roomTotal: number;
        total: number;
        showItinerary: boolean;
    };
}

const initialState: CheckoutState = {
    checkout: {
        cart: {
            room: "",
            price: 0,
            quantity: 0,
        },
        roomTotal: 0,
        total: 0,
        showItinerary: false,
    },
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.checkout.cart = action.payload;
        },
        setCart: (state, action) => {
            state.checkout.cart = action.payload;
        },
        setTotal: (state, action) => {
            state.checkout.total = action.payload;
        },
        setRoomTotal: (state, action) => {
            state.checkout.roomTotal = action.payload;
        },
        setShowItinerary: (state, action) => {
            state.checkout.showItinerary = action.payload;
        },
    },
});

export const { addToCart, setCart, setTotal, setRoomTotal, setShowItinerary } =
    checkoutSlice.actions;

export default checkoutSlice.reducer;
