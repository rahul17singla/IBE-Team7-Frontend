import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Itinerary } from "../itinerary/Itinerary";
import { Filters } from "./Filters";
import { RoomCards } from "./RoomCards";
import { RoomForm } from "./RoomForm";
import { Timer } from "../timer/Timer";

export const Step1Page = () => {
    const { showItinerary } = useSelector(
        (state: RootState) => state.checkout.checkout
    );

    return (
        <div className="result-page-container">
            {showItinerary && (
                <div style={{ display: "none" }}>
                    <Timer />
                </div>
            )}
            <RoomForm />
            <div className="filter-rooms-container">
                <Filters />
                <div className="cards-itinerary">
                    <RoomCards />
                    {showItinerary && <Itinerary />}
                </div>
            </div>
        </div>
    );
};
