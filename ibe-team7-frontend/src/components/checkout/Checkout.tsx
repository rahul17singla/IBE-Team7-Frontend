import { Step, StepButton, Stepper } from "@mui/material";
import { Itinerary } from "../itinerary/Itinerary";
import "./Checkout.scss";
import { useState } from "react";

export const Checkout = () => {
    const steps = ["Choose Room", "Choose add on", "Checkout"];

    const [activeStep] = useState(2);
    const [completed] = useState<{ [k: number]: boolean }>({});

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
                <div className="checkout-form">form</div>
                <Itinerary />
            </div>
        </div>
    );
};
