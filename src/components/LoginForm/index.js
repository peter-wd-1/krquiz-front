import React, { useReducer, useState } from "react";
import { InputField, PhoneInputField } from "components";
import { FieldSet } from "./lib";
// form 컴포넌트의 액션. 실재 상태를 조작하는 로직의 이름 인덱스 정도로 보면됨.
import {
    useLoginForm,
    loginFormReducer,
    combineReducers,
    actionTypes,
} from "./use-LoginForm";

function allowloginReducer(state, action) {
    if (action.type == actionTypes.changeInputValues) {
        return {
            ...state,
            ...action.values,
        };
    }
}

function allowRegisterReducer(state, action) {}

const items = (option) => {
    switch (option) {
        case "login": {
            return [
                {
                    type: "tel",
                    name: "phone",
                    label: "Phone Number",
                },
                {
                    type: "password",
                    name: "password",
                    label: "Password",
                },
            ];
        }
        case "register":
            return [
                {
                    type: "tel",
                    name: "phone",
                    label: "Phone Number",
                },
                {
                    type: "password",
                    name: "password",
                    label: "Password",
                },
                {
                    type: "password",
                    name: "password_comfirm",
                    label: "Confirm Password",
                },
                {
                    type: "text",
                    name: "name",
                    label: "Your Name",
                },
                {
                    type: "email",
                    name: "email",
                    label: "Email",
                },
            ];
        default: {
            throw new Error("Listing login form failed with option: " + option);
        }
    }
};

function LoginForm({ reducer = () => {}, ...props }) {
    const { state, changeInputValues, submitForm } = useLoginForm({
        reducer: combineReducers(reducer, loginFormReducer),
    });

    const inputReducer = ({ state }) => {
        changeInputValues(state);
        return state;
    };

    return (
        // state : 로그인 상태, 로그인 정보 부족 상태, 가입필요 상태
        <form>
            <FieldSet>
                {items("register").map((item, index) => {
                    return item.name === "phone" ? (
                        <PhoneInputField item={item} reducer={inputReducer} />
                    ) : (
                        <InputField item={item} reducer={inputReducer} />
                    );
                })}
            </FieldSet>
            <div onClick={() => submitForm({ type: actionTypes.submitForm })}>
                Let's Go
            </div>
        </form>
    );
}

export { LoginForm };
