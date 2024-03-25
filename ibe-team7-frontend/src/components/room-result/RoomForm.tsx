import "./RoomForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { t } from "i18next";
import {
    setEndDate,
    setGuestsAdult,
    setGuestsChildren,
    setGuestsTeens,
    setProperty,
    setProperty3,
    setShowGuests,
    setStartDate,
} from "../../redux/searchSlice";
import { CalendarInput } from "./CalendarInput";
import { useEffect, useState } from "react";
import { RoomInput } from "./RoomInput";
import { BedCount } from "./BedCount";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    setBedType,
    setPriceLessThan,
    setRoomType,
} from "../../redux/resultSlice";
import axios from "axios";
import { setRoomDetails } from "../../redux/roomDetailsSlice";

export const RoomForm = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [params] = useSearchParams();

    const roomType = useSelector((state: RootState) => state.results.roomType);
    const bedTypes = useSelector((state: RootState) => state.results.bedType);
    const priceLessThan = useSelector(
        (state: RootState) => state.results.priceLessThan
    );
    const showGuestFeature = useSelector(
        (state: RootState) => state.filterStates.showGuestFeature
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
    const showGuests = useSelector(
        (state: RootState) => state.filterStates.showGuests
    );
    const maxGuests = useSelector(
        (state: RootState) => state.filterStates.maxGuests
    );
    const showAdult = useSelector(
        (state: RootState) => state.filterStates.showAdult
    );
    const showTeen = useSelector(
        (state: RootState) => state.filterStates.showTeen
    );
    const showKid = useSelector(
        (state: RootState) => state.filterStates.showKid
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

    const convertToDateObject = (dateString: string) => {
        const [day, month, year] = dateString.split("/").map(Number);
        // Month in JavaScript's Date object is 0-indexed, so we need to subtract 1
        const newDateObject = new Date(year, month - 1, day);
        return newDateObject;
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log(params);
            if (params.has("adults")) {
                dispatch(setGuestsAdult(parseInt(params.get("adults")!)));
            }
            if (params.has("kids")) {
                dispatch(setGuestsChildren(parseInt(params.get("kids")!)));
            }
            if (params.has("teens")) {
                dispatch(setGuestsTeens(parseInt(params.get("teens")!)));
            }
            if (params.has("room")) {
                dispatch(setProperty3(parseInt(params.get("room")!)));
            }
            if (params.has("startDate")) {
                const startDateParam = params.get("startDate")!;
                console.log(startDateParam);
                if (startDateParam === "undefined") {
                    dispatch(setStartDate(undefined));
                    return;
                }
                const startDateReqd = convertToDateObject(startDateParam);
                console.log(startDateReqd);

                dispatch(setStartDate(startDateReqd));
            }
            if (params.has("endDate")) {
                const endDateParam = params.get("endDate")!;
                if (endDateParam === "undefined") {
                    dispatch(setEndDate(undefined));
                    return;
                }
                const endDateReqd = convertToDateObject(endDateParam);
                dispatch(setEndDate(endDateReqd));
            }
            if (params.has("property")) {
                dispatch(setProperty(params.get("property")!));
            }
            if (params.has("roomType")) {
                const roomTypes = params.get("roomType");
                const roomTypesArray = roomTypes?.split(",");
                if (roomTypesArray?.length === 1) {
                    dispatch(setRoomType(roomTypesArray[0]));
                }
                if (roomTypesArray?.length === 2) {
                    dispatch(setRoomType(roomTypesArray[0]));
                    dispatch(setRoomType(roomTypesArray[1]));
                }
            }
            if (params.has("bedTypes")) {
                const bedTypes = params.get("bedTypes");
                const bedTypesArray = bedTypes?.split(",");

                if (bedTypesArray?.length === 1) {
                    dispatch(setBedType(bedTypesArray[0]));
                }
                if (bedTypesArray?.length === 2) {
                    dispatch(setBedType(bedTypesArray[0]));
                    dispatch(setBedType(bedTypesArray[1]));
                }
            }
            if (params.has("priceLessThan")) {
                const priceLessThan = parseInt(params.get("priceLessThan")!);
                dispatch(setPriceLessThan(priceLessThan));
            }

            try {
                await axios.post(
                    "https://d0rh6hot93.execute-api.ap-northeast-1.amazonaws.com/api/v1/dates",
                    // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/dates",
                    // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/dates",
                    {
                        property: property,
                        startDate: startDate?.toISOString(),
                        endDate: endDate?.toISOString(),
                        roomCount: property3,
                        bedType: bedTypes,
                        roomType: roomType,
                        priceLessThan: priceLessThan,
                        sort: sort,
                    }
                );
                console.log("DATA IS HERE -------------");
                console.log(startDate?.toISOString()); // Log the response data
            } catch (error) {
                console.error("Error:", error); // Log any errors
            }
        };

        fetchData()
            .then(() => {
                // Make GET request after POST request
                axios
                    .get(
                        "https://d0rh6hot93.execute-api.ap-northeast-1.amazonaws.com/api/v1/roomcartdetails"
                        // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/roomcartdetails"
                        // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/roomcartdetails"
                    )
                    .then((roomDetailsResponse) => {
                        const roomDetails = roomDetailsResponse.data;
                        console.log("Room Details:", roomDetails);
                        // Further processing if needed...
                        dispatch(setRoomDetails(roomDetails));
                    })
                    .catch((error) => {
                        console.error("Error fetching room details:", error);
                    });
            })
            .then(() => {
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

        // if (!params) {
        //     return <div>Loading...</div>;
        // }
    }, []);

    useEffect(() => {
        if (parseInt(property3) > guestsAdult) {
            dispatch(setGuestsAdult(parseInt(property3)));
        }
    }, [property3, guestsAdult]);

    const handleAdultIncrement = () => {
        if (guestsAdult + guestsTeens + guestsChildren < maxGuests) {
            dispatch(setGuestsAdult(guestsAdult + 1));
        }
    };

    const handleAdultDecrement = () => {
        dispatch(setGuestsAdult(guestsAdult - 1));
    };

    const handleTeensIncrement = () => {
        if (guestsAdult + guestsTeens + guestsChildren < maxGuests) {
            dispatch(setGuestsTeens(guestsTeens + 1));
        }
    };

    const handleTeensDecrement = () => {
        dispatch(setGuestsTeens(guestsTeens - 1));
    };
    const handleChildrenIncrement = () => {
        if (guestsAdult + guestsTeens + guestsChildren < maxGuests) {
            dispatch(setGuestsChildren(guestsChildren + 1));
        }
    };

    const handleChildrenDecrement = () => {
        dispatch(setGuestsChildren(guestsChildren - 1));
    };

    const sort = useSelector((state: RootState) => state.results.sort);

    const handleSubmit = async () => {
        try {
            // await axios.post("http://localhost:8088/api/v1/dates", {
            await axios.post(
                "https://d0rh6hot93.execute-api.ap-northeast-1.amazonaws.com/api/v1/dates",
                // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/dates",
                // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/dates",
                {
                    property: property,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString(),
                    roomCount: property3,
                    bedType: bedTypes,
                    roomType: roomType,
                    priceLessThan: priceLessThan,
                    sort: sort,
                }
            );
            console.log("DATA IS HERE -------------");
            console.log(startDate?.toISOString()); // Log the response data
        } catch (error) {
            console.error("Error:", error); // Log any errors
        }

        // Make GET request immediately after POST request
        const roomDetailsResponse = await axios.get(
            // "http://localhost:8088/api/v1/roomcartdetails"
            "https://d0rh6hot93.execute-api.ap-northeast-1.amazonaws.com/api/v1/roomcartdetails"
            // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/roomcartdetails"
            // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/roomcartdetails"
        );
        const roomDetails = roomDetailsResponse.data;
        dispatch(setRoomDetails(roomDetails));
        console.log("Room Details:", roomDetails);

        const resultUrl = `/room-result?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString()}&endDate=${endDate?.toLocaleDateString()}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;

        // if filters are present then add them in result url
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

        // navigate(resultUrl);

        // CALL TO BACKEND HERE
    };

    return (
        <div className="filtercontainer">
            <div>
                {showGuestFeature && (
                    <div className="result-guest-feature">
                        <button
                            className="result-dropdown-guest"
                            onClick={() => dispatch(setShowGuests(!showGuests))}
                        >
                            <p className="result-dropdown-heading-guest">
                                {" "}
                                {t("Guests")}
                            </p>
                            {guestsAdult + guestsTeens + guestsChildren === 1
                                ? `1 ${t("Adult")}`
                                : `${guestsAdult} ${t("Adults")}
                                            ${
                                                guestsTeens > 0
                                                    ? ", " +
                                                      guestsTeens +
                                                      " " +
                                                      t("Teens")
                                                    : ""
                                            }
                                           ${
                                               guestsChildren > 0
                                                   ? ", " +
                                                     guestsChildren +
                                                     " " +
                                                     t("Kids")
                                                   : ""
                                           }`}
                        </button>

                        {showGuests && (
                            <div className="result-guests-dropdown">
                                {showAdult && (
                                    <div className="result-guest-counter">
                                        <div>
                                            <p className="result-count-title">
                                                {t("Adults")}
                                            </p>
                                            <p className="result-count-desc">
                                                {t("Age")} 18+
                                            </p>
                                        </div>
                                        <div className="result-counter-section">
                                            <button
                                                onClick={handleAdultDecrement}
                                                className={
                                                    guestsAdult === 1
                                                        ? "result-count-btn disabled"
                                                        : "result-count-btn"
                                                }
                                            >
                                                <p className="result-counter-text">
                                                    -
                                                </p>
                                            </button>
                                            <button className="result-count-btn">
                                                <p className="result-counter-text">
                                                    {guestsAdult}
                                                </p>
                                            </button>
                                            <button
                                                onClick={handleAdultIncrement}
                                                className="result-count-btn"
                                            >
                                                <p className="result-counter-text">
                                                    +
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {showTeen && (
                                    <div className="result-guest-counter">
                                        <div>
                                            <p className="result-count-title">
                                                {t("Teens")}
                                            </p>
                                            <p className="result-count-desc">
                                                {t("Age")} 13-17
                                            </p>
                                        </div>
                                        <div className="result-counter-section">
                                            <button
                                                onClick={handleTeensDecrement}
                                                className={
                                                    guestsTeens === 0
                                                        ? "result-count-btn disabled"
                                                        : "result-count-btn"
                                                }
                                            >
                                                <p className="result-counter-text">
                                                    -
                                                </p>
                                            </button>
                                            <button className="result-count-btn">
                                                <p className="result-counter-text">
                                                    {guestsTeens}
                                                </p>
                                            </button>
                                            <button
                                                onClick={handleTeensIncrement}
                                                className={"result-count-btn"}
                                            >
                                                <p className="result-counter-text">
                                                    +
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {showKid && (
                                    <div className="result-guest-counter">
                                        <div>
                                            <p className="result-count-title">
                                                {t("Kids")}
                                            </p>
                                            <p className="result-count-desc">
                                                {t("Age")} 0-12
                                            </p>
                                        </div>
                                        <div className="result-counter-section">
                                            <button
                                                onClick={
                                                    handleChildrenDecrement
                                                }
                                                className={
                                                    guestsChildren === 0
                                                        ? "result-count-btn disabled"
                                                        : "result-count-btn"
                                                }
                                            >
                                                <p className="result-counter-text">
                                                    -
                                                </p>
                                            </button>
                                            <button className="result-count-btn">
                                                <p className="result-counter-text">
                                                    {guestsChildren}
                                                </p>
                                            </button>
                                            <button
                                                onClick={
                                                    handleChildrenIncrement
                                                }
                                                className="result-count-btn"
                                            >
                                                <p className="result-counter-text">
                                                    +
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <RoomInput />
            <BedCount />
            <div>
                <CalendarInput
                    showCalendar={showCalendar}
                    setShowCalendar={setShowCalendar}
                />
            </div>
            <div className="result-button-search">
                <button className="result-search-btn" onClick={handleSubmit}>
                    {t("SEARCH")}
                </button>
            </div>
        </div>
    );
};
