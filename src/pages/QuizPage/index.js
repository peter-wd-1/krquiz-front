import React, { useEffect, useState, useContext } from "react";
import { QuizeContainer, QuizPageContainer } from "./lib";
import { Quiz } from "./Quiz";
import { PrograssBar } from "./PrograssBar";
import { ApiContext } from "components/PageContainer/Context";
import { TimeupModal, InstructionPopup, SharePopup } from "components/modal";

/*
time

quizs
    quiz
        quiz number
        quiz content
        answers
            answer

finish
*/

function QuizPage() {
    const [userQuizs, setUserQuizs] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [answerChosen, setAnswerChosen] = useState([]);
    const [isTimeup, setIsTimeup] = useState(false);
    const [initalInstructionPopup, setInstPopup] = useState(true);
    const [sharePopup, setSharePopup] = useState(false);
    const [ended, setEnded] = useState(0);
    const api = useContext(ApiContext);
    const nextQuiz = () => {
        if (currentQuizIndex < userQuizs.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
        }
    };
    const prevQuiz = () => {
        if (currentQuizIndex > 0) {
            setCurrentQuizIndex(currentQuizIndex - 1);
        }
    };

    useEffect(() => {
        for (let key in answerChosen) {
            api({
                path: `/quizs/userquizs/${key}`,
                parms: {
                    method: "PATCH",
                    body: JSON.stringify({
                        user_answer: answerChosen[key],
                    }),
                },
            });
        }
    }, [answerChosen]);

    useEffect(() => {
        const queryDate = Math.floor(Date.now() / 1000);
        api({
            path: "/users/mypage",
            parms: {
                method: "GET",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                //TODO: 이전에 불턴 문제가 있다는 알람창이 떠야함
                if (data.current_quiz_id) {
                    api({
                        path: `/quizs/userquizsets/${data.current_quiz_id}`,
                        parms: {
                            method: "GET",
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log("old quiz: ", { data });
                            setEnded(data.ended);
                            setUserQuizs(data.user_quiz);
                        });
                } else {
                    //TODO: 이전에 풀던 문제가 없음. 새로시작.
                    api({
                        path: "/quizs/userquizsets/",
                        parms: {
                            method: "POST",
                            body: JSON.stringify({
                                started: queryDate,
                            }),
                        },
                    })
                        .then((res) => {
                            if (res.ok) {
                                return res.json();
                            }
                            setSharePopup(true);
                            throw new Error(
                                "User used all chances to take quiz"
                            );
                        })
                        .then((data) => {
                            console.log("new quiz: ", { data });
                            setEnded(data.ended);
                            setUserQuizs(data.user_quiz);
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                }
            });
    }, []);
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <QuizPageContainer style={{ position: "relative" }}>
                {isTimeup ? <TimeupModal onClose={setIsTimeup} /> : ""}
                {initalInstructionPopup ? (
                    <InstructionPopup
                        style={{ position: "absolute" }}
                        onClose={setInstPopup}
                    />
                ) : (
                    ""
                )}
                {sharePopup ? <SharePopup onClose={setSharePopup} /> : ""}
                <PrograssBar ended={ended} setTimeup={setIsTimeup} />
                <QuizeContainer>
                    {userQuizs.map((item, index) => {
                        if (currentQuizIndex === index) {
                            return (
                                <Quiz
                                    quiz={item}
                                    key={index}
                                    onChangeAnswer={setAnswerChosen}
                                    answerChosen={answerChosen}
                                />
                            );
                        }
                    })}
                </QuizeContainer>
                <div style={{ position: "fixed", bottom: "40px" }}>
                    <button
                        style={{
                            fontFamily: "Bungee",
                            border: "none",
                            borderRight: "solid 2px yellow",
                            marginRight: "0",
                            color: "white",
                            backgroundColor: "black",
                            padding: "15px",
                        }}
                        onClick={prevQuiz}
                    >
                        {"<"}
                    </button>
                    <button
                        style={{
                            padding: "15px",
                            fontFamily: "Bungee",
                            border: "none",
                            color: "white",
                            backgroundColor: "black",
                        }}
                        onClick={nextQuiz}
                    >
                        {">"}
                    </button>
                </div>
                <div style={{ fontFamily: "Bungee" }}>FINISH</div>
            </QuizPageContainer>
        </div>
    );
}

export { QuizPage };
