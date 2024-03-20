import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";

const initialState: User = {
    email: "",
    accessToken: "",
    idToken: "",
    refreshToken: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.idToken = action.payload.idToken;
            state.refreshToken = action.payload.refreshToken;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
