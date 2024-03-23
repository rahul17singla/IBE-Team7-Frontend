import { createSlice } from "@reduxjs/toolkit";
import { FilterStates } from "../types/FilterStates";

const initialState: FilterStates = {
    property: "7",
    property3: "1",
    beds: "1",
    checkboxChecked: false,
    startDate: undefined,
    endDate: undefined,
    guestsAdult: 1,
    guestsTeens: 0,
    guestsChildren: 0,
    showGuests: false,
    showGuestFeature: true,
    showChair: true,
    showAdult: true,
    showTeen: true,
    showKid: true,
    maxGuests: 10,
    maxRooms: 5,
    data: [],
    rooms: [],
    roomsShow: true,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setProperty: (state, action) => {
            state.property = action.payload;
        },
        setProperty3: (state, action) => {
            state.property3 = action.payload;
        },
        setBeds: (state, action) => {
            state.beds = action.payload;
        },
        setCheckboxChecked: (state, action) => {
            state.checkboxChecked = action.payload;
        },

        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },

        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },

        setGuestsAdult: (state, action) => {
            state.guestsAdult = action.payload;
        },

        setGuestsTeens: (state, action) => {
            state.guestsTeens = action.payload;
        },

        setGuestsChildren: (state, action) => {
            state.guestsChildren = action.payload;
        },

        setShowGuests: (state, action) => {
            state.showGuests = action.payload;
        },

        setShowGuestFeature: (state, action) => {
            state.showGuestFeature = action.payload;
        },

        setShowChair: (state, action) => {
            state.showChair = action.payload;
        },

        setShowAdult: (state, action) => {
            state.showAdult = action.payload;
        },

        setShowTeen: (state, action) => {
            state.showTeen = action.payload;
        },

        setShowKid: (state, action) => {
            state.showKid = action.payload;
        },

        setMaxGuests: (state, action) => {
            state.maxGuests = action.payload;
        },

        setMaxRooms: (state, action) => {
            state.maxRooms = action.payload;
        },

        setData: (state, action) => {
            state.data = action.payload;
        },

        setRooms: (state, action) => {
            state.rooms = action.payload;
        },

        setRoomsShow: (state, action) => {
            state.roomsShow = action.payload;
        },
    },
});

export const {
    setProperty,
    setProperty3,
    setBeds,
    setCheckboxChecked,
    setData,
    setEndDate,
    setGuestsAdult,
    setGuestsChildren,
    setGuestsTeens,
    setMaxGuests,
    setMaxRooms,
    setRooms,
    setRoomsShow,
    setShowAdult,
    setShowChair,
    setShowGuestFeature,
    setShowGuests,
    setShowKid,
    setShowTeen,
    setStartDate,
} = filterSlice.actions;

export default filterSlice.reducer;
