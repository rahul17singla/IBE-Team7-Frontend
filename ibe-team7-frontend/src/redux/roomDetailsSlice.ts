import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RoomDetails } from "../types/RoomDetails";

const initialState: RoomDetails[] = [];

const RoomDetailsSlice = createSlice({
    name: "roomdetails",
    initialState,
    reducers: {
        setRoomDetails: (_, action: PayloadAction<RoomDetails[]>) => {
            return action.payload; // Replace state with the payload
        },
        setRoomTypeName: (state, action: PayloadAction<string>) => {
            state.forEach((room) => {
                room.roomTypeName = action.payload;
            });
        },
        setMaxCapacity: (state, action: PayloadAction<number>) => {
            state.forEach((room) => {
                room.maxCapacity = action.payload;
            });
        },
        setArea: (state, action: PayloadAction<number>) => {
            state.forEach((room) => {
                room.area = action.payload;
            });
        },
        setSingleBed: (state, action: PayloadAction<number>) => {
            state.forEach((room) => {
                room.singleBed = action.payload;
            });
        },
        setDoubleBed: (state, action: PayloadAction<number>) => {
            state.forEach((room) => {
                room.doubleBed = action.payload;
            });
        },
        setAvgPrice: (state, action: PayloadAction<number>) => {
            state.forEach((room) => {
                room.avgPrice = action.payload;
            });
        },
    },
});

// Export actions and reducer
export const {
    setRoomDetails,
    setArea,
    setAvgPrice,
    setDoubleBed,
    setMaxCapacity,
    setRoomTypeName,
    setSingleBed,
} = RoomDetailsSlice.actions;

export default RoomDetailsSlice.reducer;
