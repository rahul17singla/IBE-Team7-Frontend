import { Provider } from "react-redux";
import { Router } from "./components/router/Router";
import { store } from "./redux/store";

import { Account } from "./components/account/Account";

function App() {
    return (
        <Provider store={store}>
            <Account>
                <Router />
            </Account>
        </Provider>
    );
}

export default App;
