import "./LoginForm.css";
import React, { useState, useReducer, useContext } from "react";
import { api, url as generateURL, AuthAPIString } from "api";
import { LoginContext } from "LoginPage/LoginContext";

function apiURL() {
    return generateURL({
        path: AuthAPIString.requestToken,
    });
}

function actionTypes() {
    return {
        loading: "loading",
        formDataUpdate: "formDataUpdate",
    };
}

function submitReducer(state, action) {
    switch (action.type) {
        case actionTypes().loading: {
            return {
                ...state,
                isLoading: action.isLoading,
            };
        }
        case actionTypes().formDataUpdate: {
            return {
                ...state,
                [action.name]: action.value,
            };
        }
        default: {
            throw new Error("Unhandled type in submitReducer: " + action.type);
        }
    }
}

function LoginForm() {
    const [formState, dispatch] = useReducer(submitReducer, {});
    const setToken = useContext(LoginContext);
    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch({ type: actionTypes().loading, isLoading: true });
        api({
            url: apiURL(),
            parms: {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: {
                        username: formState.username,
                        password: formState.password,
                    },
                }),
            },
        })
            .then((res) => res.json())
            .then((data) => setToken(data))
            .catch((e) => {
                console.error("error occurred during fetching form data: " + e);
            });
        dispatch({ type: actionTypes().loading, isLoading: false });
    };

    return (
        <div className="login_form">
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label>
                        <p>username</p>
                        <input
                            type="text"
                            name="username"
                            onChange={(event) => {
                                dispatch({
                                    type: actionTypes().formDataUpdate,
                                    name: event.target.name,
                                    value: event.target.value,
                                });
                            }}
                        />
                    </label>
                </fieldset>
                <button>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
