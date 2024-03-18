import "./Header.scss";
import language from "../../assets/enicon.png";
import currencyImg from "../../assets/USDIcon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../redux/currencySlice";

export function Header() {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const handleCurrencyChange = async (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCurrency = event.target.value.toString();
        console.log(selectedCurrency);

        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/f4c2fbc9af7f2297f39b0297/latest/USD`
        ).then((response) => response.json());
        dispatch(
            setCurrency({
                currency: selectedCurrency,
                value: response.conversion_rates[selectedCurrency],
            })
        );
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
                {t("Heading")}
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
                    <img src={currencyImg} alt="USD" />
                    <select
                        className="currency"
                        name="currency"
                        id="currency"
                        onChange={handleCurrencyChange}
                    >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                    </select>
                </button>
            </div>
        </div>
    );
}
