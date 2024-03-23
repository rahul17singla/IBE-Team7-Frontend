import { RoomCard } from "./card/RoomCard";
import down from "../../assets/Down.svg";
import "./RoomCards.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSort } from "../../redux/resultSlice";


export const RoomCards = () => {
    const [openSortPriceDropdown, setOpenSortPriceDropdown] = useState(false);
  

    const dispatch =useDispatch();
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
                                    <button className="sort_button" onClick={()=>dispatch(setSort(1))}>
                                        Low to High
                                    </button>
                                    <button className="sort_button" onClick={()=>dispatch(setSort(2))}>
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
