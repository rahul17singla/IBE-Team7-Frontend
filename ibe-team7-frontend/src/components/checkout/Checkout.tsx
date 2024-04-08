import { useEffect, useState } from "react";
import { Step, StepButton, Stepper } from "@mui/material";
import { Itinerary } from "../itinerary/Itinerary";
import "./Checkout.scss";
import { BACKEND_URL, GEO_API_KEY } from "../../constants/Constants";
import {
    billingInfoSchema,
    travellerInfoSchema,
    paymentInfoSchema,
} from "./YupSchema";
import axios from "axios";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Checkout = () => {
    const steps = ["Choose Room", "Choose add on", "Checkout"];
    const navigate = useNavigate();

    const [activeStep] = useState(2);
    const [completed] = useState<{ [k: number]: boolean }>({});

    const [showTravelerInfo, setShowTravelerInfo] = useState(true);
    const [showBillingInfo, setShowBillingInfo] = useState(false);
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);

    const [firstNameTraveler, setFirstNameTraveler] = useState("");
    const [lastNameTraveler, setLastNameTraveler] = useState("");
    const [phoneTraveler, setPhoneTraveler] = useState("");
    const [emailTraveler, setEmailTraveler] = useState("");

    const [firstNameBilling, setFirstNameBilling] = useState("");
    const [lastNameBilling, setLastNameBilling] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phoneBilling, setPhoneBilling] = useState("");
    const [emailBilling, setEmailBilling] = useState("");

    const [isTnCChecked, setIsTnCChecked] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [exMonth, setExMonth] = useState("");
    const [exYear, setExYear] = useState("");

    // const [isAddress2Present, setIsAddress2Present] = useState(false);
    // const [isPhoneBillingPresent, setIsPhoneBillingPresent] = useState(false);
    // const [isEmailBillingPresent, setIsEmailBillingPresent] = useState(false);

    const [countryid, setCountryid] = useState("");
    const [stateid, setStateid] = useState("");
    const [cityid, setCityid] = useState("");

    const [countriesList, setCountriesList] = useState<any>([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    // const completeBooking = () => {
    //     // if user not logged in, redirect to login page
    //     // get email from cognito
    //     const email = alert(
    //         "Booking Completed. Please check your email for review and rating."
    //     );

    //     // send email using AWS SES and triggerered by AWS Lambda
    //     axios.post(`${BACKEND_URL}/send-email`, {
    //         email: email,
    //         subject: "Booking Confirmation",
    //         message: "Booking Confirmed",
    //     });
    // };

    const roomCart = useSelector(
        (state: RootState) => state.checkout.checkout.cart
    );

    const { selectedPromotionName, selectedPromotionDescription } = useSelector(
        (state: RootState) => state.selectedPromo
    );

    const startDate = useSelector(
        (state: RootState) => state.filterStates.startDate
    );

    const endDate = useSelector(
        (state: RootState) => state.filterStates.endDate
    );

    const handleTravelerInfo = async () => {
        const travellerInfoError =
            document.getElementById("travellerInfoError");

        try {
            await travellerInfoSchema.validate(
                {
                    firstNameTraveler,
                    lastNameTraveler,
                    phoneTraveler,
                    emailTraveler,
                },
                { abortEarly: false }
            );

            const response = await axios.post(
                `${BACKEND_URL}/api/v1/validatetravelerinfo`,
                {
                    // body: {
                    firstName: firstNameTraveler,
                    lastName: lastNameTraveler,
                    phoneNo: phoneTraveler,
                    emailId: emailTraveler,
                    // },
                }
            );

            if (response.data !== "Valid traveler information") {
                alert(response.data);
                return;
            }
            setShowTravelerInfo(false);
            setShowBillingInfo(true);
            setShowPaymentInfo(false);
        } catch (error) {
            // alert("Enter All Fields Correctly!");
            travellerInfoError?.classList.remove("hidden");
            console.log(error);
        }
    };

    const handleBillingInfo = async () => {
        const travellerInfoError =
            document.getElementById("travellerInfoError");

        try {
            await billingInfoSchema.validate(
                {
                    firstNameBilling,
                    lastNameBilling,
                    address1,
                    country,
                    city,
                    state,
                    zip,
                    phoneBilling,
                    emailBilling,
                },
                { abortEarly: false }
            );

            const response = await axios.post(
                `${BACKEND_URL}/api/v1/validatebillinginfo`,
                {
                    // params: {
                    firstName: firstNameBilling,
                    lastName: lastNameBilling,
                    mailingAddress1: address1,
                    mailingAddress2: address2,
                    country: countryid,
                    state: stateid,
                    city: cityid,
                    zip: zip,
                    phoneNo: phoneBilling,
                    emailId: emailBilling,
                    // },
                }
            );

            if (response.data !== "Valid billing information") {
                alert(response.data);
                return;
            }

            setShowTravelerInfo(false);
            setShowBillingInfo(false);
            setShowPaymentInfo(true);
        } catch (error) {
            // alert("Enter All Fields Correctly!");
            travellerInfoError?.classList.remove("hidden");
            console.log(error);
        }
    };

    const roomTotalPrice = useSelector(
        (state: RootState) => state.checkout.checkout.roomTotal
    );

    const handlePaymentInfo = async () => {
        if (!isTnCChecked) {
            alert("Please agree to the Terms and Conditions");
            return;
        }
        const currentYear = new Date().getFullYear();
        if (
            parseInt(exMonth) < 1 ||
            parseInt(exMonth) > 12 ||
            currentYear > parseInt(exYear)
        ) {
            alert("Please enter correct payment details!");
            return;
        }
        try {
            await paymentInfoSchema.validate(
                {
                    cardNumber,
                    cvv,
                },
                { abortEarly: false }
            );
        } catch (error) {
            alert("Please enter correct payment details!");
            console.log(error);
            return;
        }

        const response = await axios.post(
            `${BACKEND_URL}/api/v1/validatepaymentinfo`,
            {
                // params: {
                cardNo: cardNumber,
                expiryMonth: exMonth,
                expiryYear: exYear,
                // },
            }
        );

        if (response.data !== "Valid payment info") {
            alert(response.data);
            return;
        }

        await axios.post(`${BACKEND_URL}/api/v1/roomsummary`, {
            roomTotalPrice,
            selectedPromotionName,
            selectedPromotionDescription,
            startDate,
            endDate,
        });

        const response2 = await axios.get(
            `${BACKEND_URL}/api/v1/createbooking`,
            {
                params: {
                    roomTypeName: roomCart.room,
                },
            }
        );

        if (response2.data === "Booking failed") {
            alert("Booking failed. Please try again.");
            navigate("/");
            return;
        }

        // const bookingId = response2.data;

        const resultUrl = `/confirmation/${response2.data}`;

        navigate(resultUrl);
    };

    const handleBackToTravelerInfo = () => {
        setShowTravelerInfo(true);
        setShowBillingInfo(false);
        setShowPaymentInfo(false);
    };

    const getStatesOfCountry = (isoCountry: string) => {
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", GEO_API_KEY);

        const requestOptions: any = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };

        fetch(
            `https://api.countrystatecity.in/v1/countries/${isoCountry}/states`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                result.sort((a: any, b: any) => a.name.localeCompare(b.name));
                setStateList(result);
            })
            .catch((error) => console.log("error", error));
    };

    const getCitiesOfState = (isoState: string) => {
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", GEO_API_KEY);

        const requestOptions: any = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };

        fetch(
            `https://api.countrystatecity.in/v1/countries/${country}/states/${isoState}/cities`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                result.sort((a: any, b: any) => a.name.localeCompare(b.name));
                setCityList(result);
            })
            .catch((error) => console.log("error", error));
    };

    const validateZip = async () => {
        const results = await fetch(
            `https://app.zipcodebase.com/api/v1/search?apikey=648ec660-f24f-11ee-952e-89579ca1f9b8&codes=${zip}`
        );

        const data = await results.json();
        const postalArray = data.results;
        const stateFromZip = postalArray[zip][0].state;
        const cityFromZip = postalArray[zip][0].province;

        if (stateFromZip !== stateid || cityFromZip !== cityid) {
            alert("Invalid Zip Code");
            setZip("");
        }
    };

    const handleBackToBillingInfo = () => {
        setShowTravelerInfo(false);
        setShowBillingInfo(true);
        setShowPaymentInfo(false);
    };

    useEffect(() => {
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", GEO_API_KEY);

        const requestOptions: any = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };

        fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                setCountriesList(result);
            })
            .catch((error) => console.log("error", error));

        // config file using thunk
    }, []);

    return (
        <div>
            <div className="options">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit">{label}</StepButton>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className="checkout-text">Payment Info</div>
            <div className="checkout">
                <div className="checkout-form">
                    <div className="traveler_info">
                        <button
                            className="checkout-form_headingBtn"
                            // onClick={toggleTravelerInfo}
                        >
                            1. Traveler Info
                        </button>
                        {showTravelerInfo && (
                            <>
                                <div className="checkout-form_inputs">
                                    <div className="checkout-form_input">
                                        <label htmlFor="firstNameTraveler">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstNameTraveler"
                                            name="firstNameTraveler"
                                            value={firstNameTraveler}
                                            onChange={(e) =>
                                                setFirstNameTraveler(
                                                    e.target.value
                                                )
                                            }
                                            tabIndex={1}
                                        />
                                        <label htmlFor="phoneTraveler">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneTraveler"
                                            name="phoneTraveler"
                                            value={phoneTraveler}
                                            onChange={(e) =>
                                                setPhoneTraveler(e.target.value)
                                            }
                                            tabIndex={3}
                                        />
                                        <label htmlFor="emailTraveler">
                                            Email
                                        </label>
                                        <input
                                            type="emailTraveler"
                                            id="emailTraveler"
                                            name="emailTraveler"
                                            value={emailTraveler}
                                            onChange={(e) =>
                                                setEmailTraveler(e.target.value)
                                            }
                                            tabIndex={4}
                                        />
                                    </div>
                                    <div className="checkout-form_input">
                                        <label htmlFor="lastNameTraveler">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastNameTraveler"
                                            name="lastNameTraveler"
                                            value={lastNameTraveler}
                                            onChange={(e) =>
                                                setLastNameTraveler(
                                                    e.target.value
                                                )
                                            }
                                            tabIndex={2}
                                        />
                                    </div>
                                </div>
                                <div className="checkout-form_nextButton">
                                    <div className="errorAndNextBtn">
                                        <div
                                            id="travellerInfoError"
                                            className="hidden"
                                        >
                                            Enter All Fields Correctly!
                                        </div>
                                        <button
                                            className="checkout-form_nextBtn"
                                            onClick={handleTravelerInfo}
                                        >
                                            NEXT: BILLING INFO
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="billing_info">
                        <button
                            className="checkout-form_headingBtn"
                            // onClick={toggleBillingInfo}
                        >
                            2. Billing Info
                        </button>
                        {showBillingInfo && (
                            <>
                                <div className="checkout-form_inputs">
                                    <div className="checkout-form_input">
                                        <label htmlFor="firstNameBilling">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstNameBilling"
                                            name="firstNameBilling"
                                            value={firstNameBilling}
                                            onChange={(e) =>
                                                setFirstNameBilling(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <label htmlFor="address1Billing">
                                            Mailing Address 1
                                        </label>
                                        <input
                                            type="text"
                                            id="address1Billing"
                                            name="address1Billing"
                                            value={address1}
                                            onChange={(e) =>
                                                setAddress1(e.target.value)
                                            }
                                        />
                                        <label htmlFor="country">Country</label>
                                        <select
                                            id="country"
                                            name="country"
                                            onChange={(e: any) => {
                                                const country: any =
                                                    countriesList[
                                                        e.target.value
                                                    ];
                                                if (country === undefined) {
                                                    setStateList([]);
                                                    setCityList([]);
                                                    return;
                                                }
                                                setCountry(country.iso2);
                                                setCountryid(country.name);
                                                setCityList([]);
                                                getStatesOfCountry(
                                                    country.iso2
                                                );
                                            }}
                                            value={countriesList.findIndex(
                                                (country: any) =>
                                                    country.name === countryid
                                            )}
                                        >
                                            <option value="select">
                                                Select
                                            </option>
                                            {countriesList.map(
                                                (
                                                    country: any,
                                                    index: number
                                                ) => (
                                                    <option
                                                        key={index}
                                                        value={index}
                                                    >
                                                        {country.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <label htmlFor="city">City</label>
                                        <select
                                            id="city"
                                            name="city"
                                            onChange={(e: any) => {
                                                const city: any =
                                                    cityList[e.target.value];
                                                setCity(city.name);
                                                setCityid(city.name);
                                            }}
                                            value={cityList.findIndex(
                                                (city: any) =>
                                                    city.name === cityid
                                            )}
                                        >
                                            {cityList.map(
                                                (item: any, index) => (
                                                    <option
                                                        key={index}
                                                        value={index}
                                                    >
                                                        {item.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <label htmlFor="phoneBilling">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneBilling"
                                            name="phoneBilling"
                                            value={phoneBilling}
                                            onChange={(e) =>
                                                setPhoneBilling(e.target.value)
                                            }
                                        />
                                        <label htmlFor="emailBilling">
                                            Email
                                        </label>
                                        <input
                                            type="emailBilling"
                                            id="emailBilling"
                                            name="emailBilling"
                                            value={emailBilling}
                                            onChange={(e) =>
                                                setEmailBilling(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="checkout-form_input">
                                        <label htmlFor="lastNameBilling">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastNameBilling"
                                            name="lastNameBilling"
                                            value={lastNameBilling}
                                            onChange={(e) =>
                                                setLastNameBilling(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <label htmlFor="address2Billing">
                                            Mailing Address 2
                                        </label>
                                        <input
                                            type="text"
                                            id="address2Billing"
                                            name="address2Billing"
                                            value={address2}
                                            onChange={(e) =>
                                                setAddress2(e.target.value)
                                            }
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: "1rem",
                                                width: "100%",
                                            }}
                                        >
                                            <div className="checkout-form_input">
                                                <label htmlFor="state">
                                                    State
                                                </label>
                                                <select
                                                    name="state"
                                                    id="state"
                                                    onChange={(e: any) => {
                                                        const state: any =
                                                            stateList[
                                                                e.target.value
                                                            ];
                                                        setStateid(state.name);
                                                        setState(state.iso2);
                                                        getCitiesOfState(
                                                            state.iso2
                                                        );
                                                    }}
                                                    value={stateList.findIndex(
                                                        (state: any) =>
                                                            state.name ===
                                                            stateid
                                                    )}
                                                >
                                                    {stateList.map(
                                                        (item: any, index) => (
                                                            <option
                                                                key={index}
                                                                value={index}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="checkout-form_input">
                                                <label htmlFor="zip">Zip</label>
                                                <input
                                                    type="text"
                                                    id="zip"
                                                    name="zip"
                                                    value={zip}
                                                    onChange={(e) =>
                                                        setZip(e.target.value)
                                                    }
                                                    onBlur={validateZip}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout-form_nextButton">
                                    <div className="errorAndNextBtn">
                                        <div
                                            id="travellerInfoError"
                                            className="hidden"
                                        >
                                            Enter All Fields Correctly!
                                        </div>
                                        <div>
                                            <button
                                                onClick={
                                                    handleBackToTravelerInfo
                                                }
                                                className="checkout-form_backBtn"
                                            >
                                                Edit Traveler Info.
                                            </button>
                                            <button
                                                className="checkout-form_nextBtn"
                                                onClick={handleBillingInfo}
                                            >
                                                NEXT: PAYMENT INFO
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="payment_info">
                        <button
                            className="checkout-form_headingBtn"
                            // onClick={togglePaymentInfo}
                        >
                            3. Payment Info
                        </button>
                        {showPaymentInfo && (
                            <>
                                <div className="checkout-form_inputs">
                                    <div className="checkout-form_input">
                                        <label htmlFor="cardNumber">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            onChange={(e) =>
                                                setCardNumber(e.target.value)
                                            }
                                            value={cardNumber}
                                        />
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="password"
                                            id="cvv"
                                            name="cvv"
                                            style={{ width: "50%" }}
                                            onChange={(e) =>
                                                setCvv(e.target.value)
                                            }
                                            value={cvv}
                                        />
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="tnc"
                                                id="tnc"
                                                onClick={() =>
                                                    setIsTnCChecked(
                                                        !isTnCChecked
                                                    )
                                                }
                                                checked={isTnCChecked}
                                            />{" "}
                                            <label htmlFor="tnc">
                                                I agree to the{" "}
                                                <button className="tnc">
                                                    Terms and Policies
                                                </button>
                                                of travel.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="checkout-form_input">
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: "1rem",
                                                width: "100%",
                                            }}
                                        >
                                            <div className="checkout-form_input">
                                                <label htmlFor="expmm">
                                                    Exp MM
                                                </label>
                                                <input
                                                    type="text"
                                                    name="expmm"
                                                    id="expmm"
                                                    onChange={(e) =>
                                                        setExMonth(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={exMonth}
                                                />
                                            </div>
                                            <div className="checkout-form_input">
                                                <label htmlFor="expyy">
                                                    Exp YY
                                                </label>
                                                <input
                                                    type="text"
                                                    id="expyy"
                                                    name="expyy"
                                                    onChange={(e) =>
                                                        setExYear(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={exYear}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="checkout-form_nextButton">
                                    <div className="errorAndNextBtn">
                                        <div
                                            id="travellerInfoError"
                                            className="hidden"
                                        >
                                            Enter All Fields Correctly!
                                        </div>
                                        <div>
                                            <button
                                                onClick={
                                                    handleBackToBillingInfo
                                                }
                                                className="checkout-form_backBtn"
                                            >
                                                Edit Billing Info.
                                            </button>
                                            <button
                                                className="checkout-form_nextBtn"
                                                onClick={handlePaymentInfo}
                                            >
                                                PURCHASE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Itinerary />
            </div>
        </div>
    );
};
