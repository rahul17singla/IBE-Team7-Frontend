import "./Header.scss";
import language from "../../assets/enicon.png";
import currency from "../../assets/USDIcon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";

export function Header() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

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
                    <select
                        className="language"
                        name="language"
                        id="language"
                        onChange={handleLanguageChange}
                    >
                        <option value="en">En</option>
                        <option value="fr">Fr</option>
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
