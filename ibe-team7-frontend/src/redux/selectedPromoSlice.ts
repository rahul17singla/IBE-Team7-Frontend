import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPromotionName: "",
    selectedPromotionDescription: "",
};

const selectedPromoSlice = createSlice({
    name: "selectedPromo",
    initialState,
    reducers: {
        setSelectedPromotionName: (state, action) => {
            state.selectedPromotionName = action.payload;
        },
        setSelectedPromotionDescription: (state, action) => {
            state.selectedPromotionDescription = action.payload;
        },
    },
});

export const { setSelectedPromotionName, setSelectedPromotionDescription } =
    selectedPromoSlice.actions;

export default selectedPromoSlice.reducer;
