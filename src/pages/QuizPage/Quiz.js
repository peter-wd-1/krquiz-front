import React from "react";
function Quiz(props) {
    return (
        <div key={props.quiz.id}>
            <div
                style={{
                    fontFamily: "Open Sans",
                    padding: "20px",
                    dispaly: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    alignItems: "flex-start",
                    fontSize: "24px",
                }}
            >
                <div>{props.index + 1}</div>
                <div>{props.quiz.content}</div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "10px",
                }}
            >
                {props.quiz.answers.map((item, index) => {
                    return (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <label>
                                <input
                                    type="radio"
                                    name={props.quiz.id}
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            props.onChangeAnswer(
                                                (prevState) => {
                                                    return {
                                                        ...prevState,
                                                        [props.quiz.id]:
                                                            item.uuid,
                                                    };
                                                }
                                            );
                                        }
                                    }}
                                    checked={
                                        item.uuid ===
                                        props.answerChosen[props.quiz.id]
                                    }
                                />
                                <div>{item.content}</div>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export { Quiz };
