import React, { useReducer } from "react";

function actionTypes() {
    return {
        moveToProfile: "moveToProfile",
        moveToQuiz: "moveToQuiz",
    };
}

function routeReducer(state, action) {
    switch (action.type) {
        case actionTypes().moveToProfile: {
            //TODO: route to profile
        }
        case actionTypes().moveToQuiz: {
            //TODO: route to Quiz
        }
        default: {
            throw new Error("Unhandled type in routeReducer: " + action.type);
        }
    }
}

function Container(props) {
    return props.item;
}

export default Container;
