import { Filters } from "./Filters";
import { RoomCards } from "./RoomCards";
import { RoomForm } from "./RoomForm";

export const Step1Page = () => {
    return (
        <div className="result-page-container">
            <RoomForm />
            <div className="filter-rooms-container">
                <Filters />
                <RoomCards />
            </div>
        </div>
    );
};
