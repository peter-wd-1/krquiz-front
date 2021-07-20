import React, { useContext } from "react";
import { InputField, PhoneInputField } from "components";
import { FieldSet, Form, SubmitButton } from "./lib";
import { ApiContext, PageContext } from "components/PageContainer/Context";
import { H1 } from "pages/LoginPage/lib";
// form 컴포넌트의 액션. 실재 상태를 조작하는 로직의 이름 인덱스 정도로 보면됨.
import {
    useLoginForm,
    loginFormReducer,
    combineReducers,
    actionTypes,
} from "./use-LoginForm";

const items = (option) => {
    switch (option) {
        case "login": {
            return [
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
                    type: "password",
                    name: "password",
                    label: "Password",
                },
                // {
                //     type: "password",
                //     name: "password_comfirm",
                //     label: "Confirm Password",
                // },
                {
                    type: "text",
                    name: "name",
                    label: "Your Name",
                },
                {
                    type: "email",
                    name: "email",
                    label: "Email(*optional)",
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

    const apiContext = useContext(ApiContext);
    const pageContext = useContext(PageContext);
    const inputReducer = ({ state }) => {
        return {
            ...state,
            parentChangeInputValues: changeInputValues,
        };
    };

    return (
        // state : 로그인 상태, 로그인 정보 부족 상태, 가입필요 상태
        <Form>
            <FieldSet>
                <header
                    style={{
                        backgroundColor: "#68FFBB",
                    }}
                >
                    <H1>Let Us Let You In!</H1>
                </header>
                <PhoneInputField
                    item={{
                        type: "tel",
                        name: "phone",
                        label: "Phone Number",
                    }}
                    reducer={inputReducer}
                />
                {state.phone.value.length > 10
                    ? items(state.isPhoneExist ? "login" : "register").map(
                          (item, index) => {
                              return (
                                  <InputField
                                      key={index}
                                      item={item}
                                      reducer={inputReducer}
                                  />
                              );
                          }
                      )
                    : ""}
                <SubmitButton
                    onClick={(e) => {
                        e.preventDefault();
                        submitForm({
                            type: actionTypes.submitForm,
                            apiContext,
                            pageContext,
                        });
                    }}
                >
                    Start Quiz
                </SubmitButton>
            </FieldSet>
        </Form>
    );
}

export { LoginForm };
