import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setBeds } from "../../redux/searchSlice";
import { useState } from "react";
import { t } from "i18next";

export const BedCount = () => {
    const dispatch = useDispatch();

    const beds = useSelector((state: RootState) => state.filterStates.beds);

    const [showBeds, setShowBeds] = useState(false);

    return (
        <div className="result-room-feature">
            <button
                id="bed"
                className="result-dropdown-room"
                value={beds}
                onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    dispatch(setBeds(target.value));
                }}
                onClick={() => setShowBeds(!showBeds)}
            >
                <div style={{ color: "#858685" }}>{t("Beds")}</div>
                <div>{beds}</div>
            </button>
            <div>
                {showBeds && (
                    <div className="room-num">
                        {Array.from({ length: 3 }, (_, i) => i + 1).map(
                            (room) => (
                                <button
                                    className="result-roomOption"
                                    key={room}
                                    onClick={(e) => {
                                        const target =
                                            e.target as HTMLButtonElement;
                                        dispatch(setBeds(target.textContent));
                                        setShowBeds(false);
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
