import "./Header.scss";
import language from "../../assets/enicon.png";
import currencyImg from "../../assets/USDIcon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../redux/currencySlice";
import { Currency } from "../../enums/Enums";
import { AccountContext } from "../account/Account";
import { setUser } from "../../redux/userSlice";
import { RootState } from "../../redux/store";

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

        try {
            const response = await fetch(
                `https://v6.exchangerate-api.com/v6/402eb762dd2cda9be698be0d/latest/USD`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch currency conversion rates");
            }
            const data = await response.json();
            console.log(data);

            dispatch(
                setCurrency({
                    currency: selectedCurrency,
                    value: data.conversion_rates[selectedCurrency],
                })
            );
        } catch (error) {
            console.error("Error fetching currency conversion rates:", error);
        }
    };

    const [status, setStatus] = useState<boolean>(false);

    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then((session: any) => {
                setStatus(true);
                dispatch(
                    setUser({
                        email: session.getIdToken().payload.email,
                        accessToken: session.getAccessToken().getJwtToken(),
                        idToken: session.getIdToken().getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken(),
                    })
                );
            })
            .catch(() => {
                setStatus(false);
            });
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = "/";
        setStatus(false);
    };

    const showMyBookings = () => {
        if (status) {
            window.location.href = `/mybookings`;
        } else {
            window.location.href = "/login";
        }
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
                <button className="my-bookings" onClick={showMyBookings}>
                    MY BOOKINGS
                </button>
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
                    <img src={currencyImg} alt={Currency.USD} />
                    <select
                        className="currency"
                        name="currency"
                        id="currency"
                        onChange={handleCurrencyChange}
                    >
                        <option value={Currency.USD}>{Currency.USD}</option>
                        <option value={Currency.INR}>{Currency.INR}</option>
                    </select>
                </button>
                {status ? (
                    <button className="login-btn" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="login-btn">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
