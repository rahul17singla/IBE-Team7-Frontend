import "./Header.scss";
import language from "../../assets/enicon.png";
import currency from "../../assets/USDIcon.png";
import { Link } from "react-router-dom";
export function Header() {
    return (
        <div className="header">
            <div className="header-left">
                <Link
                    to={"/"}
                    style={{
                        fontWeight: "bolder",
                        color: "#26266D",
                        textDecoration: "none",
                    }}
                >
                    Kickdrum
                </Link>
                <Link to={"/"} className="header-left__text">
                    Internet Booking Engine
                </Link>
            </div>
            <div className="header-right">
                <button className="language">
                    <img src={language} alt="EN" />
                    <select className="language" name="language" id="language">
                        <option value="En">En</option>
                        <option value="Spa">Spa</option>
                    </select>
                </button>
                <button className="currency">
                    <img src={currency} alt="USD" />
                    <select className="currency" name="currency" id="currency">
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                    </select>
                </button>
            </div>
        </div>
    );
}
