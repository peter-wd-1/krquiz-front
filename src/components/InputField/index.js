import React, { useEffect, useContext } from "react";
import { SelectorInput } from "components/SelectorInput";
import { countryCode } from "./countryCdoe";
import { ApiContext } from "components/PageContainer/Context";
import {
    actionTypes,
    inputFieldReducer,
    useInputField,
    composeReducers,
} from "./use-InputField";
import {
    Label,
    Input,
    InputContainer,
    PhoneInput,
    InvalidMessage,
} from "./lib";

function phoneValidateReducer({ state, action }) {
    if (action.type === actionTypes.phoneVerified) {
        return {
            state: {
                ...state,
                phoneVerified: true,
            },
            action,
        };
    }

    if (action.type === actionTypes.verifyPhone) {
        const value = action.changeEvent.target.value;
        const api = action.api;
        if (value.length === 6) {
            try {
                api({
                    path: `/users/verification_codes/${value}/?phone=${state.phone.value}`,
                    parms: {
                        method: "GET",
                    },
                }).then((res) => {
                    console.log(res);
                    if (res.ok) {
                        action.dispatch({ type: actionTypes.phoneVerified });
                    }
                });
            } catch (e) {
                return {
                    state: {
                        ...state,
                        phone: {
                            ...state.phone,
                            isValid: false,
                            phoneVerified: false,
                            message: "Check your code again",
                        },
                    },
                    action,
                };
            }
        }
    }

    if (action.type === actionTypes.sendVerificationCode) {
        const api = action.api;
        try {
            console.log(state.phone.value);
            return {
                state: {
                    ...state,
                    sendVerification: true,
                    isSmsSent: true,
                },
            };
        } catch (e) {
            return {
                state: {
                    ...state,
                    phone: {
                        ...state.phone,
                        isValid: false,
                        message: "Somthing is wrong :(",
                    },
                },
                action,
            };
        }
    }

    if (action.type === actionTypes.changeValue) {
        const value = action.changeEvent.target.value;
        const name = action.changeEvent.target.name;
        const api = action.api;
        api({
            path: `/users/phone/${state.phone.value}`,
            parms: {
                method: "GET",
            },
        }).then((res) => {
            if (res.ok) {
                action.dispatch({
                    type: actionTypes.checkPhoneExist,
                    value: true,
                });
            } else {
                action.dispatch({
                    type: actionTypes.checkPhoneExist,
                    value: false,
                });
            }
        });

        if (value.length > 13 && name === "phone") {
            return {
                state: {
                    [action.changeEvent.target.name]: {
                        ...state[action.changeEvent.target.name],
                        isValid: false,
                        message: "Phone number can not be less then 13 digits",
                    },
                },
                action,
            };
        }

        if (value.length < 10 && name == "phone") {
            return {
                state: {
                    [action.changeEvent.target.name]: {
                        ...state[action.changeEvent.target.name],
                        isValid: false,
                        message: "Phone number must be longer then 9 digits",
                    },
                },
                action,
            };
        }

        return {
            state: {
                [action.changeEvent.target.name]: {
                    ...state[action.changeEvent.target.name],
                    isValid: true,
                    message: "Phone number is valid",
                },
            },
            action,
        };
    }

    return {
        state,
        action,
    };
}

function InputField({ item = {}, reducer = ({ state }) => state, ...props }) {
    const { state, changeValue } = useInputField({
        reducer: composeReducers(inputFieldReducer, reducer),
    });

    useEffect(() => {
        if (state.parentChangeInputValues) state.parentChangeInputValues(state);
    }, [state]);

    return (
        <InputContainer>
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
        </InputContainer>
    );
}

/**
 * 어레이로 된 리듀서들을 받을때는 처음 시작과 끝의 리듀서가 해야하는 역할이 있다.
 * 첫번재 리듀서는 파라미터를 바로 받는다. 첫번째 리듀서 부터는 파라미터를 오브잭트로 보낸다.
 * 두번째 리듀서부터는 파라미터를 구조분해하여 받는다.
 * 마지막 리듀서는 하나의 state 오브젝트만 반환한다.
 */
function PhoneInputField({
    item = {},
    reducer = ({ state }) => state,
    ...props
}) {
    const {
        state,
        changeValue,
        verifyPhone,
        sendVerificationCode,
    } = useInputField({
        reducer: composeReducers(
            inputFieldReducer,
            phoneValidateReducer,
            reducer
        ),
    });

    const api = useContext(ApiContext);
    useEffect(() => {
        if (state.parentChangeInputValues) state.parentChangeInputValues(state);
        console.log(state);
    }, [state]);

    useEffect(() => {
        if (state.sendVerification)
            api({
                path: "/users/verification_codes/",
                parms: {
                    method: "POST",
                    body: JSON.stringify({
                        phone: `1${state.phone.value}`,
                    }),
                },
            });
    }, [state.sendVerification]);
    return (
        <InputContainer>
            <Label>
                {item.label || item.labelTag}
                <Input
                    type={item.type}
                    name={item.name}
                    onChange={(event) => {
                        changeValue(event, api);
                    }}
                    placeholder="2011231231"
                />
            </Label>
            {state.phone ? (
                <InvalidMessage isValid={state.phone.isValid}>
                    {state.phone.message}
                </InvalidMessage>
            ) : (
                ""
            )}
            {state.phone.isValid ? (
                !state.phoneVerified ? (
                    state.isSmsSent ? (
                        state.isPhoneExist ? (
                            ""
                        ) : (
                            <Label>
                                verification code
                                <Input
                                    type="text"
                                    onChange={(event) => {
                                        verifyPhone(event, api);
                                    }}
                                    pattern="[0-9]*"
                                    placeholder="6 digits code has been sent"
                                />
                            </Label>
                        )
                    ) : state.isPhoneExist ? (
                        ""
                    ) : (
                        <div
                            onClick={() => {
                                if (state.phone.isValid) {
                                    sendVerificationCode(api);
                                }
                            }}
                            style={{
                                backgroundColor: "#414CA6",
                                borderRadius: "5px",
                                color: "white",
                                padding: "10px",
                            }}
                        >
                            Verify Phone number
                        </div>
                    )
                ) : (
                    ""
                )
            ) : (
                ""
            )}
        </InputContainer>
    );
}

export { InputField, PhoneInputField };
