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
                                        !e.target.checked
                                            ? dispatch(removeRoomType("suite"))
                                            : dispatch(setRoomType("suite"));
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
                                        !e.target.checked
                                            ? dispatch(removeRoomType("deluxe"))
                                            : dispatch(setRoomType("deluxe"));
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
                                        !e.target.checked
                                            ? dispatch(removeBedType("queen"))
                                            : dispatch(setBedType("queen"));
                                    }}
                                />
                                <p className="checkbox_txt">Queen bed</p>
                            </div>
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    checked={bedType.includes("king")}
                                    onChange={(e) => {
                                        !e.target.checked
                                            ? dispatch(removeBedType("king"))
                                            : dispatch(setBedType("king"));
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
                                    onChange={() => {
                                        priceLessThan === 150
                                            ? dispatch(
                                                  setPriceLessThan(1000000)
                                              )
                                            : dispatch(setPriceLessThan(150));
                                    }}
                                />
                                <p className="checkbox_txt">less than $150</p>
                            </div>
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        priceLessThan === 200
                                            ? dispatch(
                                                  setPriceLessThan(1000000)
                                              )
                                            : dispatch(setPriceLessThan(200));
                                    }}
                                />
                                <p className="checkbox_txt">less than $200</p>
                            </div>
                            <div className="dropdown_div">
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        priceLessThan === 300
                                            ? dispatch(
                                                  setPriceLessThan(1000000)
                                              )
                                            : dispatch(setPriceLessThan(300));
                                    }}
                                />
                                <p className="checkbox_txt">less than $300</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
