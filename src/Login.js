import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";

const Login = () => {
    const history = useHistory();
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        //  FIrebase Sign-in
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(err => alert(err.message))
    }

    const register = (e) => {
        e.preventDefault();
        // Firebase Register
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it's successfully created new user
                if(auth) {
                    history.push('/')               
                }
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                className="login_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                alt=""
                />
            </Link>

            <div className="login_container">
                <h1>Sign In</h1>
                <form>
                    <div className="login_inputgroup">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => updateEmail(e.target.value)} />
                    </div>
                    <div className="login_inputgroup">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => updatePassword(e.target.value)} />
                    </div>
                    <button className="login_signinbutton" type="submit" onClick={signIn}>Sign In</button>
                </form>
                <p>
                    By Signing-in you agree to Amazon's CLone Conditions of Use & Sale.
                    Please see our Policy Notice, Our Cookies-Notice and Interest-Based
                    Ads Notice.
                </p>
                <button className="login_registerbutton" onClick={register}>
                    Create your Amazon Account
                </button>
            </div>
        </div>
    );
};

export default Login;
