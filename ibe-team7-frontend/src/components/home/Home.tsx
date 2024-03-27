import { Footer } from "../footer/Footer";
import "./Home.scss";
import { Search } from "./Search";

export function Home() {
    // const loading = useSelector((state: RootState) => state.loading);

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
