import { useDispatch, useSelector } from "react-redux";
import { setProperty3 } from "../../redux/searchSlice";
import { t } from "i18next";
import { RootState } from "../../redux/store";
import { useState } from "react";

export const RoomInput = () => {
    const dispatch = useDispatch();

    const maxRooms = useSelector(
        (state: RootState) => state.filterStates.maxRooms
    );
    const property3 = useSelector(
        (state: RootState) => state.filterStates.property3
    );
    const [showRooms, setShowRooms] = useState(false);

    return (
        <div className="result-room-feature">
            <button
                id="room"
                className="result-dropdown-room"
                value={property3}
                onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    dispatch(setProperty3(target.value));
                }}
                onClick={() => setShowRooms(!showRooms)}
            >
                <div style={{ color: "#858685" }}>{t("Rooms")}</div>
                <div>{property3}</div>
            </button>
            <div>
                {showRooms && (
                    <div className="room-num">
                        {Array.from({ length: maxRooms }, (_, i) => i + 1).map(
                            (room) => (
                                <button
                                    className="result-roomOption"
                                    key={room}
                                    onClick={(e) => {
                                        const target =
                                            e.target as HTMLButtonElement;
                                        dispatch(
                                            setProperty3(target.textContent)
                                        );
                                        setShowRooms(false);
                                    }}
                                >
                                    {room}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
