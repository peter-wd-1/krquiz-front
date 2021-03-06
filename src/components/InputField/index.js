import React, { useEffect, useContext, useRef, useState } from "react";
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
    VerifyPhoneButton,
} from "./lib";
import { ShareButton } from 'pages/ProfilePage/lib';


function phoneValidateReducer({ state, action }) {
    if (action.type === actionTypes.phoneVerified) {
        return {
            state: {
                ...state,
                phoneVerified: true,
                message: "Phone number Verified",
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
                    } else {
                        console.error("phone number verification code error");
                        return {
                            state: {
                                ...state,
                                phone: {
                                    ...state.phone,
                                    otherMessage: true,
                                    isValid: false,
                                    phoneVerified: false,
                                    message: "Check your code again",
                                },
                            },
                            action,
                        };
                    }
                });
            } catch (e) {
                return {
                    state: {
                        ...state,
                        phone: {
                            ...state.phone,
                            otherMessage: true,
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
                        otherMessage: true,
                        message: "Somthing is wrong :( Try again",
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
                    message: "Looks Great!",
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
 * ???????????? ??? ??????????????? ???????????? ?????? ????????? ?????? ???????????? ???????????? ????????? ??????.
 * ????????? ???????????? ??????????????? ?????? ?????????. ????????? ????????? ????????? ??????????????? ??????????????? ?????????.
 * ????????? ?????????????????? ??????????????? ?????????????????? ?????????.
 * ????????? ???????????? ????????? state ??????????????? ????????????.
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
                        phone: `${state.phone.value}`,
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
                    phoneLable
                    style={{marginBottom:"10px"}}
                />
            </Label>
            {state.phone.value && state.phone.value !== "1" ? (
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
                        <VerifyPhoneButton
                            onClick={(e) => {
                                e.preventDefault();
                                if (state.phone.isValid) {
                                    sendVerificationCode(api);
                                }
                            }}
                        />
                        /* <div */
                        /*     onClick={() => { */
                        /*         if (state.phone.isValid) { */
                        /*             sendVerificationCode(api); */
                        /*         } */
                        /*     }} */
                        /*     style={{ */
                        /*         backgroundColor: "#414CA6", */
                        /*         borderRadius: "5px", */
                        /*         color: "white", */
                        /*         padding: "10px", */
                        /*     }} */
                        /* > */
                        /*     Verify Phone number */
                        /* </div> */
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


// function useInterVal(callback, delay) {
//     const savedCallback = useRef();
//     useEffect(()={
//         savedCallback.current = callback
//     },[callback])

//     useEffect(()=>{

//         function tick() {
//             savedCallback.current()
//         }

//         if(delay != null){
//             const id = setInterval(tick, delay);
//             return() => {
//                 clearInterval(id);
//             }
//         }
//     })
// }

function SharePhoneInputField({
    item = {},
    reducer = ({ state }) => state,
    ...props
}) {
    const {
        state,
        changeValue,
    } = useInputField({
        reducer: composeReducers(
            inputFieldReducer,
            reducer
        ),
    });

    const [loading, setLoading] = useState(false);
    const [intervalId, setIntervalId] = useState(false);
    const [shareVarified, setShareVarified] = useState(false);
    useEffect(()=>{
        if(loading) {
            //TODO: lambda?????? ?????? rest api?????? ????????? ???.
            // fetch("https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/textmessage", {
            //     method: "POST",
            //     headers: {
            //         "Content-type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         isFromQuiz: true,
            //         phone:"15519995884"
            //     }),
            // }).then((res) => {
            //     res.json()
            // }).then((data) => {
            //     console.log("SMS res data", {data})
            // })async()=>{
            async function apiCall()
            {
                const res = await fetch("https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/textmessage", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        isFromQuiz: true,
                        phone: state.phone.value,
                        from: props.from,
                        name: props.name
                    }),
                })
                if(!res.ok){
                    setLoading(false)
                    props.setPopup("ShareFail")
                    return false
                }else{
                    const data = await res.json()
                    console.log({data})
                    return true
                }
            }

            apiCall().then((ok) => {
                if(ok){
                    const id = setInterval(() => {
                        console.log("...testing")
                        setShareVarified(true)
                        setLoading(false)
                        props.onShare()
                        props.setPopup("ShareDone")
                    },1500)

                    setIntervalId(id)
                }
            })



            return () => {
                clearInterval(intervalId)
            }
        }
    },[loading])

    useEffect(()=>{
        if(shareVarified){
            if(intervalId){
                clearInterval(intervalId)
                setShareVarified(false)
            }
        }
    },[shareVarified, intervalId])


    return loading ? "...verifying number" : (
        <InputContainer>
            <div style={{
                     display:"flex",
                     flexDirection:"row",
                     alignItems:"center",
                     justifyContent:"center",
                     height:"80%"
                 }}>
                <Label style={{margin:"10px", marginTop:"0px", marginBottom:"0px", }}>
                    {item.label || item.labelTag}
                    <Input
                        type={item.type}
                        name={item.name}
                        onChange={(event) => {
                            changeValue(event);
                        }}
                        placeholder="2011231231"
                        phoneLable
                        style={{fontSize:"1.2em",height:"2em", width:"110px", margin:"0px",marginLeft:"7px"}}
                    />
                </Label>
                {state.phone.value && state.phone.value !== "1" ?  (
                    <ShareButton onClick={()=>{
                                     setLoading(true)
                                 }}>
                        Share
                    </ShareButton>
                ) : (
                    ""
                )}
            </div>
        </InputContainer>

    )
}
export { InputField, PhoneInputField, SharePhoneInputField };
