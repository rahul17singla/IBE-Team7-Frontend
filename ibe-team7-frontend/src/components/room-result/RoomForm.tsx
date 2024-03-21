import "./RoomForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { t } from "i18next";
import {
    setGuestsAdult,
    setGuestsChildren,
    setGuestsTeens,
    setShowGuests,
} from "../../redux/searchSlice";
import { CalendarInput } from "./CalendarInput";
import { useEffect, useState } from "react";
import { RoomInput } from "./RoomInput";
import { BedCount } from "./BedCount";

export const RoomForm = () => {
    const [showCalendar, setShowCalendar] = useState(false);

    const showGuestFeature = useSelector(
        (state: RootState) => state.filterStates.showGuestFeature
    );
    const dispatch = useDispatch();
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

    const handleSubmit = () => {};

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
