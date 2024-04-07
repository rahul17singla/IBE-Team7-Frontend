import { useNavigate } from "react-router-dom";
import "./Itinerary.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { Currency, Months } from "../../enums/Enums";
import { setShowItinerary } from "../../redux/checkoutSlice";

export const Itinerary = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!property || !property3 || !startDate || !endDate) {
            navigate("/");
        }
    }, []);

    const {
        property,
        property3,
        startDate,
        endDate,
        guestsAdult,
        guestsTeens,
        guestsChildren,
    } = useSelector((state: RootState) => state.filterStates);

    const sort = useSelector((state: RootState) => state.results.sort);

    const currencyValue = useSelector(
        (state: RootState) => state.currency.value
    );

    const currencyType = useSelector(
        (state: RootState) => state.currency.currency
    );

    const roomTotalPrice = useSelector(
        (state: RootState) => state.checkout.checkout.roomTotal
    );

    const roomCart = useSelector(
        (state: RootState) => state.checkout.checkout.cart
    );

    const continueShopping = () => {
        // if current page is room result then navigate to checkout
        // else navigate to room result
        if (window.location.pathname === "/room-result") {
            const resultUrl = `/checkout?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString(
                "en-GB"
            )}&endDate=${endDate?.toLocaleDateString(
                "en-GB"
            )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;
            navigate(resultUrl);
            return;
        }

        const resultUrl = `/room-result?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString(
            "en-GB"
        )}&endDate=${endDate?.toLocaleDateString(
            "en-GB"
        )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;
        navigate(resultUrl);
    };

    const showDates = () => {
        return startDate && endDate
            ? startDate.getDate() +
                  " " +
                  Months[startDate.getMonth()] +
                  " - " +
                  endDate.getDate() +
                  " " +
                  Months[endDate.getMonth()] +
                  " " +
                  endDate.getFullYear()
            : "";
    };

    const removeItinerary = () => {
        dispatch(setShowItinerary(false));
        const resultUrl = `/room-result?property=${property}&room=${property3}&startDate=${startDate?.toLocaleDateString(
            "en-GB"
        )}&endDate=${endDate?.toLocaleDateString(
            "en-GB"
        )}&adults=${guestsAdult}&teens=${guestsTeens}&kids=${guestsChildren}&sort=${sort}`;
        navigate(resultUrl);
    };

    return (
        <div className="itinerary-container">
            <div className="itinerary">
                <div className="itinerary_heading">
                    <div>Your Trip Itinerary</div>
                    <button
                        className="itinerary-remove"
                        onClick={removeItinerary}
                    >
                        Remove
                    </button>
                </div>
                <div className="itinerary-top">
                    <div className="room-type-name">{roomCart.room}</div>
                    <div className="itinerary-text">
                        {showDates()} | {guestsAdult} adults{" "}
                        {guestsTeens > 0 ? guestsTeens + ", teens," : ""}{" "}
                        {guestsChildren > 0 ? guestsChildren + ", kids" : ""}
                    </div>
                    <div className="itinerary-text">Executive Room</div>
                    <div className="itinerary-text">
                        {currencyType === Currency.USD ? "$" : "₹"}
                        {startDate && endDate
                            ? (
                                  (roomTotalPrice * currencyValue * 1.205) /
                                  (endDate?.getDate() - startDate?.getDate())
                              ).toFixed(2)
                            : (roomTotalPrice * currencyValue * 1.205).toFixed(
                                  2
                              )}
                        /night
                    </div>
                    <div className="itinerary-text">{property3} rooms</div>
                    <div className="itinerary-text">
                        Special Promoname,{" "}
                        {currencyType === Currency.USD ? "$" : "₹"}
                        {(roomTotalPrice * currencyValue).toFixed(2)}/night
                    </div>
                </div>
                <div className="itinerary-pricing">
                    <div className="price-name">
                        <div className="itinerary-text">Subtotal</div>
                        <div className="price">
                            {currencyType === Currency.USD ? "$" : "₹"}
                            {(roomTotalPrice * currencyValue).toFixed(2)}
                        </div>
                    </div>
                    <div className="price-name">
                        <div className="itinerary-text">
                            Taxes, Surcharges, Fees
                        </div>
                        <div className="price">
                            {currencyType === Currency.USD ? "$" : "₹"}
                            {(roomTotalPrice * currencyValue * 0.18).toFixed(2)}
                        </div>
                    </div>
                    <div className="price-name">
                        <div className="itinerary-text">VAT</div>
                        <div className="price">
                            {currencyType === Currency.USD ? "$" : "₹"}
                            {(roomTotalPrice * currencyValue * 0.025).toFixed(
                                2
                            )}
                        </div>
                    </div>
                </div>
                <div className="itinerary-due">
                    <div className="price-name">
                        <div className="itinerary-text">Due Now</div>
                        <div className="price">
                            {currencyType === Currency.USD ? "$" : "₹"}
                            {(
                                roomTotalPrice *
                                currencyValue *
                                1.205 *
                                0.5
                            ).toFixed(2)}
                        </div>
                    </div>
                    <div className="price-name">
                        <div className="itinerary-text">Due at Resort</div>
                        <div className="price">
                            {currencyType === Currency.USD ? "$" : "₹"}
                            {(
                                roomTotalPrice *
                                currencyValue *
                                1.205 *
                                0.5
                            ).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="continueBtn-div">
                    <button className="continueBtn" onClick={continueShopping}>
                        Continue Shopping
                    </button>
                </div>
            </div>
            <div className="contact itinerary">
                <h2>Need help?</h2>
                <h4>Call 1-800-555-5555</h4>
                <div>Mon-Fr 8a-5p EST</div>
            </div>
        </div>
    );
};
