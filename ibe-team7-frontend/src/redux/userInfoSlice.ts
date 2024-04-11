import { createSlice } from "@reduxjs/toolkit";

interface UserInfo {
    firstNameTraveler: string;
    lastNameTraveler: string;
    phoneTraveler: string;
    emailTraveler: string;
    firstNameBilling: string;
    lastNameBilling: string;
    address1: string;
    address2: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    phoneBilling: string;
    emailBilling: string;
    cardNumber: string;
    exMonth: string;
    exYear: string;
}

const initialState: UserInfo = {
    firstNameTraveler: "",
    lastNameTraveler: "",
    phoneTraveler: "",
    emailTraveler: "",
    firstNameBilling: "",
    lastNameBilling: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    phoneBilling: "",
    emailBilling: "",
    cardNumber: "",
    exMonth: "",
    exYear: "",
};

const userInfoSlice = createSlice({
    name: "userInfo",

    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.firstNameTraveler = action.payload.firstNameTraveler;
            state.lastNameTraveler = action.payload.lastNameTraveler;
            state.phoneTraveler = action.payload.phoneTraveler;
            state.emailTraveler = action.payload.emailTraveler;
            state.firstNameBilling = action.payload.firstNameBilling;
            state.lastNameBilling = action.payload.lastNameBilling;
            state.address1 = action.payload.address1;
            state.address2 = action.payload.address2;
            state.country = action.payload.country;
            state.city = action.payload.city;
            state.state = action.payload.state;
            state.zip = action.payload.zip;
            state.phoneBilling = action.payload.phoneBilling;
            state.emailBilling = action.payload.emailBilling;
            state.cardNumber = action.payload.cardNumber;
            state.exMonth = action.payload.exMonth;
            state.exYear = action.payload.exYear;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
