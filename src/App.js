import "./App.css";
import React, { useReducer, useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import LoginPage from "LoginPage";

function actionTypes() {
    return {
        credentialCheck: "credentialCheck",
        updateToken: "updateToken",
    };
}

function AppLoadReducer(state, action) {
    console.log(localStorage.getItem("token"));

    switch (action.type) {
        case actionTypes().credentialCheck: {
            return {
                ...state,
                startPage: localStorage.getItem("token") ? (
                    "Quiz page place holder"
                ) : (
                    <LoginPage onTokenChange={action.onTokenChange} />
                ),
            };
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
    // TODO: 상태를 어떤 값으로든 초기화하지 않으면 무한재귀현상 발생
    const [state, dispatch] = useReducer(AppLoadReducer, {
        token: "",
    });

    // Run dispatch once whatsoever
    useEffect(() => {
        dispatch({
            type: actionTypes().credentialCheck,
            onTokenChange: (newToken) => {
                localStorage.setItem("token", JSON.stringify(newToken));
                dispatch({
                    type: actionTypes().updateToken,
                    token: newToken,
                });
            },
        });
    }, [state.token]);
    return state.startPage || "Loading App...";
}

function App() {
    return (
        <div className="App">
            <AppLoader />
        </div>
    );
}

export default App;
