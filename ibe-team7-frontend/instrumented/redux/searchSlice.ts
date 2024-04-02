import { createSlice } from "@reduxjs/toolkit";
import { FilterStates } from "../types/FilterStates";
import fetchConfig from "./thunks/configThunk";
import fetchData from "./thunks/propertyThunk";

const initialState: FilterStates = {
    property: "Team 7 Hotel",
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
    loading: "pending",
    propertyLoading: "pending",
    error: undefined,
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
    extraReducers: (builder) => {
        builder.addCase(fetchConfig.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(fetchConfig.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.roomsShow = action.payload.rooms.show;
            state.showGuestFeature = action.payload.guests.show;
            state.showChair = action.payload.wheelchair.show;
            state.showAdult = action.payload.guests.guestsType.adults;
            state.showTeen = action.payload.guests.guestsType.teens;
            state.showKid = action.payload.guests.guestsType.kids;
            state.maxGuests = action.payload.guests.maxNumberOfGuests;
            state.maxRooms = action.payload.rooms.maxNumberOfRooms;
        });
        builder.addCase(fetchConfig.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message;
        });
        builder.addCase(fetchData.pending, (state) => {
            state.propertyLoading = "pending";
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.propertyLoading = "succeeded";
            state.data = action.payload;
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.propertyLoading = "failed";
            state.error = action.error.message;
        });
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
