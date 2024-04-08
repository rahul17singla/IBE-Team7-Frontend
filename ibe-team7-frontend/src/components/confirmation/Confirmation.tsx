import "./Confirmation.scss";
import { useParams } from "react-router-dom";
import user from "../../assets/user.svg";
import image from "../../assets/confirm.png";
import { styled, Typography } from "@mui/material";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { OTPModal } from "./OTPModal";
import { SES } from "@aws-sdk/client-ses";
import { Html } from "@react-email/html";
import { BACKEND_URL, FRONTEND_URL } from "../../constants/Constants";
import { render } from "@react-email/render";
import axios from "axios";
import { Currency, Months } from "../../enums/Enums";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const Confirmation = () => {
    const { id } = useParams();
    // const roomTotalPrice = useSelector(
    //     (state: RootState) => state.checkout.checkout.roomTotal
    // );

    const bookingBoxRef = useRef(null);
    const [cancelBooking, setCancelBooking] = useState(false);
    // const [sendEmail, setSendEmail] = useState(false);
    const [expanded, setExpanded] = useState<string | boolean>("panel1");
    const [otp, setOtp] = useState(0);
    const [cardNumber, setCardNumber] = useState("");
    const [expMonth, setexpMonth] = useState("");
    const [expYear, setexpYear] = useState("");
    const [billingEmail, setBillingEmail] = useState("");
    const [billingPhone, setBillingPhone] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [billingFirstName, setBillingFirstName] = useState("");
    const [billingLastName, setBillingLastName] = useState("");
    const [travelerFirstName, setTravelerFirstName] = useState("");
    const [travelerLastName, setTravelerLastName] = useState("");
    const [travelerEmail, setTravelerEmail] = useState("");
    const [travelerPhone, setTravelerPhone] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");

    const [promotionTitle, setPromotionTitle] = useState("");
    const [promotionText, setPromotionText] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);

    const [noOfDaysToStay, setNoOfDaysToStay] = useState(0);

    const currencyValue = useSelector(
        (state: RootState) => state.currency.value
    );

    const currencyType = useSelector(
        (state: RootState) => state.currency.currency
    );

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const toggleAll = (val: string | boolean) => {
        setExpanded(val);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${BACKEND_URL}/api/v1/confirmation/${id}`
            );

            if (response === null || response.data === null) {
                alert("Booking not found");
                window.location.href = "/";
            }

            console.log(response.data);
            setCardNumber(response.data.paymentInfoEntity.cardNo);
            setexpMonth(response.data.paymentInfoEntity.expiryMonth);
            setexpYear(response.data.paymentInfoEntity.expiryYear);
            setBillingEmail(response.data.billingInfoEntity.emailId);
            setBillingPhone(response.data.billingInfoEntity.phoneNo);
            setAddress1(response.data.billingInfoEntity.mailingAddress1);
            setAddress2(response.data.billingInfoEntity.mailingAddress2);

            setCity(response.data.billingInfoEntity.city);
            setState(response.data.billingInfoEntity.state);
            setCountry(response.data.billingInfoEntity.country);
            setZip(response.data.billingInfoEntity.zip);
            setBillingFirstName(response.data.billingInfoEntity.firstName);
            setBillingLastName(response.data.billingInfoEntity.lastName);

            setTravelerFirstName(response.data.travelerInfoEntity.firstName);
            setTravelerLastName(response.data.travelerInfoEntity.lastName);
            setTravelerEmail(response.data.travelerInfoEntity.emailId);
            setTravelerPhone(response.data.travelerInfoEntity.phoneNo);

            const startDateFromDB = response.data.roomSummaryEntity.startDate;
            setStartDate(startDateFromDB.split("T")[0].split("-")[2]);
            setStartMonth(startDateFromDB.split("T")[0].split("-")[1]);
            setStartYear(startDateFromDB.split("T")[0].split("-")[0]);

            const endDateFromDB = response.data.roomSummaryEntity.endDate;
            setEndDate(endDateFromDB.split("T")[0].split("-")[2]);
            setEndMonth(endDateFromDB.split("T")[0].split("-")[1]);
            setEndYear(endDateFromDB.split("T")[0].split("-")[0]);

            const stayDays = Math.abs(
                new Date(endDateFromDB).getTime() -
                    new Date(startDateFromDB).getTime()
            );

            setNoOfDaysToStay(Math.ceil(stayDays / (1000 * 3600 * 24)));

            setPromotionTitle(response.data.roomSummaryEntity.promotionTitle);
            setPromotionText(
                response.data.roomSummaryEntity.promotionDescription
            );
            setTotalPrice(response.data.roomSummaryEntity.totalPrice);
        };

        fetchData();
    }, []);

    const handleCancel = () => {
        // generate random 6 digit otp
        const otpVal = Math.floor(100000 + Math.random() * 900000);
        setOtp(otpVal);

        // send otp to email
        const emailContent = render(
            <Html lang="en">
                Here is your OTP for cancellation of the booking.
                {otpVal}
            </Html>
        );

        const params = {
            Source: "arunain.mahant@kickdrumtech.com",
            Destination: {
                ToAddresses: [travelerEmail],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: emailContent,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "KICKDRUM - Booking Confirmation",
                },
            },
        };

        ses.sendEmail(params);

        setCancelBooking(!cancelBooking);
    };

    const handlePrint = () => {
        toggleAll(true);
        setTimeout(() => {
            reactToPrint();
        }, 10);
    };

    const reactToPrint = useReactToPrint({
        onBeforeGetContent: () => {
            toggleAll(true);
        },
        pageStyle: `@page {
            size: 8.5in 11.5in;
            margin: 0;
        }`,
        content: () => bookingBoxRef.current,
        documentTitle: "Booking Confirmation",
        removeAfterPrint: true,
        onAfterPrint: () => {
            toggleAll("panel1");
        },
    });

    const ses = new SES({
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
            sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN,
        },
        apiVersion: "2010-12-01",
        region: "ap-northeast-1",
    });

    const sendEmailFunc = () => {
        // get email id from cognito
        // get email id from redux store

        // const emailHtml = render(<Email />);
        const emailContent = render(
            <Html lang="en">
                Here is your booking confirmation link. You can download it from
                the page itself.
                <a href={`${FRONTEND_URL}/confirmation/${id}`}>
                    Click here to view
                </a>
            </Html>
        );

        const params = {
            Source: "arunain.mahant@kickdrumtech.com",
            Destination: {
                ToAddresses: [travelerEmail],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: emailContent,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "KICKDRUM - Booking Confirmation",
                },
            },
        };

        ses.sendEmail(params);

        alert("Email sent successfully");
    };

    return (
        <div className="confirmation-container" ref={bookingBoxRef}>
            <div className="confirm-header">
                <div className="confirm-header-text">
                    Upcoming reservation #{id}
                </div>
                <div className="confirm-header-btns">
                    <button
                        className="confirm-header-btn"
                        onClick={handlePrint}
                    >
                        Print
                    </button>
                    <button
                        className="confirm-header-btn"
                        onClick={sendEmailFunc}
                    >
                        Email
                    </button>
                    {/* {sendEmail && <Email url="https://google.com" />} */}
                </div>
            </div>
            <div className="confirm-content">
                <div className="confirm-content-header">
                    <div className="confirm-content-header-left">
                        <div className="confirm-content-header-left-text">
                            Room 1: Executive Room
                        </div>
                        <div style={{ color: "#5d5d5d" }}>
                            <img src={user} alt="user" /> 2 Adults
                        </div>
                    </div>
                    <div>
                        <button
                            className="confirm-header-btn"
                            onClick={handleCancel}
                        >
                            Cancel Room
                        </button>
                        {cancelBooking && (
                            <OTPModal
                                onClose={() => setCancelBooking(false)}
                                otpFromMail={otp}
                                bookingId={id}
                            />
                        )}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "1.5rem",
                        paddingBottom: "3%",
                        borderBottom: "1px solid gray",
                    }}
                >
                    <img src={image} alt="room-pic" />
                    <div className="confirmRoomDetails">
                        <div className="date-boxes">
                            <div className="date-box">
                                <div className="date-box-heading">Check-in</div>
                                <div className="date">{startDate}</div>
                                <div className="confirm-month-year">
                                    {Months[parseInt(startMonth) - 1]},{" "}
                                    {startYear}
                                </div>
                            </div>
                            <div className="date-box">
                                <div className="date-box-heading">
                                    Check-out
                                </div>
                                <div className="date">{endDate}</div>
                                <div className="confirm-month-year">
                                    {Months[parseInt(endMonth) - 1]}, {endYear}
                                </div>
                            </div>
                        </div>
                        <div className="confirm-promo">
                            <div className="confirm-promo-heading">
                                {promotionTitle}
                            </div>
                            <div className="confirm-promo-text">
                                {promotionText}
                            </div>
                        </div>
                        <div className="confirm-total">
                            <div className="confirm-promo-text">
                                Copy explaining the cancellation policy, if
                                applicable
                            </div>
                            <div className="confirm-price">
                                {currencyType === Currency.USD
                                    ? `$${(totalPrice * currencyValue).toFixed(
                                          2
                                      )}`
                                    : `₹${(totalPrice * currencyValue).toFixed(
                                          2
                                      )}`}
                                /night
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <Accordion
                            defaultExpanded
                            expanded={
                                expanded === "panel1" || expanded === true
                            }
                            onChange={handleChange("panel1")}
                        >
                            <AccordionSummary
                                aria-controls="panel1d-content"
                                id="panel1d-header"
                            >
                                <Typography>
                                    <strong>Room total summary</strong>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div className="price-breakdown">
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Nightly rate
                                            </div>
                                            <div className="info-price">
                                                {currencyType === Currency.USD
                                                    ? `$${(
                                                          totalPrice *
                                                          currencyValue
                                                      ).toFixed(2)}`
                                                    : `₹${(
                                                          totalPrice *
                                                          currencyValue
                                                      ).toFixed(2)}`}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Subtotal
                                            </div>
                                            <div className="info-price">
                                                {currencyType === Currency.USD
                                                    ? `$${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          currencyValue
                                                      ).toFixed(2)}`
                                                    : `₹${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          currencyValue
                                                      ).toFixed(2)}`}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Taxes, Surcharges, Fees
                                            </div>
                                            <div className="info-price">
                                                {currencyType === Currency.USD
                                                    ? `$${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          0.18 *
                                                          currencyValue
                                                      ).toFixed(2)}`
                                                    : `₹${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          0.18 *
                                                          currencyValue
                                                      ).toFixed(2)}`}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                VAT
                                            </div>
                                            <div className="info-price">
                                                {currencyType === Currency.USD
                                                    ? `$${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          0.025 *
                                                          currencyValue
                                                      ).toFixed(2)}`
                                                    : `₹${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          0.025 *
                                                          currencyValue
                                                      ).toFixed(2)}`}
                                            </div>
                                        </div>
                                        <div className="total-for-stay">
                                            <div className="info-title">
                                                Total for stay
                                            </div>
                                            <div className="info-price">
                                                {currencyType === Currency.USD
                                                    ? `$${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          1.205 *
                                                          currencyValue
                                                      ).toFixed(2)}`
                                                    : `₹${(
                                                          totalPrice *
                                                          noOfDaysToStay *
                                                          1.205 *
                                                          currencyValue
                                                      ).toFixed(2)}`}
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            expanded={
                                expanded === "panel2" || expanded === true
                            }
                            onChange={handleChange("panel2")}
                        >
                            <AccordionSummary
                                aria-controls="panel2d-content"
                                id="panel2d-header"
                            >
                                <Typography>
                                    <strong>Guests Information</strong>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div className="price-breakdown">
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                First Name
                                            </div>
                                            <div className="info-price">
                                                {travelerFirstName}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Last Name
                                            </div>
                                            <div className="info-price">
                                                {travelerLastName}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Phone
                                            </div>
                                            <div className="info-price">
                                                {travelerPhone}
                                            </div>
                                        </div>
                                        <div className="email-info">
                                            <div className="info-email-title">
                                                Email
                                            </div>
                                            <div className="info-email">
                                                <p className="email-p">
                                                    {travelerEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            expanded={
                                expanded === "panel3" || expanded === true
                            }
                            onChange={handleChange("panel3")}
                        >
                            <AccordionSummary
                                aria-controls="panel3d-content"
                                id="panel3d-header"
                            >
                                <Typography>
                                    <strong>Billing Address</strong>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div className="price-breakdown">
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                First Name
                                            </div>
                                            <div className="info-price">
                                                {billingFirstName}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Last Name
                                            </div>
                                            <div className="info-price">
                                                {billingLastName}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Mailing Address1
                                            </div>
                                            <div className="info-price">
                                                {address1}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Mailing Address2
                                            </div>
                                            <div className="info-price">
                                                {address2}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Country
                                            </div>
                                            <div className="info-price">
                                                {country}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                City
                                            </div>
                                            <div className="info-price">
                                                {city}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                State
                                            </div>
                                            <div className="info-price">
                                                {state}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Zip
                                            </div>
                                            <div className="info-price">
                                                {zip}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Phone
                                            </div>
                                            <div className="info-price">
                                                {billingPhone}
                                            </div>
                                        </div>
                                        <div className="email-info">
                                            <div className="info-email-title">
                                                Email
                                            </div>
                                            <div className="info-email">
                                                <p className="email-p">
                                                    {billingEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            expanded={
                                expanded === "panel4" || expanded === true
                            }
                            onChange={handleChange("panel4")}
                        >
                            <AccordionSummary
                                aria-controls="panel3d-content"
                                id="panel3d-header"
                            >
                                <Typography>
                                    <strong>Payment Information</strong>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div className="price-breakdown">
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Card No.
                                            </div>
                                            <div className="info-price">
                                                {cardNumber}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Exp Month
                                            </div>
                                            <div className="info-price">
                                                {expMonth}
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Exp Year
                                            </div>
                                            <div className="info-price">
                                                {expYear}
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    borderBottom: "1px solid #c1c2c2",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "0",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: "transparent",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));
