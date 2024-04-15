import { useState } from "react";
import "./RatingForm.scss";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../constants/Constants";
import axios from "axios";

export const RatingForm = () => {
    const [rating, setRating] = useState(5);
    const queryString = window.location.search;

    // Create a new URLSearchParams object with the query string
    const urlParams = new URLSearchParams(queryString);

    const roomTypeName = urlParams.get("roomTypeName");

    const property = useSelector(
        (state: RootState) => state.filterStates.property
    );

    const handleRating = async () => {
        console.log(rating, roomTypeName, property.substring(5, 6));
        await axios.post(`${BACKEND_URL}/api/v1/updaterating`, {
            rating: rating,
            roomTypeId: roomTypeName,
            propertyId: property.substring(5, 6),
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
            <button className="login-btn" onClick={handleRating}>
                Submit
            </button>
        </div>
    );
};
