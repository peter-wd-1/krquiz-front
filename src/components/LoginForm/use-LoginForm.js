import React, { useReducer, useEffect } from "react";
import { ApiContext } from "components/PageContainer/Context";
import { PageContext } from "components/PageContainer/Context";
// form 컴포넌트의 액션. 실재 상태를 조작하는 로직의 이름 인덱스 정도로 보면됨.
const actionTypes = {
    submitForm: "submitForm",
    changeInputValues: "changeInputValues",
    phoneExist: "phoneExist",
    checkPhoneNumberExist: "checkPhoneNumberExist",
    finishedAction: "finishedAction",
};

/**
 * 액션 로직을 실행서 상태를 조작하는 reducer들을 정의한다.
 * TODO: 리듀서를 합치는 방식의 정의 두가지가 있어 보임
 * @function combineReducer 하나는 원하는 로직의경우 반환하는 방식
 * @function composeReducer 하나는 배열의 reducer를 이용한 함수를 합치는 방법.
 */
function loginFormReducer(state, action) {
    const api = action.apiContext;
    const pageReload = action.pageContext;
    switch (action.type) {
        case actionTypes.changeInputValues: {
            return {
                ...state,
                password: {
                    value: "qwe123",
                },
                ...action.values,
                api,
            };
        }
        case actionTypes.submitForm: {
            if (
                state.phone.value &&
                state.password.value &&
                !state.name.value
            ) {
                return {
                    ...state,
                    action,
                    loginPending: true,
                    api,
                    pageReload,
                };
            }

            if (
                state.phone.value &&
                state.password.value &&
                state.name.value &&
                state.phoneVerified
            ) {
                return {
                    ...state,
                    action,
                    registerPending: true,
                    api,
                    pageReload,
                };
            } else {
                alert("phone number shold be verified");
            }

            return {
                ...state,
                action,
            };
        }
        case actionTypes.finishedAction: {
            return {
                ...state,
                [action.currentAction]: false,
                action,
            };
        }
        case actionTypes.renderPopup: {
            switch (action.popup) {
                case "loginFail": {
                    return {
                        ...state,
                        popup: {
                            message: `Sorry, 😢 Login faild. Check your form again`,
                        },
                        action,
                    };
                }
                default: {
                    throw new Error(`Unhandled popup type: ${action.popup}`);
                }
            }
        }
        default: {
            throw new Error(`Unhandled type in formReducer: ${action.type}`);
        }
    }
}

/** 각 액션에 해당하는 로직을 실행하는 훅을 반환.
 */
function useLoginForm({ reducer = loginFormReducer } = {}) {
    const [state, dispatch] = useReducer(reducer, {
        loginFormat: "",
        phone: {
            value: "",
        },
        password: {
            value: "",
        },
        name: {
            value: "",
        },
        phoneVerified: false,
        loginPending: false,
        registerPending: false,
        popup: {
            message: "",
        },
    });
    const changeInputValues = (values, api) => {
        dispatch({
            type: actionTypes.changeInputValues,
            values,
            api,
            dispatch,
        });
    };

    useEffect(() => {
        if (state.registerPending) {
            state
                .api({
                    path: "/users/register/",
                    parms: {
                        method: "POST",
                        body: JSON.stringify({
                            username: state.phone.value,
                            password1: state.password.value,
                            password2: state.password.value,
                            name: state.name.value,
                        }),
                    },
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Registering account has gone wrong!");
                })
                .then((data) => {
                    localStorage.setItem("token", data.key);
                    state.pageReload();
                })
                .catch((e) => {
                    console.error(
                        "error occurred during fetching from server: " + e
                    );
                    alert(e);
                });
        }
    }, [state.registerPending]);

    useEffect(() => {
        if (state.loginPending) {
            state
                .api({
                    path: "/users/login/",
                    parms: {
                        method: "POST",
                        body: JSON.stringify({
                            username: state.phone.value,
                            password: state.password.value,
                        }),
                    },
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error(
                        "login request inccorect: Check password or phone number"
                    );
                })
                .then((data) => {
                    localStorage.setItem("token", data.key);
                    state.pageReload();
                })
                .catch((e) => {
                    console.error(
                        "error occurred during fetching from server: " + e
                    );
                    dispatch({
                        type: actionTypes.renderPopup,
                        popup: "loginFail",
                    });
                    dispatch({
                        type: actionTypes.finishedAction,
                        currentAction: "loginPending",
                    });
                });
        }
    }, [state.loginPending]);

    const submitForm = ({ apiContext, pageContext }) => {
        dispatch({ type: actionTypes.submitForm, apiContext, pageContext });
    };

    return { state, changeInputValues, submitForm };
}

function combineReducers(...reducers) {
    return (state, action) => {
        for (const reducer of reducers) {
            const result = reducer(state, action);
            if (result) return result;
        }
        // TODO: null 값바꾸기
        throw new Error("None of reducers handled state in combineReducers");
    };
}

function composereducers(...reducers) {
    return reducers.reduce((prereducer, nextreducer) => (state, action) =>
        nextreducer(prereducer(state, action))
    );
}

export { loginFormReducer, useLoginForm, combineReducers, actionTypes };
