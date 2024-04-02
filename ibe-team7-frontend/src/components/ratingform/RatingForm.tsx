import "./RatingForm.scss";

export const RatingForm = () => {
    return (
        <div className="ratingform">
            <h1>Rating Form</h1>
            <p>How was your experience?</p>
            <select name="rating" id="rating">
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
            </select>
            <button className="login-btn">Submit</button>
        </div>
    );
};
