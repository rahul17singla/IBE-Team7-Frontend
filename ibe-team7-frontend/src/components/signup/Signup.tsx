import { useState } from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";
import UserPool from "../../aws/UserPool";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        console.log("Signup Clicked");
        console.log("Email: " + email);
        UserPool.signUp(email, password, [], [], (err, data) => {
            if (err) {
                console.error(err);
                alert(err.message);
            } else {
                console.log(data);
                alert("Confirmation Email sent Successfully");
                window.location.href = "/login";
            }
        });
    };

    return (
        <div className="signup-div">
            <h1>Signup</h1>

            <div className="signup-inputs">
                <input
                    className="signup-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    className="signup-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>

            <div>
                <button onClick={handleSignup} className="signuppage-btn">
                    Signup
                </button>
                <p>
                    Existing User? <Link to="/login">Login Here</Link>
                </p>
            </div>
        </div>
    );
};
