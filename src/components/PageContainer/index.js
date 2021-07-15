import React, { useReducer, useState, useEffect } from "react";
import { ApiContext } from "./ApiContext";
import { api } from "api";

const actionType = {
    loadPage: "loadPage",
};

/**
   가장 먼저 실행되는 리듀서. 로그인한 기록이 있는지 확인. 자동로그인 해주고. 앞으로 쓸 API 전달 
   */
function loginStatusCheckReducer(state, action) {
    if (action.type === actionType.loadPage) {
        const token = localStorage.getItem("token");
        if (token) {
            return {
                state: {
                    ...state,
                    isLogin: true,
                    api: api(token),
                    page: "login",
                },
                action,
            };
        }
    }
    return { state, action };
}

function quizStatusCheckReducer({ state, action }) {
    if (action.type === actionType.loadPage) {
        if (state.isLogin) {
            try {
                state
                    .api({
                        path: "/users/mypage",
                        parms: {
                            method: "GET",
                        },
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.current_quiz_id) {
                            state.hasCurrentQuiz = true;
                        }
                        state.page = "Quiz Page";
                    });
            } catch (e) {
                console.error({ e });
            }
        }
        return { state, action };
    }
}

function containerReducer({ state, action }) {
    //TODO: 기본 처리 로직
    if (action.type === actionType.loadPage) {
        return { state };
    }
    throw new Error("None of reducers handled state in PageContainer");
}

function useContainer({ reducer }) {
    const [state, dispatch] = useReducer(reducer, [{ page: "loginPage" }]);
    const loadPage = () => {
        dispatch({ type: actionType.loadPage });
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
        reducer: composeReducers(
            loginStatusCheckReducer,
            quizStatusCheckReducer,
            containerReducer
        ),
    });

    useEffect(() => {
        loadPage();
    }, [state.page]);

    return (
        //TODO: share api state
        <ApiContext.Provider value={state.api}>
            {state.page}
        </ApiContext.Provider>
    );
}

export { useContainer, containerReducer, PageContainer };
