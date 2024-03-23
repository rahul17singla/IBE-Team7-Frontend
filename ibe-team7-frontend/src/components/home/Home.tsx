import { Footer } from "../footer/Footer";
import "./Home.scss";
import { Search } from "./Search";

export function Home() {
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
