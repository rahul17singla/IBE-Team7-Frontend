import "./Home.scss";

import { CurrencyConverter } from "../currency-converter/CurrencyConverter";
import LanguageConversion from "../language-conversion/LanguageConversion";
import { useEffect, useState } from "react";
import axios from "axios";
import {  ListProperty } from "../../types/Property";

export function Home() {
  const env = import.meta.env.VITE_REACT_APP_ENV;

  // Define a method that intentionally throws an error
  const methodThatThrowsError = () => {
    throw new Error("This is an intentional error!");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8088/property");
        console.log(response.data.data.listProperties);
        setData(response.data.data.listProperties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
        <LanguageConversion />
      </div>

      <div>
        <CurrencyConverter />
      </div>
      <div style={{ fontSize: "2rem" }}>
        TEST DATA
        {data.map((property: ListProperty) => (
          <div key={property.property_id}>
            <p>{property.property_id}</p>
            <p>{property.property_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
