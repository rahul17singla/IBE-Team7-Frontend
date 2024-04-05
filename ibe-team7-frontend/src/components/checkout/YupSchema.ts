import * as Yup from "yup";

export const travellerInfoSchema = Yup.object().shape({
    firstNameTraveler: Yup.string().required("First Name is required"),
    phoneTraveler: Yup.string()
        .required("Phone is required")
        .length(10)
        .matches(/^[0-9]+$/, "Phone number must be numeric"),
    emailTraveler: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
});

export const billingInfoSchema = Yup.object().shape({
    firstNameBilling: Yup.string().required("First Name is required"),
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
