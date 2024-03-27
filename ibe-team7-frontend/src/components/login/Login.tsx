import { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../../aws/UserPool";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Login Clicked");
        console.log("Email: " + email);

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess:", data);
                alert("Login Success");
                // window.location.href = "/";
            },
            onFailure: (err) => {
                console.error("onFailure:", err);
                alert(err.message);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired:", data);
                alert("New Password Required");
            },
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
