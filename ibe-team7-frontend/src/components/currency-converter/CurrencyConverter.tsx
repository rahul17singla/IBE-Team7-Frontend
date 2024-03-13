import { useState, useEffect } from "react";
import "./CurrencyConverter.scss";
import { Rates } from "../../types/Rates";

export function CurrencyConverter() {
    const [rates, setRates] = useState<Rates | undefined>();
    const [ratesFetched, setRatesFetched] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency, setToCurrency] = useState<string>("USD");
    const [output, setOutput] = useState<number | undefined>();

    const getRates = async () => {
        // fetch the data from API
        const response = await fetch(
            "https://v6.exchangerate-api.com/v6/f4c2fbc9af7f2297f39b0297/latest/USD"
        ).then((response) => response.json());

        // save the rates in the state
        if (response.result === "success") {
            setRates(response.conversion_rates);
            setRatesFetched(true);
        }
    };

    useEffect(() => {
        getRates();
    }, []);

    const calculateOutput = async () => {
        if (!rates) return;

        // fetch the selected from currency rates
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/f4c2fbc9af7f2297f39b0297/latest/${fromCurrency}`
        ).then((response) => response.json());
        const fetchedRates = response.conversion_rates;
        const currencyRate = fetchedRates[toCurrency];
        const outputValue = amount * currencyRate;
        setOutput(outputValue);
    };

    return (
        <div className="container">
            {/* <div className="input-amount">
                <label>Amount:</label>
                <CurrencyInput
                    value={amount}
                    onValueChange={(amountValue) =>
                        setAmount(
                            amountValue !== undefined
                                ? parseFloat(amountValue)
                                : 0
                        )
                    }
                    intlConfig={{ locale: "en-US", currency: fromCurrency }}
                    allowDecimals={true}
                    allowNegativeValue={false}
                />
                </div>
            */}

            {/*
            <div className="input-from">
                <label>From:</label>
                <select
                    id="from"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {ratesFetched ? (
                        Object.keys(rates!).map((currency, index) => (
                            <option key={index} value={currency}>
                                {currency}
                            </option>
                        ))
                    ) : (
                        <option>USD</option>
                    )}
                </select>
            </div> 
            */}

            {/* <div className="input-to">
                <label>To:</label>
                <select
                    id="to"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {ratesFetched ? (
                        Object.keys(rates!).map((currency, index) => (
                            <option key={index} value={currency}>
                                {currency}
                            </option>
                        ))
                    ) : (
                        <option>EUR</option>
                    )}
                </select>
            </div> */}
            <button className="btn" onClick={() => calculateOutput()}>
                Calculate
            </button>
            <div className="output">
                <label>Output: {output}</label>
            </div>
        </div>
    );
}
