import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './SearchRooms.scss'

export function Search() {
    const [property1, setProperty1] = useState<string>("");
  const [property3, setProperty3] = useState<string>("");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  //for guests count
  const [guestsAdult, setGuestsAdult] = useState(1);
  const [guestsTeens, setGuestsTeens] = useState(0);
  const [guestsChildren, setGuestsChildren] = useState(0);
  const [showGuests, setShowGuests] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const getCustomTextForDate = (date: any) => {
    // Replace this with your logic to get custom text for each date
    // You can fetch data from your backend or use a predefined mapping
    return `Custom text for ${date.toDateString()}`;
  };
  const getPriceForDate = (date: any) => {
    // Replace this with your logic to get prices for each date
    // You can fetch data from your backend or use a predefined mapping
    return `$${Math.floor(Math.random() * 100) + 50}`;
  };
  const tileContent = ({ date, view }: any) => {
    if (view === "month") {
      // const customText = getCustomTextForDate(date);
      const price = getPriceForDate(date);
      return (
        <div>
          {/* <p>{customText}</p> */}
          <p>{price}</p>
        </div>
      );
    }
    return null;
  };
  const handleAdultIncrement = () => {
    setGuestsAdult(guestsAdult + 1);
  };

  const handleAdultDecrement = () => {
    setGuestsAdult(guestsAdult - 1);
  };4
  const handleTeensIncrement = () => {
    setGuestsTeens(guestsTeens + 1);
  };

  const handleTeensDecrement = () => {
    setGuestsTeens(guestsTeens - 1);
  };
  const handleChildrenIncrement = () => {
    setGuestsChildren(guestsChildren + 1);
  };

  const handleChildrenDecrement = () => {
    setGuestsChildren(guestsChildren - 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", {
      property1,
      startDate,
      endDate,
      guestsAdult,
      guestsChildren,
      guestsTeens,
      checkboxChecked,
    });
  };
  const maxSelectableDate = new Date('2024-04-15'); 

  // Function to calculate the max date (14 days from the selected start date)
  // const calculateMaxDate = (startDate) => {
  //   const maxDate = new Date(startDate);
  //   maxDate.setDate(maxDate.getDate() + 14); // Adding 14 days
  //   return maxDate;
  // };

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
<div className="home">
      <div>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          showDoubleView
          selectRange
          maxDate={maxSelectableDate}
          // maxDate={selectedDate ? calculateMaxDate(selectedDate) : undefined} // Set maxDate dynamically based on selectedDate
            />
      </div>
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="property1" className="dropdown-heading">
            <p>Property name*</p>
          </label>
          <select
            id="property1"
            className="dropdown"
            value={property1}
            onChange={(e) => setProperty1(e.target.value)}
          >
            <option value="">Search all properties</option>
            <option value="property1_option1">Property 1 Option 1</option>
            <option value="property1_option2">Property 1 Option 2</option>
            <option value="property1_option3">Property 1 Option 3</option>
          </select>

          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label htmlFor="end-date">End Date</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <div className="guest-rooms">
            <div>
              <p className="dropdown-heading-guest">Guests</p>
              <label
                htmlFor="property2"
                className="dropdown-guest"
                onClick={() => setShowGuests(!showGuests)}
              >
                Guests
              </label>

              {showGuests && (
                <div className="guests-dropdown">
                  <div className="guest-counter">
                    <div>
                      <p className="count-title">Adults</p>
                      <p className="count-desc">Age 18+</p>
                    </div>
                    <div className="counter-section">
                      <button onClick={handleAdultDecrement} className="count-btn"><p className="counter-text">-</p></button>
                      <button className="count-btn"><p className="counter-text">{guestsAdult}</p></button>
                      <button onClick={handleAdultIncrement} className="count-btn"><p className="counter-text">+</p></button>
                    </div>
                  </div>

                  <div className="guest-counter">
                  <div>
                      <p className="count-title">Teens</p>
                      <p className="count-desc">Age 13-17</p>
                    </div>
                    <div className="counter-section">
                      <button onClick={handleTeensDecrement} className="count-btn"><p className="counter-text">-</p></button>
                      <button className="count-btn"><p className="counter-text">{guestsTeens}</p></button>
                      <button onClick={handleTeensIncrement} className="count-btn"><p className="counter-text">+</p></button>
                    </div>
                  </div>

                  <div className="guest-counter">
                  <div>
                      <p className="count-title">Kids</p>
                      <p className="count-desc">Age 0-12</p>
                    </div>
                    <div className="counter-section">
                      <button onClick={handleChildrenDecrement} className="count-btn"><p className="counter-text">-</p></button>
                      <button className="count-btn"><p className="counter-text">{guestsChildren}</p></button>
                      <button onClick={handleChildrenIncrement} className="count-btn"><p className="counter-text">+</p></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="property3" className="dropdown-heading-room">
                Rooms{" "}
              </label>
              <select
                id="property3"
                className="dropdown-room"
                value={property3}
                onChange={(e) => setProperty3(e.target.value)}
              >
                <option value="">
                  <p className="text">1</p>
                </option>
                <option value="property3_option1">2</option>
                <option value="property3_option2">3</option>
                <option value="property3_option3">4</option>
              </select>
            </div>
          </div>

          <label className="accessible">
            <input
              type="checkbox"
              checked={checkboxChecked}
              className="checkbox"
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99998 4.33342C8.26368 4.33342 8.52147 4.25522 8.74074 4.10871C8.96 3.9622 9.1309 3.75396 9.23181 3.51033C9.33273 3.26669 9.35914 2.9986 9.30769 2.73996C9.25624 2.48132 9.12925 2.24374 8.94278 2.05727C8.75631 1.8708 8.51874 1.74382 8.2601 1.69237C8.00145 1.64092 7.73337 1.66733 7.48973 1.76824C7.2461 1.86916 7.03786 2.04006 6.89135 2.25932C6.74484 2.47859 6.66664 2.73637 6.66664 3.00008C6.66664 3.3537 6.80712 3.69284 7.05717 3.94289C7.30721 4.19294 7.64635 4.33342 7.99998 4.33342ZM13 13.6667H12.3333V10.3334C12.3333 10.1566 12.2631 9.98703 12.138 9.86201C12.013 9.73699 11.8435 9.66675 11.6666 9.66675H8.33331V8.33342H11.6666C11.8435 8.33342 12.013 8.26318 12.138 8.13815C12.2631 8.01313 12.3333 7.84356 12.3333 7.66675C12.3333 7.48994 12.2631 7.32037 12.138 7.19534C12.013 7.07032 11.8435 7.00008 11.6666 7.00008H8.33331V5.66675C8.33331 5.48994 8.26307 5.32037 8.13805 5.19534C8.01302 5.07032 7.84345 5.00008 7.66664 5.00008C7.48983 5.00008 7.32026 5.07032 7.19524 5.19534C7.07021 5.32037 6.99998 5.48994 6.99998 5.66675V10.3334C6.99998 10.5102 7.07021 10.6798 7.19524 10.8048C7.32026 10.9298 7.48983 11.0001 7.66664 11.0001H11V14.3334C11 14.5102 11.0702 14.6798 11.1952 14.8048C11.3203 14.9298 11.4898 15.0001 11.6666 15.0001H13C13.1768 15.0001 13.3464 14.9298 13.4714 14.8048C13.5964 14.6798 13.6666 14.5102 13.6666 14.3334C13.6666 14.1566 13.5964 13.987 13.4714 13.862C13.3464 13.737 13.1768 13.6667 13 13.6667ZM8.46664 12.6001C8.13083 13.0478 7.66265 13.3786 7.12842 13.5455C6.59419 13.7123 6.021 13.7069 5.49003 13.5299C4.95907 13.3529 4.49725 13.0133 4.17 12.5593C3.84274 12.1053 3.66664 11.5598 3.66664 11.0001C3.66743 10.4819 3.81917 9.97517 4.10332 9.54184C4.38747 9.10851 4.79172 8.76735 5.26664 8.56008C5.42931 8.48936 5.55722 8.35691 5.62223 8.19188C5.68724 8.02685 5.68403 7.84275 5.61331 7.68008C5.54258 7.51742 5.41014 7.38951 5.24511 7.32449C5.08007 7.25948 4.89597 7.26269 4.73331 7.33342C4.17231 7.57838 3.67501 7.94883 3.27973 8.41625C2.88444 8.88367 2.60171 9.43557 2.45331 10.0295C2.3049 10.6234 2.29479 11.2434 2.42374 11.8418C2.55269 12.4402 2.81727 13.001 3.1971 13.4811C3.57693 13.9612 4.06188 14.3476 4.61459 14.6108C5.1673 14.8739 5.77303 15.0067 6.38513 14.9989C6.99723 14.991 7.59937 14.8428 8.14517 14.5656C8.69098 14.2885 9.16588 13.8897 9.53331 13.4001C9.6394 13.2586 9.68495 13.0808 9.65994 12.9058C9.63494 12.7308 9.54142 12.5728 9.39998 12.4667C9.25853 12.3607 9.08073 12.3151 8.90569 12.3401C8.73066 12.3651 8.57273 12.4586 8.46664 12.6001Z"
                fill="black"
              />
            </svg>
            I need an Accessible Room
          </label>

          <button className="search-btn" type="submit">
            SEARCH
          </button>
        </form>
      </div>
      </div>
        )
}
