import { createSlice } from "@reduxjs/toolkit";

const awsSlice = createSlice({
    name: "aws",
    initialState: {
        accessKeyId: null,
        secretAccessKey: null,
        sessionToken: null,
    },
    reducers: {
        setAws: (state, action) => {
            state.accessKeyId = action.payload.accessKeyId;
            state.secretAccessKey = action.payload.secretAccessKey;
            state.sessionToken = action.payload.sessionToken;
        },
    },
});

export const { setAws } = awsSlice.actions;

export default awsSlice.reducer;
