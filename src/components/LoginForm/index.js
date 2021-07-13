import React, { useReducer, useState } from "react";
import { InputField, PhoneInputField } from "components";
import { FieldSet } from "./lib";
// form 컴포넌트의 액션. 실재 상태를 조작하는 로직의 이름 인덱스 정도로 보면됨.
import {
    useLoginForm,
    loginFormReducer,
    combineReducers,
} from "./use-LoginForm";

const items = [
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

function LoginForm({ reducer = () => {}, ...props }) {
    const { state, changeInputValues, submitForm } = useLoginForm({
        reducer: combineReducers(reducer, loginFormReducer),
    });

    const inputReducer = ({ state }) => {
        changeInputValues(state);
        return state;
    };
    return (
        <FieldSet>
            {items.map((item, index) => {
                return item.name === "phone" ? (
                    <PhoneInputField item={item} reducer={inputReducer} />
                ) : (
                    <InputField item={item} reducer={inputReducer} />
                );
            })}
        </FieldSet>
    );
}

export { LoginForm };
