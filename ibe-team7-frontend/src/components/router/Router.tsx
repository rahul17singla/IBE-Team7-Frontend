import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { Header } from "../header/Header";
import { Login } from "../login/Login";
import { Signup } from "../signup/Signup";
import { RoomResult } from "../room-result/RoomResult";
import { Checkout } from "../checkout/Checkout";
import { RatingForm } from "../ratingform/RatingForm";
import { Confirmation } from "../confirmation/Confirmation";
import { Panorama } from "../room-modal/Panorama";
import { MyBookings } from "../mybookings/MyBookings";

export const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/room-result" element={<RoomResult />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/rating" element={<RatingForm />} />
                    <Route
                        path="/confirmation/:id"
                        element={<Confirmation />}
                    />
                    <Route path="/panorama" element={<Panorama />} />
                    <Route path="/mybookings" element={<MyBookings />} />

                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
