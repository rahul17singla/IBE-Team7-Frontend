import "./RoomResult.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useEffect, useState } from "react";
import { Step1Page } from "./Step1Page";
import { Footer } from "../footer/Footer";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import fetchRoomDetails from "../../redux/thunks/roomDetailsThunk";
import { findnextDate } from "../../utils/FindNextDateFunc";

export const RoomResult = () => {
    const dispatch = useAppDispatch();
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

    const sort = useSelector((state: RootState) => state.results.sort);

    const navigate = useNavigate();

    useEffect(() => {
        const url = window.location.search;
        if (!url.includes("?")) {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            // console.log(property);
            // try {
            //     await axios.post(BACKEND_URL + "/api/v1/dates", {
            //         property: property,
            //         startDate: findnextDate(startDate),
            //         endDate: findnextDate(endDate),
            //         roomCount: property3,
            //         bedType: bedTypes,
            //         roomType: roomType,
            //         priceLessThan: priceLessThan,
            //         sort: sort,
            //     });
            //     console.log("DATA IS HERE -------------");
            //     console.log(startDate?.toISOString()); // Log the response data
            // } catch (error) {
            //     console.error("Error:", error); // Log any errors
            // }
        };

        fetchData()
            .then(() => {
                dispatch(
                    fetchRoomDetails({
                        property: property.slice(5, 6),
                        startDate: findnextDate(startDate),
                        endDate: findnextDate(endDate),
                        roomCount: property3,
                        bedType: bedTypes.toString(),
                        roomType: roomType.toString(),
                        priceLessThan: priceLessThan,
                        guestsAdult: guestsAdult,
                        guestsTeens: guestsTeens,
                        guestsChildren: guestsChildren,
                        sort: sort,
                    })
                );
                // console.log(bedTypes.toString());
            })
            .then(() => {
                console.log("this is room type");
                console.log(roomType);
                console.log("This is bed type");
                console.log(bedTypes);

                const resultUrl = `/room-result?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString(
                    "en-GB"
                )}&endDate=${endDate?.toLocaleDateString(
                    "en-GB"
                )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;

                if (
                    roomType.length !== 0 &&
                    bedTypes.length !== 0 &&
                    priceLessThan !== 1000000
                ) {
                    navigate(
                        `${resultUrl}&roomType=${roomType}&bedTypes=${bedTypes}&priceLessThan=${priceLessThan}`
                    );
                } else if (roomType.length !== 0 && bedTypes.length !== 0) {
                    navigate(
                        `${resultUrl}&roomType=${roomType}&bedTypes=${bedTypes}`
                    );
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
            });
    }, [
        property.slice(5, 6),
        property3,
        startDate,
        endDate,
        guestsAdult,
        guestsTeens,
        guestsChildren,
        roomType,
        bedTypes,
        priceLessThan,
        sort,
        navigate,
    ]);

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
                </div>
            </div>
            <Footer />
        </div>
    );
};
