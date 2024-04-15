import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: "timer",
    initialState: {
        minutes: 10,
        seconds: 0,
    },
    reducers: {
        setTimer: (state, action) => {
            state.minutes = action.payload.minutes;
            state.seconds = action.payload.seconds;
        },
        setMinutes: (state, action) => {
            state.minutes = action.payload;
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
    },
});

export const { setTimer, setSeconds, setMinutes } = timerSlice.actions;
export default timerSlice.reducer;
