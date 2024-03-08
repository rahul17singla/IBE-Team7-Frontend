import "./Home.scss";

import { CurrencyConverter } from "../currency-converter/CurrencyConverter";
import LanguageConversion  from "../language-conversion/LanguageConversion";

export function Home() {
  const env = import.meta.env.VITE_REACT_APP_ENV;

  // Define a method that intentionally throws an error
  const methodThatThrowsError = () => {
    throw new Error("This is an intentional error!");
  };



  return (
    <div className="main">
        <div>
                <p>Welcome, {env}</p>
            {/* Call the methodThatThrowsError function */}
            <button onClick={methodThatThrowsError} className="btn">
                Break the world
            </button>
        </div>
     

 
     
      <div>
         
       <LanguageConversion/>

      </div>
       
      
      <div>
        <CurrencyConverter />
      </div>
    </div>
  );
}
