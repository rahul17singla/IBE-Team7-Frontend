import { RoomCard } from "./card/RoomCard";
import down from "../../assets/Down.svg";
import "./RoomCards.scss";
import { useState } from "react";

export const RoomCards = () => {
    const [openSortPriceDropdown, setOpenSortPriceDropdown] = useState(false);

    return (
        <div className="listrooms">
            <div className="listrooms_menubar">
                <p className="roomresult_txt">Room Results</p>
                <div className="roomresults_page_div">
                    <p className="roomresults_result_txt">
                        {" "}
                        Showing 1-3 of 6 Results{" "}
                    </p>
                    <p className="space"> | </p>
                    <div>
                        <button
                            className="roomresults_price_dropdown"
                            onClick={() => {
                                setOpenSortPriceDropdown(
                                    !openSortPriceDropdown
                                );
                            }}
                        >
                            Price
                            <div className="roomresults_dropdown_div">
                                <img
                                    src={down}
                                    className="roomresults_dropdown_img"
                                />
                            </div>
                        </button>
                        {
                            // sort price dropdown
                            openSortPriceDropdown && (
                                <div className="sort_price_dropdown">
                                    <button className="sort_button">
                                        Low to High
                                    </button>
                                    <button className="sort_button">
                                        High to Low
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="listrooms_div">
                <RoomCard />
                <RoomCard />
                <RoomCard />
            </div>
        </div>
    );
};
