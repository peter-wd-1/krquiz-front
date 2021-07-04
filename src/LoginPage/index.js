import React, { createContext } from "react";
import LoginForm from "LoginPage/component/LoginForm";
import { LoginContext } from "LoginPage/LoginContext";
function LoginPage(props) {
    return (
        <LoginContext.Provider value={props.onTokenChange}>
            <LoginForm />
        </LoginContext.Provider>
    );
}

export default LoginPage;
