import React from "react";
import "./ResultPage.scss";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import "./Search.scss";
import { RoomRate } from "../../types/RoomRate";
import axios from "axios";
import { DateObj } from "../../types/DateObj";
import { ListProperty } from "../../types/Property";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useParams } from "react-router-dom";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import {
  setEndDate,
  setGuestsAdult,
  setGuestsChildren,
  setGuestsTeens,
  setProperty3,
  setRooms,
  setShowCalendar,
  setShowGuests,
  setStartDate,
} from "../../redux/searchSlice";

export function ResultPage() {
  const { t } = useTranslation();
  const reduxDispatch = useDispatch();

  const { roomcount } = useParams();

  const currencyValue = useSelector((state: RootState) => state.currency.value);

  const currencyType = useSelector(
    (state: RootState) => state.currency.currency
  );

  const property1 = useSelector(
    (state: RootState) => state.filterstates.property1
  );

  const property3 = useSelector(
    (state: RootState) => state.filterstates.property3
  );

  const checkboxChecked = useSelector(
    (state: RootState) => state.filterstates.checkboxChecked
  );

  const startDate = useSelector(
    (state: RootState) => state.filterstates.startDate
  );

  const endDate = useSelector((state: RootState) => state.filterstates.endDate);

  const guestsAdult = useSelector(
    (state: RootState) => state.filterstates.guestsAdult
  );

  const guestsTeens = useSelector(
    (state: RootState) => state.filterstates.guestsTeens
  );

  const guestsChildren = useSelector(
    (state: RootState) => state.filterstates.guestsChildren
  );

  const showGuests = useSelector(
    (state: RootState) => state.filterstates.showGuests
  );

  const showGuestFeature = useSelector(
    (state: RootState) => state.filterstates.showGuestFeature
  );

  const showAdult = useSelector(
    (state: RootState) => state.filterstates.showAdult
  );

  const showTeen = useSelector(
    (state: RootState) => state.filterstates.showTeen
  );

  const showKid = useSelector((state: RootState) => state.filterstates.showKid);

  const showCalendar = useSelector(
    (state: RootState) => state.filterstates.showCalendar
  );

  const maxGuests = useSelector(
    (state: RootState) => state.filterstates.maxGuests
  );

  const maxRooms = useSelector(
    (state: RootState) => state.filterstates.maxRooms
  );

  const rooms = useSelector((state: RootState) => state.filterstates.rooms);

  //   const roomMap = useSelector((state: RootState) => state.filterstates.roomMap);

  const roomsShow = useSelector(
    (state: RootState) => state.filterstates.roomsShow
  );

  const [roomMap, setRoomMap] = useState(new Map());

  const [showFilters1, setShowFilters1] = useState<boolean>(false);
  const [showFilters2, setShowFilters2] = useState<boolean>(false);
  const [showFilters3, setShowFilters3] = useState<boolean>(false);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/api/v1/rooms"
        // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/rooms"
        // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/rooms"
      );
      reduxDispatch(setRooms(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const createMap = () => {
      for (const room of rooms) {
        roomMap.set(room.date.split("T")[0], room.basicNightlyRate);

        setRoomMap((prev) =>
          prev.set(room.date.split("T")[0], room.basicNightlyRate)
        );
      }
    };
    createMap();
  }, [rooms]);

  useEffect(() => {
    if (parseInt(property3) > guestsAdult) {
      reduxDispatch(setGuestsAdult(parseInt(property3)));
    }
  }, [property3, guestsAdult]);

  const tileContent = ({ date }: DateObj) => {
    const price = roomMap.get(date.toISOString().split("T")[0]) ?? 0;
    const convertedPrice = (price * currencyValue).toFixed(2);
    // if date disabled then dont show price
    if (
      price === 0 ||
      (date.getDate() < new Date().getDate() &&
        date.getMonth() <= new Date().getMonth())
    ) {
      return <div className="tile-price"></div>;
    }

    return (
      <div className="tile-price">
        {currencyType === "USD" ? `$${convertedPrice}` : `₹${convertedPrice}`}
      </div>
    );
  };
  const handleAdultIncrement = () => {
    if (guestsAdult + guestsTeens + guestsChildren < maxGuests) {
      reduxDispatch(setGuestsAdult(guestsAdult + 1));
    }
  };

  const handleAdultDecrement = () => {
    reduxDispatch(setGuestsAdult(guestsAdult - 1));
  };

  const handleTeensIncrement = () => {
    if (guestsAdult + guestsTeens + guestsChildren < maxGuests) {
      reduxDispatch(setGuestsTeens(guestsTeens + 1));
    }
  };

  const handleTeensDecrement = () => {
    reduxDispatch(setGuestsTeens(guestsTeens - 1));
  };
  const handleChildrenIncrement = () => {
    if (guestsAdult + guestsTeens + guestsChildren < maxGuests) {
      reduxDispatch(setGuestsChildren(guestsChildren + 1));
    }
  };

  const handleChildrenDecrement = () => {
    reduxDispatch(setGuestsChildren(guestsChildren - 1));
  };

  const handleSubmit = () => {
    const errorMsg = document.getElementById("error-msg");
    if (!property1 || !startDate || !endDate) {
      // display message in div
      if (errorMsg) {
        errorMsg.innerHTML = "*Please fill all the fields";
      }

      return;
    }

    errorMsg!.innerHTML = "";
    console.log("Form submitted with data:", {
      property1,
      startDate,
      endDate,
      guestsAdult,
      guestsChildren,
      guestsTeens,
      checkboxChecked,
    });
  };

  const calculateMaxDate = (startDate: Date | undefined): Date | undefined => {
    if (!startDate) {
      return undefined; // Return null if start date is not set
    } else if (endDate && startDate) {
      const maxDate = new Date(startDate);
      maxDate.setDate(maxDate.getDate() + 90); // Adding 90 days
      return maxDate;
    } else {
      const maxDate = new Date(startDate);
      maxDate.setDate(maxDate.getDate() + 14); // Adding 14 days
      return maxDate;
    }
  };

  const handleDateChange = (date: Date) => {
    if (!startDate) {
      reduxDispatch(setStartDate(date));
    } else if (!endDate) {
      if (date < startDate) {
        reduxDispatch(setStartDate(date));
        reduxDispatch(setEndDate(undefined));
      }
      reduxDispatch(setEndDate(date));
      //remove disabled class from apply-dates button
      const applyDatesButton = document.getElementById("apply-dates");
      if (applyDatesButton) {
        applyDatesButton.classList.remove("disabled");
      }
    } else {
      reduxDispatch(setStartDate(date));
      reduxDispatch(setEndDate(undefined));
    }
  };

  const displayDays = (date: Date) => {
    const days = ["Su", "M", "T", "W", "Th", "F", "S"];
    return days[date.getDay()];
  };

  const applyDatesHandler = () => {
    reduxDispatch(setShowCalendar(false));
  };

  /////////////////////////

  const steps = ["1. Choose Room", "2. Choose add on", "3. Checkout"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

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

  ///////////////////////////

  return (
    <div>
      <div className="bagimage">
        <img src="public/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg" alt="" />
      </div>

      <div className="options">
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="filter">
        {showGuestFeature && (
          <div className="result-guest-feature">
            <p className="result-dropdown-heading-guest"> {t("Guests")}</p>
            <button
              className="result-dropdown-guest"
              onClick={() => reduxDispatch(setShowGuests(!showGuests))}
            >
              {guestsAdult + guestsTeens + guestsChildren === 1
                ? `1  ${t("guest")}`
                : `${guestsAdult + guestsTeens + guestsChildren} ${t(
                    "guests"
                  )}`}
            </button>

            {showGuests && (
              <div className="result-guests-dropdown">
                {showAdult && (
                  <div className="result-guest-counter">
                    <div>
                      <p className="result-count-title">{t("Adults")}</p>
                      <p className="result-count-desc">{t("Age")} 18+</p>
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
                        <p className="result-counter-text">-</p>
                      </button>
                      <button className="result-count-btn">
                        <p className="result-counter-text">{guestsAdult}</p>
                      </button>
                      <button
                        onClick={handleAdultIncrement}
                        className="result-count-btn"
                      >
                        <p className="result-counter-text">+</p>
                      </button>
                    </div>
                  </div>
                )}

                {showTeen && (
                  <div className="result-guest-counter">
                    <div>
                      <p className="result-count-title">{t("Teens")}</p>
                      <p className="result-count-desc">{t("Age")} 13-17</p>
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
                        <p className="result-counter-text">-</p>
                      </button>
                      <button className="result-count-btn">
                        <p className="result-counter-text">{guestsTeens}</p>
                      </button>
                      <button
                        onClick={handleTeensIncrement}
                        className={"result-count-btn"}
                      >
                        <p className="result-counter-text">+</p>
                      </button>
                    </div>
                  </div>
                )}

                {showKid && (
                  <div className="result-guest-counter">
                    <div>
                      <p className="result-count-title">{t("Kids")}</p>
                      <p className="result-count-desc">{t("Age")} 0-12</p>
                    </div>
                    <div className="result-counter-section">
                      <button
                        onClick={handleChildrenDecrement}
                        className={
                          guestsChildren === 0
                            ? "result-count-btn disabled"
                            : "result-count-btn"
                        }
                      >
                        <p className="result-counter-text">-</p>
                      </button>
                      <button className="result-count-btn">
                        <p className="result-counter-text">{guestsChildren}</p>
                      </button>
                      <button
                        onClick={handleChildrenIncrement}
                        className="result-count-btn"
                      >
                        <p className="result-counter-text">+</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {roomsShow && (
          <div className="result-room-feature">
            <label htmlFor="property3" className="result-dropdown-heading-room">
              {t("Rooms")}{" "}
            </label>
            <select
              id="property3"
              className="result-dropdown-room"
              value={roomcount}
              onChange={(e) => {
                reduxDispatch(setProperty3(e.target.value));
              }}
            >
              {Array.from({ length: maxRooms }, (_, i) => i + 1).map((room) => (
                <option className="result-roomOption" value={room} key={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        )}

        {roomsShow && (
          <div className="result-room-feature">
            <label htmlFor="property3" className="result-dropdown-heading-room">
              Bed{" "}
            </label>
            <select
              id="property3"
              className="result-dropdown-room"
              value={property3}
              onChange={(e) => {
                reduxDispatch(setProperty3(e.target.value));
              }}
            >
              {Array.from({ length: maxRooms }, (_, i) => i + 1).map((room) => (
                <option className="result-roomOption" value={room} key={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="filteritem4">
          <p className="result-dropdown-heading-guest">{t("select-date")}*</p>
          <button
            className="result-dates"
            onClick={() => reduxDispatch(setShowCalendar(!showCalendar))}
          >
            <div className="result-date-text">
              {startDate
                ? startDate.toDateString().substring(4)
                : t("check-in")}
            </div>
            <div className="arrow">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.94667 3.74646C7.91494 3.66463 7.86736 3.58987 7.80667 3.52646L4.47333 0.193131C4.41117 0.130972 4.33738 0.0816653 4.25617 0.0480251C4.17495 0.0143849 4.08791 -0.00292969 4 -0.00292969C3.82247 -0.00292969 3.6522 0.0675956 3.52667 0.193131C3.46451 0.25529 3.4152 0.329084 3.38156 0.410299C3.34792 0.491513 3.33061 0.578559 3.33061 0.666465C3.33061 0.843999 3.40113 1.01426 3.52667 1.1398L5.72667 3.33313H0.666667C0.489856 3.33313 0.320287 3.40337 0.195262 3.52839C0.070238 3.65342 0 3.82299 0 3.9998C0 4.17661 0.070238 4.34618 0.195262 4.4712C0.320287 4.59623 0.489856 4.66646 0.666667 4.66646H5.72667L3.52667 6.8598C3.46418 6.92177 3.41459 6.99551 3.38074 7.07675C3.34689 7.15799 3.32947 7.24512 3.32947 7.33313C3.32947 7.42114 3.34689 7.50828 3.38074 7.58952C3.41459 7.67075 3.46418 7.74449 3.52667 7.80646C3.58864 7.86895 3.66238 7.91855 3.74362 7.95239C3.82486 7.98624 3.91199 8.00366 4 8.00366C4.08801 8.00366 4.17515 7.98624 4.25638 7.95239C4.33762 7.91855 4.41136 7.86895 4.47333 7.80646L7.80667 4.47313C7.86736 4.40973 7.91494 4.33497 7.94667 4.25313C8.01335 4.09082 8.01335 3.90877 7.94667 3.74646Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="result-date-text">
              {endDate ? endDate.toDateString().substring(4) : t("check-out")}
            </div>

            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00004 12.6665C7.1319 12.6665 7.26079 12.6274 7.37042 12.5542C7.48005 12.4809 7.5655 12.3768 7.61596 12.255C7.66642 12.1331 7.67962 11.9991 7.6539 11.8698C7.62817 11.7405 7.56468 11.6217 7.47145 11.5284C7.37821 11.4352 7.25942 11.3717 7.1301 11.346C7.00078 11.3203 6.86674 11.3335 6.74492 11.3839C6.6231 11.4344 6.51898 11.5198 6.44573 11.6295C6.37247 11.7391 6.33337 11.868 6.33337 11.9998C6.33337 12.1766 6.40361 12.3462 6.52864 12.4712C6.65366 12.5963 6.82323 12.6665 7.00004 12.6665ZM10.3334 12.6665C10.4652 12.6665 10.5941 12.6274 10.7038 12.5542C10.8134 12.4809 10.8988 12.3768 10.9493 12.255C10.9998 12.1331 11.013 11.9991 10.9872 11.8698C10.9615 11.7405 10.898 11.6217 10.8048 11.5284C10.7115 11.4352 10.5928 11.3717 10.4634 11.346C10.3341 11.3203 10.2001 11.3335 10.0783 11.3839C9.95644 11.4344 9.85231 11.5198 9.77906 11.6295C9.70581 11.7391 9.66671 11.868 9.66671 11.9998C9.66671 12.1766 9.73695 12.3462 9.86197 12.4712C9.98699 12.5963 10.1566 12.6665 10.3334 12.6665ZM10.3334 9.99984C10.4652 9.99984 10.5941 9.96074 10.7038 9.88748C10.8134 9.81423 10.8988 9.71011 10.9493 9.58829C10.9998 9.46648 11.013 9.33243 10.9872 9.20311C10.9615 9.07379 10.898 8.955 10.8048 8.86177C10.7115 8.76853 10.5928 8.70504 10.4634 8.67931C10.3341 8.65359 10.2001 8.66679 10.0783 8.71725C9.95644 8.76771 9.85231 8.85316 9.77906 8.96279C9.70581 9.07242 9.66671 9.20132 9.66671 9.33317C9.66671 9.50998 9.73695 9.67955 9.86197 9.80457C9.98699 9.9296 10.1566 9.99984 10.3334 9.99984ZM7.00004 9.99984C7.1319 9.99984 7.26079 9.96074 7.37042 9.88748C7.48005 9.81423 7.5655 9.71011 7.61596 9.58829C7.66642 9.46648 7.67962 9.33243 7.6539 9.20311C7.62817 9.07379 7.56468 8.955 7.47145 8.86177C7.37821 8.76853 7.25942 8.70504 7.1301 8.67931C7.00078 8.65359 6.86674 8.66679 6.74492 8.71725C6.6231 8.76771 6.51898 8.85316 6.44573 8.96279C6.37247 9.07242 6.33337 9.20132 6.33337 9.33317C6.33337 9.50998 6.40361 9.67955 6.52864 9.80457C6.65366 9.9296 6.82323 9.99984 7.00004 9.99984ZM11.6667 1.99984H11V1.33317C11 1.15636 10.9298 0.98679 10.8048 0.861766C10.6798 0.736742 10.5102 0.666504 10.3334 0.666504C10.1566 0.666504 9.98699 0.736742 9.86197 0.861766C9.73695 0.98679 9.66671 1.15636 9.66671 1.33317V1.99984H4.33337V1.33317C4.33337 1.15636 4.26314 0.98679 4.13811 0.861766C4.01309 0.736742 3.84352 0.666504 3.66671 0.666504C3.4899 0.666504 3.32033 0.736742 3.1953 0.861766C3.07028 0.98679 3.00004 1.15636 3.00004 1.33317V1.99984H2.33337C1.80294 1.99984 1.29423 2.21055 0.919161 2.58562C0.544088 2.9607 0.333374 3.4694 0.333374 3.99984V13.3332C0.333374 13.8636 0.544088 14.3723 0.919161 14.7474C1.29423 15.1225 1.80294 15.3332 2.33337 15.3332H11.6667C12.1971 15.3332 12.7058 15.1225 13.0809 14.7474C13.456 14.3723 13.6667 13.8636 13.6667 13.3332V3.99984C13.6667 3.4694 13.456 2.9607 13.0809 2.58562C12.7058 2.21055 12.1971 1.99984 11.6667 1.99984ZM12.3334 13.3332C12.3334 13.51 12.2631 13.6796 12.1381 13.8046C12.0131 13.9296 11.8435 13.9998 11.6667 13.9998H2.33337C2.15656 13.9998 1.98699 13.9296 1.86197 13.8046C1.73695 13.6796 1.66671 13.51 1.66671 13.3332V7.33317H12.3334V13.3332ZM12.3334 5.99984H1.66671V3.99984C1.66671 3.82303 1.73695 3.65346 1.86197 3.52843C1.98699 3.40341 2.15656 3.33317 2.33337 3.33317H3.00004V3.99984C3.00004 4.17665 3.07028 4.34622 3.1953 4.47124C3.32033 4.59627 3.4899 4.6665 3.66671 4.6665C3.84352 4.6665 4.01309 4.59627 4.13811 4.47124C4.26314 4.34622 4.33337 4.17665 4.33337 3.99984V3.33317H9.66671V3.99984C9.66671 4.17665 9.73695 4.34622 9.86197 4.47124C9.98699 4.59627 10.1566 4.6665 10.3334 4.6665C10.5102 4.6665 10.6798 4.59627 10.8048 4.47124C10.9298 4.34622 11 4.17665 11 3.99984V3.33317H11.6667C11.8435 3.33317 12.0131 3.40341 12.1381 3.52843C12.2631 3.65346 12.3334 3.82303 12.3334 3.99984V5.99984ZM3.66671 9.99984C3.79856 9.99984 3.92745 9.96074 4.03709 9.88748C4.14672 9.81423 4.23217 9.71011 4.28263 9.58829C4.33309 9.46648 4.34629 9.33243 4.32056 9.20311C4.29484 9.07379 4.23135 8.955 4.13811 8.86177C4.04488 8.76853 3.92609 8.70504 3.79677 8.67931C3.66745 8.65359 3.5334 8.66679 3.41159 8.71725C3.28977 8.76771 3.18565 8.85316 3.11239 8.96279C3.03914 9.07242 3.00004 9.20132 3.00004 9.33317C3.00004 9.50998 3.07028 9.67955 3.1953 9.80457C3.32033 9.9296 3.4899 9.99984 3.66671 9.99984ZM3.66671 12.6665C3.79856 12.6665 3.92745 12.6274 4.03709 12.5542C4.14672 12.4809 4.23217 12.3768 4.28263 12.255C4.33309 12.1331 4.34629 11.9991 4.32056 11.8698C4.29484 11.7405 4.23135 11.6217 4.13811 11.5284C4.04488 11.4352 3.92609 11.3717 3.79677 11.346C3.66745 11.3203 3.5334 11.3335 3.41159 11.3839C3.28977 11.4344 3.18565 11.5198 3.11239 11.6295C3.03914 11.7391 3.00004 11.868 3.00004 11.9998C3.00004 12.1766 3.07028 12.3462 3.1953 12.4712C3.32033 12.5963 3.4899 12.6665 3.66671 12.6665Z"
                fill="black"
              />
            </svg>
          </button>
          <div className="result-calendar">
            {showCalendar && (
              <div className="result-calendar-view">
                <Calendar
                  onChange={(date) => handleDateChange(date as Date)}
                  value={[startDate!, endDate!]}
                  tileContent={tileContent}
                  showDoubleView
                  showNeighboringMonth={false}
                  showFixedNumberOfWeeks={false}
                  view="month"
                  minDate={new Date()}
                  maxDate={calculateMaxDate(startDate)}
                  tileClassName={"result-calendar-top"}
                  formatShortWeekday={(_, date) => displayDays(date)}
                  calendarType="gregory"
                />
                <div className="result-apply-dates">
                  <button
                    className="result-apply-dates__button disabled"
                    id="result-apply-dates"
                    onClick={applyDatesHandler}
                  >
                    Apply Dates
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="result-button-search">
          <Link to="/resultPage">
            <button className="result-search-btn" onClick={handleSubmit}>
              {t("SEARCH")}
            </button>
          </Link>

          {/* <div id="error-msg" className="error"></div> */}
        </div>
      </div>

      <div className="bottomcontent">
        <div className="bottomfilter">
          <div className="heading-filter">Narrow your results</div>

          <div className="filters">
            <div className="filters-heading">
              <div className="filters-name">Filter name1</div>
              <button
                className={
                  showFilters1 === true
                    ? "arrow-symbol up"
                    : "arrow-symbol down"
                }
                onClick={() => setShowFilters1(!showFilters1)}
              ></button>
            </div>

            {showFilters1 && <div className="filters-name">Queen Bed</div>}
            <hr className="line" />
          </div>

          <div className="filters">
            <div className="filters-heading">
              <div className="filters-name">Filter name2</div>
              <button
                className={
                  showFilters2 === true
                    ? "arrow-symbol up"
                    : "arrow-symbol down"
                }
                onClick={() => setShowFilters2(!showFilters2)}
              ></button>
            </div>
            {showFilters2 && (
              <label className="filters-name">
                <input type="checkbox" className="input-check" />
                Queen Bed
              </label>
            )}
            <hr className="line" />
          </div>

          <div className="filters">
            <div className="filters-heading">
              <div className="filters-name">Filter name3</div>
              <button
                className={
                  showFilters3 === true
                    ? "arrow-symbol up"
                    : "arrow-symbol down"
                }
                onClick={() => setShowFilters3(!showFilters3)}
              ></button>
            </div>
            {showFilters3 && <div className="filters-name">Queen Bed</div>}
          </div>

          {/* <div>Filter name2</div>
            <div>Filter name3</div> */}
        </div>
        <div className="rooms">rooms list</div>
        <div className="itinerary">Itinerary</div>
      </div>
    </div>
  );
}
