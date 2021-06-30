import React, { useReducer, useState } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import LoginPage from "LoginPage";
import RegisterPage from "RegisterPage";

function actionTypes() {
    return {
        credentialCheck: "credentialCheck",
        updateToken: "updateToken",
    };
}

function AppLoadReducer(state, action) {
    switch (action.type) {
        case actionTypes().credentialCheck: {
            // return {
            //     ...state,
            //     token: localStorage.getItem("token"),
            //     startPage: localStorage.getItem("token") ? (
            //         "Quiz page place holder"
            //     ) : (
            //         <LoginPage onTokenChange={action.onTokenChange} />
            //     ),
            // };
            return <LoginPage />;
        }
        case actionTypes().updateToken: {
            return {
                ...state,
                token: action.token,
            };
        }

        default: {
            throw new Error("Unhandled type in submitReducer: " + action.type);
        }
    }
}

function AppLoader() {
    const [state, dispatch] = useReducer(AppLoadReducer, {});
    // dispatch({
    //     type: actionTypes().credentialCheck,
    //     onTokenChange: (newToken) =>
    //         dispatch({
    //             type: actionTypes().tokenUpdate,
    //             token: newToken,
    //         }),
    // });
    // return state.startPage;
    //dispatch({ type: actionTypes().credentialCheck });
    return <LoginPage />;
}

function App() {
    return (
        <div className="App">
            <AppLoader />
        </div>
    );
}

export default App;
