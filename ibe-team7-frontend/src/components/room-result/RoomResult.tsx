import "./RoomResult.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useEffect, useState } from "react";
import { Step1Page } from "./Step1Page";
import { Footer } from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setRoomDetails } from "../../redux/roomDetailsSlice";

export const RoomResult = () => {

    const dispatch=useDispatch();
    const steps = ["Choose Room", "Choose add on", "Checkout"];

    const [activeStep, setActiveStep] = useState(0);
    const [completed] = useState<{ [k: number]: boolean }>({});

    const roomType = useSelector((state: RootState) => state.results.roomType);
    const bedTypes = useSelector((state: RootState) => state.results.bedType);
    const priceLessThan = useSelector(
        (state: RootState) => state.results.priceLessThan
    );
    const property3 = useSelector(
        (state: RootState) => state.filterStates.property3
    );
    const property = useSelector(
        (state: RootState) => state.filterStates.property
    );
    const startDate = useSelector(
        (state: RootState) => state.filterStates.startDate
    );
    const endDate = useSelector(
        (state: RootState) => state.filterStates.endDate
    );
    const guestsAdult = useSelector(
        (state: RootState) => state.filterStates.guestsAdult
    );
    const guestsTeens = useSelector(
        (state: RootState) => state.filterStates.guestsTeens
    );
    const guestsChildren = useSelector(
        (state: RootState) => state.filterStates.guestsChildren
    );


    const sort = useSelector(
        (state: RootState) => state.results.sort
    );

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.post("http://localhost:8088/api/v1/dates", {
                    property:property,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString(),
                    roomCount: property3,
                    bedType: bedTypes,
                    roomType:roomType,
                    priceLessThan:priceLessThan,
                    sort:sort
    
                });
                console.log("DATA IS HERE -------------")
                console.log(startDate?.toISOString()); // Log the response data
            } catch (error) {
                console.error("Error:", error); // Log any errors
            }

            
            const resultUrl = `/room-result?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString()}&endDate=${endDate?.toLocaleDateString()}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;
    
            if (
                roomType.length !== 0 &&
                bedTypes.length !== 0 &&
                priceLessThan !== 1000000
            ) {
                navigate(
                    `${resultUrl}&roomType=${roomType}&bedTypes=${bedTypes}&priceLessThan=${priceLessThan}`
                );
            } else if (roomType.length !== 0 && bedTypes.length !== 0) {
                navigate(`${resultUrl}&roomType=${roomType}&bedTypes=${bedTypes}`);
            } else if (roomType.length !== 0 && priceLessThan !== 1000000) {
                navigate(
                    `${resultUrl}&roomType=${roomType}&priceLessThan=${priceLessThan}`
                );
            } else if (bedTypes.length !== 0 && priceLessThan !== 1000000) {
                navigate(
                    `${resultUrl}&bedTypes=${bedTypes}&priceLessThan=${priceLessThan}`
                );
            } else if (roomType.length !== 0) {
                navigate(`${resultUrl}&roomType=${roomType}`);
            } else if (bedTypes.length !== 0) {
                navigate(`${resultUrl}&bedTypes=${bedTypes}`);
            } else if (priceLessThan !== 1000000) {
                navigate(`${resultUrl}&priceLessThan=${priceLessThan}`);
            } else {
                navigate(resultUrl);
            }
    
            
        };
    
        fetchData().then(() => {
            // Make GET request after POST request
            axios.get("http://localhost:8088/api/v1/roomcartdetails")
                .then(roomDetailsResponse => {
                    const roomDetails = roomDetailsResponse.data;
                    console.log("Room Details:", roomDetails);
                    dispatch(setRoomDetails(roomDetails));
                    // Further processing if needed...
                    
                })
                .catch(error => {
                    console.error("Error fetching room details:", error);
                });
        });
    
    }, [
        // property,
        // property3,
        // startDate,
        // endDate,
        // guestsAdult,
        // guestsTeens,
        // guestsChildren,
        roomType,
        bedTypes,
        priceLessThan,
        navigate,
    ]);
    

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
                  steps.findIndex((_, i) => !(i in completed))
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
        <div>
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
            <Footer />
        </div>
    );
};
