import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: true,
    reducers: {
        setLoading: (_, action) => {
            return action.payload;
        },
    },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
