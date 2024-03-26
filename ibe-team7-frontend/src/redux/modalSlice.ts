import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    room: {} as any,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.open = action.payload;
        },
        setRoom: (state, action) => {
            state.room = action.payload;
        },
    },
});

export const { setModal, setRoom } = modalSlice.actions;

export default modalSlice.reducer;
