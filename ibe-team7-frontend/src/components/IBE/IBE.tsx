import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Main } from "../main/Main";
import "../../styling/IBE.scss";
export default function IBE() {
  return (
    <div className="IBE">
      <div>
        <Header />
      </div>
      <div>
        <Main />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
