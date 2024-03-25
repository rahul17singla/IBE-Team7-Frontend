import { CarouselComponent } from "./CarouselComponent";
import Doublebed from "../../../assets/doublebed.svg";
import location from "../../../assets/location.svg";
import User from "../../../assets/user.svg";
import "./RoomCard.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const RoomCard = ({ room }: any) => {
    const currencyValue = useSelector(
        (state: RootState) => state.currency.value
    );

    const currencyType = useSelector(
        (state: RootState) => state.currency.currency
    );

    return (
        <div className="room_card">
            <div>
                <CarouselComponent name={room.roomTypeName} />
            </div>
            <div className="room_content">
                <div className="room_content_heading">
                    <div className="room_name_div">
                        <p className="room_name_txt">{room.roomTypeName}</p>
                    </div>
                    <div className="room_rating_div">
                        <p className="room_rating_txt">New Property</p>
                    </div>
                </div>
                <div className="room_address_div">
                    <div className="room_address_symbol">
                        <img src={location} alt="SVG Icon" />
                    </div>
                    <p className="room_address_txt">Near city center</p>
                </div>
                <div className="room_inclusive_div">
                    <p className="room_inclusive_txt">Inclusive</p>
                    <p className="room_area_txt">{room.area} ft.</p>
                </div>
                <div className="room_occupancy_div">
                    <div className="room_user_symbol">
                        {" "}
                        <img src={User} alt="SVG Icon" />
                    </div>
                    <p className="room_user_txt">{room.maxCapacity}</p>
                </div>
                <div className="room_bed_div">
                    <div className="room_bed_symbol">
                        <img src={Doublebed} alt="SVG Icon" />
                    </div>
                    <p className="room_bed_txt">
                        {
                            // if room.singleBed is 0, then don't show it
                            room.singleBed === 0 ? "" : room.singleBed + "Queen"
                        }
                        {"  "}
                        {room.doubleBed === 0 ? "" : room.doubleBed + "King"}
                    </p>
                </div>
            </div>

            {/* <SpecialDeal /> */}

            <div className="room_deal_div">
                <div className="room_price_div">
                    <p className="room_price">
                        {currencyType === "USD"
                            ? `$${(room.avgPrice * currencyValue).toFixed(2)}`
                            : `₹${(room.avgPrice * currencyValue).toFixed(2)}`}
                    </p>
                    <p className="room_price_txt">per night</p>
                </div>
                <button className="room_select_button"> SELECT ROOM</button>
            </div>
        </div>
    );
};
