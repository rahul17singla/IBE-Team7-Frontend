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
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { OTPModal } from "./OTPModal";
import { SES } from "@aws-sdk/client-ses";
import { Html } from "@react-email/html";
import { FRONTEND_URL } from "../../constants/Constants";
import { render } from "@react-email/render";
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

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const toggleAll = (val: string | boolean) => {
        setExpanded(val);
    };
    const handleCancel = () => {
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
        // const emailHtml = render(<Email />);
        const bookingId = "1234";
        const emailContent = render(
            <Html lang="en">
                Here is your booking confirmation link. You can download it from
                the page itself.
                <a href={`${FRONTEND_URL}/confirmation/${bookingId}`}>
                    Click here to view
                </a>
            </Html>
        );

        const params = {
            Source: "rahul.singla@kickdrumtech.com",
            Destination: {
                ToAddresses: ["arunain.mahant@kickdrumtech.com"],
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
                    Data: "hello world",
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
                            <img src={user} alt="user" /> 2 Adults, 1 Child
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
                            <OTPModal onClose={() => setCancelBooking(false)} />
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
                                <div className="date">20</div>
                                <div className="confirm-month-year">
                                    May, 2024
                                </div>
                            </div>
                            <div className="date-box">
                                <div className="date-box-heading">
                                    Check-out
                                </div>
                                <div className="date">22</div>
                                <div className="confirm-month-year">
                                    May, 2024
                                </div>
                            </div>
                        </div>
                        <div className="confirm-promo">
                            <div className="confirm-promo-heading">
                                $150 Dining Credit Package
                            </div>
                            <div className="confirm-promo-text">
                                Spend $10 every night you stay and earn $150 on
                                doing credit at the resort.
                            </div>
                        </div>
                        <div className="confirm-total">
                            <div className="confirm-promo-text">
                                Copy explaining the cancellation policy, if
                                applicable
                            </div>
                            <div className="confirm-price">
                                $XXX/night total
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
                                                $XXX.xx
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Subtotal
                                            </div>
                                            <div className="info-price">
                                                $XXX.xx
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Taxes, Surcharges, Fees
                                            </div>
                                            <div className="info-price">
                                                $XXX.xx
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                VAT
                                            </div>
                                            <div className="info-price">
                                                $XXX.xx
                                            </div>
                                        </div>
                                        <div className="total-for-stay">
                                            <div className="info-title">
                                                Total for stay
                                            </div>
                                            <div className="info-price">
                                                $XXX.xx
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
                                                Rahul
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Last Name
                                            </div>
                                            <div className="info-price">
                                                Singla
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Phone
                                            </div>
                                            <div className="info-price">
                                                +91-9876543210
                                            </div>
                                        </div>
                                        <div className="email-info">
                                            <div className="info-email-title">
                                                Email
                                            </div>
                                            <div className="info-email">
                                                <p className="email-p">
                                                    abc.def@gmail.com
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
                                                Rahul
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Last Name
                                            </div>
                                            <div className="info-price">
                                                Singla
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Mailing Address1
                                            </div>
                                            <div className="info-price">
                                                Kickdrum
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Mailing Address2
                                            </div>
                                            <div className="info-price">
                                                Bangalore
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Country
                                            </div>
                                            <div className="info-price">
                                                India
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                City
                                            </div>
                                            <div className="info-price">
                                                Bangalore
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                State
                                            </div>
                                            <div className="info-price">
                                                Karnataka
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Zip
                                            </div>
                                            <div className="info-price">
                                                123456
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Phone
                                            </div>
                                            <div className="info-price">
                                                +91-9876543210
                                            </div>
                                        </div>
                                        <div className="email-info">
                                            <div className="info-email-title">
                                                Email
                                            </div>
                                            <div className="info-email">
                                                <p className="email-p">
                                                    abc.def@gmail.com
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
                                                1234 1234 1234 1234
                                            </div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Exp Month
                                            </div>
                                            <div className="info-price">04</div>
                                        </div>
                                        <div className="nightly-rate-info">
                                            <div className="info-title">
                                                Exp Year
                                            </div>
                                            <div className="info-price">
                                                2025
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
