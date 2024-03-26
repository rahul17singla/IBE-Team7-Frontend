import { useEffect } from "react";
import { Footer } from "../footer/Footer";
import "./Home.scss";
import { Search } from "./Search";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadingSlice";

export function Home() {
    // const loading = useSelector((state: RootState) => state.loading);

    const dispatch = useDispatch();

    setTimeout(() => {
        dispatch(setLoading(false));
    }, 100);

    return (
        <div style={{}}>
            <div className="main">
                <div className="home">
                    <Search />
                </div>
            </div>
            <Footer />
        </div>
    );
}
