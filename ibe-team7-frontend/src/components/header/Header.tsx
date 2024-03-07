import "../../styling/Header.scss"; 
import img1 from "../../assets/enicon.png";
import img2 from "../../assets/USDIcon.png";
export function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <strong>Kickdrum</strong> Internet Booking Engine
      </div>
      <div className="header-right">
        <div className="img1">
          <img src={img1} alt="EN" />
          <span className="en-text">en</span>
        </div>
        <div className="img2">
          <img src={img2} alt="USD" />
          <span className="USD-text">USD</span>
        </div>
      </div>
    </div>
  );
}
