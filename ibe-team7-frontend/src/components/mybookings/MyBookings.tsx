import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import "./MyBookings.scss";
import { BACKEND_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MyBookings = () => {
    const email = useSelector((state: RootState) => state.user.email);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        console.log({ email });
        const fetchBookings = async () => {
            const response = await axios.get(
                `${BACKEND_URL}/api/v1/mybookings`,
                {
                    params: { emailId: email },
                }
            );
            const data = await response.data;
            console.log(data);
            setBookings(data);
        };

        fetchBookings();
    }, [email]);

    const viewBooking = (bookingId: string) => {
        window.location.href = `confirmation/${bookingId}`;
    };

    return email === "" ? (
        <div>
            <h1>Please login to view your bookings</h1>
            <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
    ) : (
        <div className="my-bookings-container">
            <h2>
                Bookings for <span style={{ color: "#26266d" }}>{email}</span>
            </h2>

            <br />
            <div className="booking-list">
                {bookings.map((booking: any) => (
                    <div key={booking.bookingMapperId} className="booking">
                        <div className="booking-details">
                            <div className="booking-info">
                                <span>Booking Id:</span>{" "}
                                {booking.bookingMapperId}
                            </div>
                            <div className="booking-info">
                                <span>Full Name:</span> {booking.firstName}{" "}
                                {booking.lastName}
                            </div>
                            <div className="booking-info">
                                <span>Start Date:</span>{" "}
                                {booking.startDate.split("T")[0]}
                            </div>
                            <div className="booking-info">
                                <span>End Date:</span>{" "}
                                {booking.endDate.split("T")[0]}
                            </div>
                        </div>
                        <button
                            className="view-booking"
                            onClick={() => viewBooking(booking.bookingMapperId)}
                        >
                            View Booking
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
