import { useState } from "react";
import "./RatingForm.scss";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../constants/Constants";
import axios from "axios";

export const RatingForm = () => {
    const [rating, setRating] = useState(5);
    const roomCart = useSelector(
        (state: RootState) => state.checkout.checkout.cart
    );
    const property = useSelector(
        (state: RootState) => state.filterStates.property
    );

    const handleRating = async (rating: number) => {
        await axios.post(`${BACKEND_URL}/api/v1/updatebooking`, {
            rating: rating,
            roomTypeId: roomCart.room,
            propertyId: property,
        });

        window.location.href = "/";
    };

    return (
        <div className="ratingform">
            <h1>Rating Form</h1>
            <p>How was your experience?</p>
            <select
                name="rating"
                id="rating"
                onChange={(e) => setRating(parseInt(e.target.value))}
            >
                <option value="5">5 Star</option>
                <option value="4">4 Star</option>
                <option value="3">3 Star</option>
                <option value="2">2 Star</option>
                <option value="1">1 Star</option>
            </select>
            <button className="login-btn" onClick={() => handleRating(rating)}>
                Submit
            </button>
        </div>
    );
};
