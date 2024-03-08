import "./Footer.scss";
import image from "../../assets/image.png";
export function Footer() {
    return (
        <div className="footer">
            <div className="footerLeft">
                <img className="Kimg" src={image} alt="Kickdrum" />
            </div>
            <div className="footerRight">
                <div>© Kickdrum Technology Group LLC.</div>
                <div>All rights reserved.</div>
            </div>
        </div>
    );
}
