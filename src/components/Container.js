import React, { useReducer, useContext, useEffect } from "react";
import { LoginPage } from "pages";
import { api, url, AuthAPIString } from "api";
import { ContainerContext } from "./ContainerContext";

function actionTypes() {
    return {
        goToQuizPage: "goToQuizPage",
        startPage: "startPage",
    };
}

function pageLoadReducer(state, action) {
    switch (action.type) {
        case actionTypes().startPage: {
            return startPage(action.token, state);
        }
        case actionTypes().goToQuizPage: {
            return {
                ...state,
                page: "quiz page placeholder",
            };
        }
        default: {
            throw new Error(
                "Unhandled type in pageLoadReducer: " + action.type
            );
        }
    }
}

function startPage(token, state) {
    if (token) {
        localStorage.setItem("token", token);
        return {
            ...state,
            token,
            api: api(token),
            page: "Profile page placeholder",
        };
    }
    return {
        ...state,
        api: api(),
        page: <LoginPage />,
    };
}

// page: current page
// function initalState(dispatch) {
//     return {
//         token: "",
//         page: "",
//         updateTokenCallback: (newToken) => {
//             dispatch({
//                 type: actionTypes().updateToken,
//                 newToken,
//             });
//         },
//         gotoQuizPageCallback: (props) => {
//             dispatch({
//                 type: actionTypes().goToQuizPage,
//                 props,
//             });
//         },
//     };
// }

/*
 ** cookie는 모든 브라우저에서 지원하지만 localstorage는 그렇지 않다.
 ** 따라서 앱 메모리(상태)에 토큰을 저장해야한다.
 ** load app transition animation
 */
function Container() {
    // NOTE: 상태를 어떤 값으로든 초기화하지 않으면 무한반복현상 발생
    const [state, dispatch] = useReducer(pageLoadReducer, {
        token: "",
        page: "",
        updateTokenCallback: ({ token }) => {
            dispatch({
                type: actionTypes().startPage,
                token,
            });
        },
        gotoQuizPageCallback: (props) => {
            dispatch({
                type: actionTypes().goToQuizPage,
                props,
            });
        },
    });

    /*
     **      조건부 의존 변수
     **      const shouldSetStateToLoading = loading && state !== 'loading'
     **      useEffect(() => {
     **      if (shouldSetStateToLoading) setState('loading')
     **      }, [shouldSetStateToLoading])
     **
     **      token 변화에만 의존하는 hook. token이 업데이트될때만 실행된다.
     */
    useEffect(() => {
        dispatch({
            type: actionTypes().startPage,
            token: localStorage.getItem("token"),
        });
    }, [state.token]);

    return (
        <ContainerContext.Provider value={state}>
            {state.page || "Loading App..."}
        </ContainerContext.Provider>
    );
}

export default Container;
