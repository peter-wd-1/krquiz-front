import React, { useReducer } from "react";
import { Label, Input } from "lib";

const actionTypes = {
    changeValue: "changeValue",
};

function feildSetReducer(state, action) {
    switch (action.type) {
        case actionTypes.changeValue: {
            return {
                ...state,
                [action.event.target.name]: action.event.target.value,
            };
        }
        default: {
            throw new Error(
                "Unhandled type in feildSetReducer: " + action.type
            );
        }
    }
}

function combineReducers(...reducers) {
    return (state, action) => {
        for (const reducer of reducers) {
            const result = reducer(state, action);
            if (result) return result;
        }
        // TODO: null 값바꾸기
        return null;
    };
}

function useFeildSet({ reducer = feildSetReducer } = {}) {
    const [state, dispatch] = useReducer(reducer, []);
    const changeValue = () => {
        dispatch({ type: actionTypes.changeValue });
    };
    return { state, changeValue };
}

function InputSet({ items = [], reducer = () => {}, ...props }) {
    const { state, changeValue } = useFeildSet({
        reducer: combineReducers(reducer, feildSetReducer),
    });

    return (
        <div>
            {items.map((item, index) => {
                <Label>
                    {props.label | props.labelTag}
                    <Input
                        type={props.type}
                        name={props.name}
                        onChange={(event) => {
                            changeValue({ event });
                        }}
                    />
                </Label>;
            })}
        </div>
    );
}

export { InputSet };
