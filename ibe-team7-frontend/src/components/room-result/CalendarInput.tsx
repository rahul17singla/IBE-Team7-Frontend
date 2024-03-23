import { t } from "i18next";
import Calendar from "react-calendar";
import { DateObj } from "../../types/DateObj";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { RoomRate } from "../../types/RoomRate";
import axios from "axios";
import { setEndDate, setStartDate } from "../../redux/searchSlice";

interface CalendarInputProps {
    showCalendar: boolean;
    setShowCalendar: (showCalendar: boolean) => void;
}

export const CalendarInput = ({
    showCalendar,
    setShowCalendar,
}: CalendarInputProps) => {
    //

    const startDate = useSelector(
        (state: RootState) => state.filterStates.startDate
    );
    const endDate = useSelector(
        (state: RootState) => state.filterStates.endDate
    );

    const dispatch = useDispatch();

    const currencyValue = useSelector(
        (state: RootState) => state.currency.value
    );

    const currencyType = useSelector(
        (state: RootState) => state.currency.currency
    );

    const [roomMap, setRoomMap] = useState(new Map());
    const [rooms, setRooms] = useState<RoomRate[]>([]);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8088/api/v1/rooms"
                    // "https://swhytqcdde.execute-api.ap-northeast-1.amazonaws.com/team7/api/v1/rooms"
                    // "http://team7ibe.ap-northeast-1.elasticbeanstalk.com/api/v1/rooms"
                );
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRoomData();
    }, []);

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

    const handleDateChange = (date: Date) => {
        if (!startDate) {
            dispatch(setStartDate(date));
        } else if (!endDate) {
            if (date < startDate) {
                dispatch(setStartDate(date));
                dispatch(setEndDate(null));
            }
            dispatch(setEndDate(date));
            //remove disabled class from apply-dates button
            const applyDatesButton = document.getElementById("apply-dates");
            if (applyDatesButton) {
                applyDatesButton.classList.remove("disabled");
            }
        } else {
            dispatch(setStartDate(date));
            dispatch(setEndDate(null));
        }
    };

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
                {currencyType === "USD"
                    ? `$${convertedPrice}`
                    : `₹${convertedPrice}`}
            </div>
        );
    };

    const calculateMaxDate = (startDate: Date | undefined): Date => {
        if (!startDate) {
            return new Date("2050-12-31"); // Return large date if start date is not set
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

    const displayDays = (date: Date) => {
        const days = ["Su", "M", "T", "W", "Th", "F", "S"];
        return days[date.getDay()];
    };

    const applyDatesHandler = () => {
        setShowCalendar(false);
    };

    return (
        <>
            <button
                className="result-dates"
                onClick={() => setShowCalendar(!showCalendar)}
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
                    {endDate
                        ? endDate.toDateString().substring(4)
                        : t("check-out")}
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
                            // showDoubleView
                            showNeighboringMonth={false}
                            showFixedNumberOfWeeks={false}
                            view="month"
                            minDate={new Date()}
                            maxDate={calculateMaxDate(startDate)}
                            tileClassName={"calendar-top"}
                            formatShortWeekday={(_, date) => displayDays(date)}
                            calendarType="gregory"
                        />
                        <div className="apply-dates">
                            <button
                                className="apply-dates__button disabled"
                                id="apply-dates"
                                onClick={applyDatesHandler}
                            >
                                Apply Dates
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
