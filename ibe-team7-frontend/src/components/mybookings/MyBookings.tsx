import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import "./MyBookings.scss";
import { BACKEND_URL, FRONTEND_URL } from "../../constants/Constants";
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

    return (
        /*
        <div className="my-bookings-container">
            <h2>My Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.title}</td>
                            <td>{booking.date}</td>
                            <td>{booking.location}</td>
                            <td>
                                <button
                                //className="delete-button"
                                //onClick={() => deleteBooking(booking.id)}
                                >
                                    Delete
                                </button>
                            </td>{" "}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        */
        email === "" ? (
            navigate("/login")
        ) : (
            <div className="my-bookings-container">
                <h2>
                    Bookings for{" "}
                    <span style={{ color: "#26266d" }}>{email}</span>
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
                                onClick={() =>
                                    viewBooking(booking.bookingMapperId)
                                }
                            >
                                View Booking
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};
