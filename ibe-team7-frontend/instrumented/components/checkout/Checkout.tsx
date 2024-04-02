import { Step, StepButton, Stepper } from "@mui/material";
import { Itinerary } from "../itinerary/Itinerary";
import "./Checkout.scss";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";

export const Checkout = () => {
    const steps = ["Choose Room", "Choose add on", "Checkout"];

    const [activeStep] = useState(2);
    const [completed] = useState<{ [k: number]: boolean }>({});

    const completeBooking = () => {
        // if user not logged in, redirect to login page
        // get email from cognito
        const email = alert(
            "Booking Completed. Please check your email for review and rating."
        );

        // send email using AWS SES and triggerered by AWS Lambda
        axios.post(`${BACKEND_URL}/send-email`, {
            email: email,
            subject: "Booking Confirmation",
            message: "Booking Confirmed",
        });
    };

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
                    form <br />
                    <button className="login-btn" onClick={completeBooking}>
                        Complete Booking
                    </button>
                </div>
                <Itinerary />
            </div>
        </div>
    );
};
