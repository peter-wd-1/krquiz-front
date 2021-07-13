import React, { useReducer } from "react";
const actionTypes = {
    changeValue: "changeValue",
};

function inputFieldReducer(state, action) {
    switch (action.type) {
        case actionTypes.changeValue: {
            return {
                state: {
                    ...state,
                    [action.changeEvent.target.name]:
                        action.changeEvent.target.value,
                },
                action,
            };
        }
        default: {
            throw new Error(
                "Unhandled type in inputFieldReducer: " + action.type
            );
        }
    }
}

function useInputField({ reducer = inputFieldReducer } = {}) {
    const [state, dispatch] = useReducer(reducer, []);
    const changeValue = (changeEvent) => {
        dispatch({ type: actionTypes.changeValue, changeEvent });
    };
    return { state, changeValue };
}

function composeReducers(...reducers) {
    return reducers.reduce((prereducer, nextreducer) => (state, action) =>
        nextreducer(prereducer(state, action))
    );
}
// to use pre state in next state reducer decided to deprecate this function
// function combineReducers(...reducers) {
//     return (state, action) => {
//         for (const reducer of reducers) {
//             const result = reducer(state, action);
//             if (result) return result;
//         }
//         // TODO: null 값바꾸기
//         return null;
//     };
// }

export { actionTypes, inputFieldReducer, useInputField, composeReducers };
