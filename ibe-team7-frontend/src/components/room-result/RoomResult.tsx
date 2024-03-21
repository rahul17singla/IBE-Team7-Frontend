import "./RoomResult.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useState } from "react";
import { Step1Page } from "./Step1Page";

export const RoomResult = () => {
    const steps = ["Choose Room", "Choose add on", "Checkout"];

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };
    return (
        <div
            style={{
                overflowY: "auto",
                height: "100vh",
            }}
        >
            <div className="bagimage"></div>
            <div className="options">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton
                                color="inherit"
                                onClick={handleStep(index)}
                            >
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div>
                <div>
                    {activeStep === 0 && (
                        <div>
                            <Step1Page />
                        </div>
                    )}
                    {activeStep === 1 && (
                        <div>
                            <h1>Choose add on</h1>
                            <div className="addon">
                                <div className="addon1">
                                    <h3>Addon 1</h3>
                                    <p>Price: 1000</p>
                                    <button>Choose</button>
                                </div>
                                <div className="addon2">
                                    <h3>Addon 2</h3>
                                    <p>Price: 2000</p>
                                    <button>Choose</button>
                                </div>
                                <div className="addon3">
                                    <h3>Addon 3</h3>
                                    <p>Price: 3000</p>
                                    <button>Choose</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeStep === 2 && (
                        <div>
                            <h1>Checkout</h1>
                            <div className="checkout">
                                <p>Total Price: 1000</p>
                                <button>Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button onClick={handleNext}>
                            {isLastStep() ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
