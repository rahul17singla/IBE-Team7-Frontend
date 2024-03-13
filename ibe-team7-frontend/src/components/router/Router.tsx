import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};
