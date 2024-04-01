import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { Header } from "../header/Header";
import { Login } from "../login/Login";
import { Signup } from "../signup/Signup";
import { RoomResult } from "../room-result/RoomResult";
import { Checkout } from "../checkout/Checkout";
import { RatingForm } from "../ratingform/RatingForm";

export const Router = () => {
    // const [loading, setLoading] = useState<boolean>(true);

    // setTimeout(() => {
    //     setLoading(false);
    // }, 1000);

    // if (loading) {
    //     return <Loader />;
    // }

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

                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
