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
                    fontSize: "18px",
                    display: "flex",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                        width: "40px",
                        fontWeight: "900",
                        fontSize: "28px",
                        marginBottom: "5px",
                        border: "solid black 3px",
                    }}
                >
                    {props.index + 1}
                </div>
                <div>{props.quiz.content}</div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "20px",
                    paddingTop: "0",
                }}
            >
                {props.quiz.answers.map((item, index) => {
                    return (
                        <div key={index}>
                            <label
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0px",
                                    margin: "0px",
                                    textAlign: "left",
                                }}
                            >
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
                                <div
                                    style={{ padding: "5px", fontSize: "16px" }}
                                >
                                    {item.content}
                                </div>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export { Quiz };
