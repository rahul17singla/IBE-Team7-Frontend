import { createSlice } from "@reduxjs/toolkit";

interface ResultFilters {
    roomType: string[];
    bedType: string[];
    priceLessThan: number;
    sort:number
}

const initialState: ResultFilters = {
    roomType: [],
    bedType: [],
    priceLessThan: 1000000,
    sort:0,
};

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setRoomType(state, action) {
            state.roomType = [...state.roomType, action.payload];
        },
        removeRoomType(state, action) {
            state.roomType = state.roomType.filter(
                (roomType) => roomType !== action.payload
            );
        },
        setBedType(state, action) {
            state.bedType = [...state.bedType, action.payload];
        },
        removeBedType(state, action) {
            state.bedType = state.bedType.filter(
                (bedType) => bedType !== action.payload
            );
        },
        setPriceLessThan(state, action) {
            state.priceLessThan = action.payload;
        },
        setSort(state, action){
            state.sort= action.payload;
        }
    },
});

export const {
    setBedType,
    removeBedType,
    removeRoomType,
    setPriceLessThan,
    setRoomType,
    setSort
} = resultSlice.actions;

export default resultSlice.reducer;
