import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./Search.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { PropertyInput } from "./PropertyInput";
import { CalendarInput } from "./CalendarInput";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { AccessibleChair } from "./AccessibleChair";
import { RoomInput } from "./RoomInput";
import {
    setGuestsAdult,
    setGuestsChildren,
    setGuestsTeens,
    setShowGuests,
} from "../../redux/searchSlice";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants/Constants";
import fetchConfig from "../../redux/thunks/configThunk";
import fetchRoomDetails from "../../redux/thunks/roomDetailsThunk";
import { findnextDate } from "../../utils/FindNextDateFunc";

export function Search() {
    const { t } = useTranslation();

    const property = useSelector(
        (state: RootState) => state.filterStates.property
    );

    const property3 = useSelector(
        (state: RootState) => state.filterStates.property3
    );

    const checkboxChecked = useSelector(
        (state: RootState) => state.filterStates.checkboxChecked
    );

    //for guests count
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
    const showGuestFeature = useSelector(
        (state: RootState) => state.filterStates.showGuestFeature
    );
    const showChair = useSelector(
        (state: RootState) => state.filterStates.showChair
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

    //for calender
    const startDate = useSelector(
        (state: RootState) => state.filterStates.startDate
    );
    const endDate = useSelector(
        (state: RootState) => state.filterStates.endDate
    );

    const [showCalendar, setShowCalendar] = useState(false);
    const roomsShow = useSelector(
        (state: RootState) => state.filterStates.roomsShow
    );

    const maxGuests = useSelector(
        (state: RootState) => state.filterStates.maxGuests
    );

    const sort = useSelector((state: RootState) => state.results.sort);

    const bedType = useSelector((state: RootState) => state.results.bedType);

    const roomType = useSelector((state: RootState) => state.results.roomType);

    const priceLessThan = useSelector(
        (state: RootState) => state.results.priceLessThan
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchConfig());
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
        setShowGuests;
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

    const handleSubmit = async () => {
        const errorMsg = document.getElementById("error-msg");
        if (!property || !startDate || !endDate) {
            // display message in div
            if (errorMsg) {
                errorMsg.style.display = "block";
            }
            return;
        }

        errorMsg!.innerHTML = "";
        console.log("Form submitted with data:", {
            property,
            startDate,
            endDate,
            guestsAdult,
            guestsChildren,
            guestsTeens,
            checkboxChecked,
        });

        //  CALL TO BACKEND HERE
        try {
            await axios.post(BACKEND_URL + "/api/v1/dates", {
                property: property,
                startDate: findnextDate(startDate),
                endDate: findnextDate(endDate),
                roomCount: property3,
                bedType: bedType,
                roomType: roomType,
                priceLessThan: priceLessThan,
                sort: sort,
            });
        } catch (error) {
            console.error("Error:", error); // Log any errors
        }
        dispatch(fetchRoomDetails());

        navigate(
            `/room-result?property=${property}&room=${property3}&startDate=${startDate.toLocaleDateString(
                "en-GB"
            )}&endDate=${endDate.toLocaleDateString(
                "en-GB"
            )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`
        );
    };

    return (
        <div className="search-box">
            <div className="search-form">
                <div className="search-fields">
                    <PropertyInput />

                    <p className="dropdown-heading-guest">
                        {t("select-date")}*
                    </p>

                    <CalendarInput
                        showCalendar={showCalendar}
                        setShowCalendar={setShowCalendar}
                    />

                    <div className="guest-rooms">
                        {showGuestFeature && (
                            <div className="guest-feature">
                                <p className="dropdown-heading-guest">
                                    {" "}
                                    {t("Guests")}
                                </p>
                                <button
                                    className="dropdown-guest"
                                    onClick={() =>
                                        dispatch(setShowGuests(!showGuests))
                                    }
                                >
                                    {guestsAdult +
                                        guestsTeens +
                                        guestsChildren ===
                                    1
                                        ? `1 ${t("Adult")}`
                                        : `${guestsAdult} ${t("Adults")},
                                            ${
                                                guestsTeens > 0
                                                    ? guestsTeens +
                                                      " " +
                                                      t("Teens")
                                                    : ""
                                            },
                                           ${
                                               guestsChildren > 0
                                                   ? guestsChildren +
                                                     " " +
                                                     t("Kids")
                                                   : ""
                                           }`}
                                </button>

                                {showGuests && (
                                    <div className="guests-dropdown">
                                        {showAdult && (
                                            <div className="guest-counter">
                                                <div>
                                                    <p className="count-title">
                                                        {t("Adults")}
                                                    </p>
                                                    <p className="count-desc">
                                                        {t("Age")} 18+
                                                    </p>
                                                </div>
                                                <div className="counter-section">
                                                    <button
                                                        onClick={
                                                            handleAdultDecrement
                                                        }
                                                        className={
                                                            guestsAdult === 1
                                                                ? "count-btn disabled"
                                                                : "count-btn"
                                                        }
                                                    >
                                                        <p className="counter-text">
                                                            -
                                                        </p>
                                                    </button>
                                                    <button className="count-btn">
                                                        <p className="counter-text">
                                                            {guestsAdult}
                                                        </p>
                                                    </button>
                                                    <button
                                                        onClick={
                                                            handleAdultIncrement
                                                        }
                                                        className="count-btn"
                                                    >
                                                        <p className="counter-text">
                                                            +
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {showTeen && (
                                            <div className="guest-counter">
                                                <div>
                                                    <p className="count-title">
                                                        {t("Teens")}
                                                    </p>
                                                    <p className="count-desc">
                                                        {t("Age")} 13-17
                                                    </p>
                                                </div>
                                                <div className="counter-section">
                                                    <button
                                                        onClick={
                                                            handleTeensDecrement
                                                        }
                                                        className={
                                                            guestsTeens === 0
                                                                ? "count-btn disabled"
                                                                : "count-btn"
                                                        }
                                                    >
                                                        <p className="counter-text">
                                                            -
                                                        </p>
                                                    </button>
                                                    <button className="count-btn">
                                                        <p className="counter-text">
                                                            {guestsTeens}
                                                        </p>
                                                    </button>
                                                    <button
                                                        onClick={
                                                            handleTeensIncrement
                                                        }
                                                        className={"count-btn"}
                                                    >
                                                        <p className="counter-text">
                                                            +
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {showKid && (
                                            <div className="guest-counter">
                                                <div>
                                                    <p className="count-title">
                                                        {t("Kids")}
                                                    </p>
                                                    <p className="count-desc">
                                                        {t("Age")} 0-12
                                                    </p>
                                                </div>
                                                <div className="counter-section">
                                                    <button
                                                        onClick={
                                                            handleChildrenDecrement
                                                        }
                                                        className={
                                                            guestsChildren === 0
                                                                ? "count-btn disabled"
                                                                : "count-btn"
                                                        }
                                                    >
                                                        <p className="counter-text">
                                                            -
                                                        </p>
                                                    </button>
                                                    <button className="count-btn">
                                                        <p className="counter-text">
                                                            {guestsChildren}
                                                        </p>
                                                    </button>
                                                    <button
                                                        onClick={
                                                            handleChildrenIncrement
                                                        }
                                                        className="count-btn"
                                                    >
                                                        <p className="counter-text">
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

                        {roomsShow && <RoomInput />}

                        {showChair && <AccessibleChair />}
                    </div>
                </div>
                <div className="button-search">
                    <button className="search-btn" onClick={handleSubmit}>
                        {t("SEARCH")}
                    </button>

                    <div
                        id="error-msg"
                        className="error"
                        style={{ display: "none" }}
                    >
                        *Please fill all the fields
                    </div>
                </div>
            </div>
        </div>
    );
}
