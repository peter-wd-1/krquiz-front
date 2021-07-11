import React, { useEffect } from "react";
import { Label, Input } from "lib";
import {
    actionTypes,
    inputFeildReducer,
    useInputFeild,
    composeReducers,
} from "./use-InputFeild";
// parent state

function phoneValidateReducer({ state, action }) {
    const value = action.changeEvent.target.value;
    const name = action.changeEvent.target.name;
    if (action.type == actionTypes.changeValue) {
        if (value.length > 10 && name === "phone") {
            return {
                state: {
                    ...state,
                    phoneIsValidated: false,
                    phoneInvalidMessage:
                        "number can not be longer then 10 digits",
                },
                action,
            };
        }
        return {
            state,
            action,
        };
    }
}

function InputFeild({ items = [], reducer = ({ state }) => state, ...props }) {
    const { state, changeValue } = useInputFeild({
        reducer: composeReducers(
            inputFeildReducer,
            phoneValidateReducer,
            reducer
        ),
    });

    return (
        <div>
            {items.map((item, index) => {
                return (
                    <Label key={index}>
                        {item.label || item.labelTag}
                        <Input
                            type={item.type}
                            name={item.name}
                            onChange={(event) => {
                                changeValue(event);
                            }}
                        />
                    </Label>
                );
            })}
            {/* TODO: validator component */}
        </div>
    );
}

export { InputFeild };
