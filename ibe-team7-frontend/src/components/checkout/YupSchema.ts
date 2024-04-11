import * as Yup from "yup";

export const travellerInfoSchema = Yup.object().shape({
    firstNameTraveler: Yup.string()
        .matches(/^[a-zA-Z]+$/, "First Name must be alphabetic")
        .required("First Name is required"),
    lastNameTraveler: Yup.string().matches(
        /^[a-zA-Z]+$/,
        "Last Name must be alphabetic"
    ),
    phoneTraveler: Yup.string()
        .required("Phone is required")
        .length(10)
        .matches(/^[0-9]+$/, "Phone number must be numeric"),
    emailTraveler: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
});

export const billingInfoSchema = Yup.object().shape({
    firstNameBilling: Yup.string()
        .matches(/^[a-zA-Z]+$/, "First Name must be alphabetic")
        .required("First Name is required"),
    lastNameBilling: Yup.string().matches(
        /^[a-zA-Z]+$/,
        "Last Name must be alphabetic"
    ),
    address1: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("ZIP is required"),
    phoneBilling: Yup.string()
        .required("Phone is required")
        .length(10)
        .matches(/^[0-9]+$/, "Phone number must be numeric"),
    emailBilling: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
});

export const paymentInfoSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .required("Card Number is required")
        .length(16)
        .matches(/^[0-9]+$/, "Card number must be numeric"),

    cvv: Yup.string()
        .required("CVV is required")
        .length(3)
        .matches(/^[0-9]+$/, "CVV must be numeric"),
});
