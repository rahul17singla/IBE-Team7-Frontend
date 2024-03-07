import IBE from "./components/IBE/IBE";
import "./App.css";
function App() {
  console.log(import.meta.env.VITE_REACT_APP_ENV);
  return (
    <div className="app">
      <IBE />
    </div>
  );
}

export default App;
