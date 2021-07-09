import "./LoginForm.css";
import React, { useState, useReducer, useContext } from "react";
import { ContainerContext } from "components/ContainerContext";
import { url as generateURL, AuthAPIString } from "api";
import Input from "./Input";

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

function createItems(dispatch) {
    const onChange = (event) => {
        dispatch({
            type: actionTypes().formDataUpdate,
            name: event.target.name,
            value: event.target.value,
        });
    };

    const items = [
        {
            name: "username",
            type: "text",
        },
        {
            name: "password",
            type: "password",
        },
        {
            name: "name",
            type: "text",
        },
    ];

    return items.map(({ name, type }) => ({
        name,
        type,
        onChange,
    }));
}

function LoginForm(...props) {
    const [formState, dispatch] = useReducer(submitReducer, {});
    // golbal states in container
    const store = useContext(ContainerContext);

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch({ type: actionTypes().loading, isLoading: true });
        store
            .api({
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
            .then((data) => store.updateTokenCallback(data))
            .catch((e) => {
                console.error("error occurred during fetching form data: " + e);
            });
        dispatch({ type: actionTypes().loading, isLoading: false });
    };

    return (
        <div className="login_form">
            <form onSubmit={onSubmit}>
                <Input items={createItems(dispatch)} />
                <button>Login</button>
            </form>
        </div>
    );
}
export default LoginForm;
