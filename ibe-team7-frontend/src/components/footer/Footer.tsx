import "../../styling/Footer.scss";
import image from "../../assets/image.png";
export function Footer() {
  return (
    <div className="footer">
      <div className="footerLeft">
        <img className="Kimg" src={image} alt="hello" />
      </div>
      <div className="footerRight">
        © Kickdrum Technology Group LLC.
        <br />
        All rights reserved.
      </div>
    </div>
  );
}
