import React, { useEffect } from "react";
import { Label, Input, PhoneInput } from "./lib";
import { SelectorInput } from "components/SelectorInput";
import { countryCode } from "./countryCdoe";
import {
    actionTypes,
    inputFieldReducer,
    useInputField,
    composeReducers,
} from "./use-InputField";

function phoneValidateReducer({ state, action }) {
    const value = action.changeEvent.target.value;
    const name = action.changeEvent.target.name;
    if (action.type == actionTypes.changeValue) {
        if (value.length > 10 && name === "phone") {
            return {
                state: {
                    ...state,
                    isValid: false,
                    message: "Phone number can not be longer then 10 digits",
                },
                action,
            };
        }
        return {
            state: {
                ...state,
                isValid: true,
                message: "Phone number is valid",
            },
            action,
        };
    }
}

function InputField({ item = {}, reducer = ({ state }) => state, ...props }) {
    const { state, changeValue } = useInputField({
        reducer: composeReducers(inputFieldReducer, reducer),
    });

    return (
        <div>
            <Label>
                {item.label || item.labelTag}
                <Input
                    type={item.type}
                    name={item.name}
                    onChange={(event) => {
                        changeValue(event);
                    }}
                />
            </Label>
            {/* TODO: validator component */}
        </div>
    );
}

function PhoneInputField({
    item = [],
    reducer = ({ state }) => state,
    ...props
}) {
    const { state, changeValue } = useInputField({
        reducer: composeReducers(
            inputFieldReducer,
            phoneValidateReducer,
            reducer
        ),
    });

    return (
        <div>
            <Label>
                {item.label || item.labelTag}
                <SelectorInput items={countryCode} />
                <PhoneInput
                    type={item.type}
                    name={item.name}
                    onChange={(event) => {
                        changeValue(event);
                    }}
                />
            </Label>
            {/* TODO: validator component */}
        </div>
    );
}

export { InputField, PhoneInputField };
