import React, { useReducer, useState, useEffect } from "react";
import { ApiContext, PageContext } from "./Context";
import { api } from "api";
import { LoginPage, QuizPage, ProfilePage } from "pages";
import { Page } from "./lib";

const actionType = {
    loadPage: "loadPage",
    finishedFetch: "finishedFetch",
};

/*
flow
- landing page
- login(+register) -> 5/5
// - result/profile page -> ??? name, email, phone, best score, current_quiz, possible_quiz, 지금 풀고 있는 퀴즈 id -> <start/continue quiz/cannot>
- quiz -> done -> modal
    - timer (20min)
    - quizs
    - finish -> modal (show score / goto result page / share)
- result/profile page -> ??? name, email, phone, best score, current_quiz, possible_quiz, 지금 풀고 있는 퀴즈 id -> <start/continue quiz/cannot>

- finish result page; (no content)
*/

const pageName = {
    loginPage: <LoginPage />,
    profilePage: <ProfilePage />,
    quizPage: <QuizPage />,
};
/**
   가장 먼저 실행되는 리듀서. 로그인한 기록이 있는지 확인. 자동로그인 해주고. 앞으로 쓸 API 전달
   자동으로 페이지는 로그인화면이 된다. 
   */
function loginStatusCheckReducer(state, action) {
    if (action.type === actionType.loadPage) {
        const token = localStorage.getItem("token");
        /* development local env -> 
        parameter -> ?page=login, ?page=mypage, ?page=quiz
        -> return
        */

        if (token) {
            if (action.pageName == "profilePage") {
                return {
                    ...state,
                    page: pageName.profilePage,
                };
            }
            // const url = process.env.REACT_APP_SERVER_URL + "/users/mypage";
            // const _parms = {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         accept: "application/json",
            //         Authorization: `token ${localStorage.getItem("token")}`,
            //     },
            // };

            // fetch(url, _parms)
            //     .then((res) => res.json())
            //     .then((data) => {
            //         console.log({ data });
            //         if (!data.current_quiz_id) {
            //             action.dispatch({
            //                 type: actionType.finishedFetch,
            //             });
            //         }
            //     });

            // profile routing logic
            // profile page로 넘어가는 조건 : 현재 문제 null
            return {
                ...state,
                api: api(token),
                page: pageName.quizPage,
            };
        } else {
            return {
                ...state,
                api: api(),
            };
        }
    }

    if (action.type === actionType.finishedFetch) {
        return {
            ...state,
            page: pageName.profilePage,
        };
    }

    return state;
}

function useContainer({ reducer }) {
    const [state, dispatch] = useReducer(reducer, { page: pageName.loginPage });
    const loadPage = (pageName) => {
        dispatch({ type: actionType.loadPage, dispatch, pageName });
    };

    return { state, loadPage };
}

function composeReducers(...reducers) {
    return reducers.reduce((prereducer, nextreducer) => (state, action) =>
        nextreducer(prereducer(state, action))
    );
}

function PageContainer() {
    const { state, loadPage } = useContainer({
        reducer: loginStatusCheckReducer,
    });

    useEffect(() => {
        loadPage();
    }, []);
    return (
        //TODO: share api state
        <ApiContext.Provider value={state.api}>
            <PageContext.Provider value={loadPage}>
                <Page>{state.page}</Page>
            </PageContext.Provider>
        </ApiContext.Provider>
    );
}

export { useContainer, PageContainer };

// async function quizStatusCheckReducer(state, action) {
//     if (action.type === actionType.loadPage) {
//         if (state.isLogin) {
//             try {
//                 const url = process.env.REACT_APP_SERVER_URL + "/users/mypage";
//                 const _parms = {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         accept: "application/json",
//                         Authorization: `token ${localStorage.getItem("token")}`,
//                     },
//                 };
//                 const res = await fetch(url, _parms);
//                 const data = await res.json();
//                 state.hasCurrentQuiz = true;
//                 state.page = pageName.quizPage;
//                 action.dispatch({ type: actionType.finishedFetch, data });

//                 // state
//                 //     .api({
//                 //         path: "/users/mypage",
//                 //         parms: {
//                 //             method: "GET",
//                 //         },
//                 //     })
//                 //     .then((res) => res.json())
//                 //     .then((data) => {
//                 //         if (data.current_quiz_id) {
//                 //             console.log({ data });
//                 //             state.hasCurrentQuiz = true;
//                 //             state.page = pageName.quizPage;
//                 //             action.dispatch({ type: actionType.finishedFetch });
//                 //         }
//                 //     });
//             } catch (e) {
//                 console.error({ e });
//             }
//         }
//     }
//     if (action.type === actionType.finishedFetch) {
//         console.log({ state, action });
//     }
//     return state;
// }

// function containerReducer({ state, action }) {
//     if (action.type === actionType.loadPage) {
//         return state;
//     }
//     return state;
// }
