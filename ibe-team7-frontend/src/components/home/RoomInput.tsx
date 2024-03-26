import { useDispatch, useSelector } from "react-redux";
import { setProperty3, setShowGuests } from "../../redux/searchSlice";
import { t } from "i18next";
import { RootState } from "../../redux/store";

export const RoomInput = () => {
    const dispatch = useDispatch();

    const maxRooms = useSelector(
        (state: RootState) => state.filterStates.maxRooms
    );
    const property3 = useSelector(
        (state: RootState) => state.filterStates.property3
    );

    return (
        <div className="room-feature">
            <label htmlFor="room" className="dropdown-heading-room">
                {t("Rooms")}{" "}
            </label>
            <select
                id="room"
                className="dropdown-room"
                value={property3}
                onFocus={() => {
                    dispatch(setShowGuests(false));
                }}
                onChange={(e) => {
                    dispatch(setProperty3(e.target.value));
                }}
            >
                {Array.from({ length: maxRooms }, (_, i) => i + 1).map(
                    (room) => (
                        <option className="roomOption" value={room} key={room}>
                            {room}
                        </option>
                    )
                )}
            </select>
        </div>
    );
};
