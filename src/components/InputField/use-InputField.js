import React, { useReducer } from "react";
const actionTypes = {
    changeValue: "changeValue",
    checkPhoneExist: "checkPhoneExist",
    sendVerificationCode: "sendVerificationCode",
    phoneVerified: "phoneVerified",
};

function inputFieldReducer(state, action) {
    switch (action.type) {
        case actionTypes.changeValue: {
            if (action.changeEvent.target.name === "phone") {
                return {
                    state: {
                        [action.changeEvent.target.name]: {
                            ...state[action.changeEvent.target.name],
                            value: `1${action.changeEvent.target.value}`,
                        },
                    },
                    action,
                };
            }
            return {
                state: {
                    [action.changeEvent.target.name]: {
                        ...state[action.changeEvent.target.name],
                        value: action.changeEvent.target.value,
                    },
                },
                action,
            };
        }
        case actionTypes.checkPhoneExist: {
            return {
                state: {
                    ...state,
                    isPhoneExist: action.value,
                },
                action,
            };
        }
        case actionTypes.sendVerificationCode: {
            return {
                state: {
                    ...state,
                },
                action,
            };
        }
        case actionTypes.phoneVerified: {
            return {
                state: {
                    ...state,
                },
                action,
            };
        }
        default: {
            return {
                state,
                action,
            };
        }
    }
}

function useInputField({ reducer = inputFieldReducer } = {}) {
    const [state, dispatch] = useReducer(reducer, {
        isSmsSent: false,
        phoneVerified: false,
        sendVerification: false,
        phone: {
            isValid: false,
        },
    });
    const changeValue = (changeEvent, api) => {
        dispatch({ type: actionTypes.changeValue, changeEvent, dispatch, api });
    };

    const verifyPhone = (changeEvent, api) => {
        dispatch({ type: actionTypes.verifyPhone, changeEvent, dispatch, api });
    };

    const sendVerificationCode = (api) => {
        dispatch({ type: actionTypes.sendVerificationCode, dispatch, api });
    };

    const phoneVerified = () => {
        dispatch({ type: actionTypes.phoneVerified });
    };

    return { state, changeValue, verifyPhone, sendVerificationCode };
}

function composeReducers(...reducers) {
    return reducers.reduce((prereducer, nextreducer) => (state, action) =>
        nextreducer(prereducer(state, action))
    );
}

export { actionTypes, inputFieldReducer, useInputField, composeReducers };
