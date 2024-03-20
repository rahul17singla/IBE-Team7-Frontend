import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Login } from "../login/Login";
import { Signup } from "../signup/Signup";
import { RoomResult } from "../room-result/RoomResult";

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
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};
