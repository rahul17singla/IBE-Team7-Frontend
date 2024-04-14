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

    const [bookings, setBookings] = useState([
        { id: 1, title: "Hotel XYZ", date: "2024-04-15", location: "New York" },
        { id: 2, title: "Hotel ABC", date: "2024-05-01", location: "Paris" },
    ]);

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
        };

        fetchBookings();
    }, [email]);

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
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking">
                            <div className="booking-details">
                                <div className="booking-info">
                                    <span>Title:</span> {booking.title}
                                </div>
                                <div className="booking-info">
                                    <span>Date:</span> {booking.date}
                                </div>
                                <div className="booking-info">
                                    <span>Location:</span> {booking.location}
                                </div>
                            </div>
                            <button className="view-booking">
                                View Bookings
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};
