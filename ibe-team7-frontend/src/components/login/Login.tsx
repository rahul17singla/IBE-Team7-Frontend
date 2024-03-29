import { useState, useContext } from "react";
import { AccountContext } from "../account/Account";
import "./Login.scss";
import { Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext);

    const handleLogin = () => {
        console.log("Login Clicked");
        console.log("Email: " + email);

        authenticate(email, password)
            .then((data: any) => {
                console.log("Logged In: ", data);
                window.location.href = "/";
            })
            .catch((err: Error) => {
                console.error("Login Error: ", err);
            });
    };

    return (
        <div className="login-div">
            <h1>Login</h1>

            <div className="login-inputs">
                <input
                    className="login-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>

            <div>
                <button onClick={handleLogin} className="loginpage-btn">
                    Login
                </button>
                <p>
                    New User? <Link to="/signup">SignUp Here</Link>
                </p>
            </div>
        </div>
    );
};
