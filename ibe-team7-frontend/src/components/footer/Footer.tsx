import "./Footer.scss";
import image from "../../assets/image.png";

import { useTranslation } from "react-i18next";
export function Footer() {
    const { t } = useTranslation();
    return (
        <div className="footer">
            <div className="footerLeft">
                <img className="Kimg" src={image} alt="Kickdrum" />
            </div>
            <div className="footerRight">
                <div>© Kickdrum Technology Group LLC.</div>
                <div>{t("copyright")}.</div>
            </div>
        </div>
    );
}
