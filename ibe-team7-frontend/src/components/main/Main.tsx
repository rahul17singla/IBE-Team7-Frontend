import "../../styling/Main.scss";

export function Main() {
  return <div className="main">
    <button onClick={() => methodDoesNotExist()} className="btn">Break the world</button>;
  </div>;
}
