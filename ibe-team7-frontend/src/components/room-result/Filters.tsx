import { useState } from "react";
import "./Filters.scss";
import Down from "../../assets/Down.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    removeBedType,
    removeRoomType,
    setBedType,
    setPriceLessThan,
    setRoomType,
} from "../../redux/resultSlice";
import { RootState } from "../../redux/store";
export function Filters() {
    const [isBedFilterOpen, setIsBedFilterOpen] = useState(false);
    const [isRoomFilterOpen, setIsRoomFilterOpen] = useState(false);
    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);

    const roomType = useSelector((state: RootState) => state.results.roomType);
    const bedType = useSelector((state: RootState) => state.results.bedType);
    const priceLessThan = useSelector(
        (state: RootState) => state.results.priceLessThan
    );

    const changeBedType = (
        e: React.ChangeEvent<HTMLInputElement>,
        bedType: string
    ) => {
        !e.target.checked
            ? dispatch(removeBedType(bedType))
            : dispatch(setBedType(bedType));
    };

    const changeRoomType = (
        e: React.ChangeEvent<HTMLInputElement>,
        roomType: string
    ) => {
        !e.target.checked
            ? dispatch(removeRoomType(roomType))
            : dispatch(setRoomType(roomType));
    };

    const handlePriceLessThanFilter = (price: number) => {
        dispatch(setPriceLessThan(priceLessThan === price ? 1000000 : price));
    };

    const dispatch = useDispatch();

    return (
        <div className="filters">
            <div className="title_div">
                <p className="title_heading_txt">Narrow your results</p>
            </div>
            <div className="allfilters_div">
                <div className="filter_div">
                    <div className="filter_data_div">
                        <p className="filter_title">Room Type</p>
                        <button
                            className="filter_dropdown_btn"
                            onClick={() => {
                                setIsRoomFilterOpen((prevState) => !prevState);
                            }}
                        >
                            <img src={Down} className="dropdown-img" />
                        </button>{" "}
                    </div>
                    {isRoomFilterOpen && (
                        <div className="alldropdown_div">
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={roomType.includes("suite")}
                                    id="suite"
                                    onChange={(e) => {
                                        changeRoomType(e, "suite");
                                    }}
                                />
                                <p className="checkbox_txt">Suite</p>
                            </div>
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={roomType.includes("deluxe")}
                                    id="deluxe"
                                    onChange={(e) => {
                                        changeRoomType(e, "deluxe");
                                    }}
                                />
                                <p className="checkbox_txt">Deluxe</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="filter_div">
                    <div className="filter_data_div">
                        <p className="filter_title">Beds</p>
                        <button
                            className="filter_dropdown_btn"
                            onClick={() => {
                                setIsBedFilterOpen((prevState) => !prevState);
                            }}
                        >
                            <img src={Down} className="dropdown-img" />
                        </button>
                    </div>

                    {isBedFilterOpen && (
                        <div className="alldropdown_div">
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={bedType.includes("queen")}
                                    onChange={(e) => {
                                        changeBedType(e, "queen");
                                    }}
                                />
                                <p className="checkbox_txt">Queen bed</p>
                            </div>
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={bedType.includes("king")}
                                    onChange={(e) => {
                                        changeBedType(e, "king");
                                    }}
                                />
                                <p className="checkbox_txt">King bed</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="filter_div">
                    <div className="filter_data_div">
                        <p className="filter_title">Max Price</p>
                        <button
                            className="filter_dropdown_btn"
                            onClick={() => {
                                setIsPriceFilterOpen((prevState) => !prevState);
                            }}
                        >
                            <img src={Down} className="dropdown-img" />
                        </button>
                    </div>
                    {isPriceFilterOpen && (
                        <div className="alldropdown_div">
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={priceLessThan === 50}
                                    onChange={() =>
                                        handlePriceLessThanFilter(50)
                                    }
                                />
                                <p className="checkbox_txt">less than $50</p>
                            </div>
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={priceLessThan === 100}
                                    onChange={() =>
                                        handlePriceLessThanFilter(100)
                                    }
                                />
                                <p className="checkbox_txt">less than $100</p>
                            </div>
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={priceLessThan === 150}
                                    onChange={() =>
                                        handlePriceLessThanFilter(150)
                                    }
                                />
                                <p className="checkbox_txt">less than $150</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
