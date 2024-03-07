import "../../styling/Main.scss";

export function Main() {
  const env = import.meta.env.VITE_REACT_APP_ENV;

  // Define a method that intentionally throws an error
  const methodThatThrowsError = () => {
    throw new Error('This is an intentional error!');
  };

  return (
    <div className="main">
      <p>Welcome, {env}</p>
      {/* Call the methodThatThrowsError function */}
      <button onClick={methodThatThrowsError} className="btn">
        Break the world
      </button>
    </div>
  );
}
