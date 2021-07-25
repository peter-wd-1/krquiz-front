import React, { useEffect, useState, useContext } from "react";
import { QuizeContainer, QuizPageContainer } from "./lib";
import { Quiz } from "./Quiz";
import { PrograssBar } from "./PrograssBar";
import { ApiContext, PageContext } from "components/PageContainer/Context";
import Div100vh from "react-div-100vh";
import {
    Modal,
    TimeupModal,
    InstructionPopup,
    SharePopup,
    ResumeQuizPopup,
    FinishModal,
} from "components/modal";

/*
- [ ] timeup popup 다른곳에서 뜨는 문제
- [o] popup 중첩되는 문제
- [o] 기존에 풀던 문제 answer 받아와야됨 -> api
- [ ] 기존에 풀던 문제 answer 있으면 체크
- [ ] 문제가 풀던 와중에 문제 순서가 바뀜
- [ ] 문제 번호 붙여야함.
start -> popup -> isInitalInstructionPop // true -> false

timeup -> popup
*/

function QuizPage() {
    const [popup, setPopup] = useState("");
    const [userQuizs, setUserQuizs] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [answerChosen, setAnswerChosen] = useState([]);
    const [isTimeup, setIsTimeup] = useState(false);
    // const [isInitalInstructionPopup, setInstPopup] = useState(true);  // 처음 시작 됐는지? -> true
    const [isSharePopup, setSharePopup] = useState(false);
    const [ended, setEnded] = useState(0);
    const [isResumePopup, setIsResumePopup] = useState(false);
    const api = useContext(ApiContext);
    const loadPage = useContext(PageContext);
    const [score, setScore] = useState(0);
    const [isFinishedButtonClicked, setIsFinishedButtonClicked] = useState(
        false
    );
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

    const renderPopup = (parm) => {
        switch (parm) {
            case "ResumeQuizPopup": {
                return (
                    <ResumeQuizPopup
                        onClose={{ close: setIsResumePopup, popup: setPopup }}
                    />
                );
            }

            case "TimeupModal": {
                return (
                    <TimeupModal
                        onClose={{ close: setIsTimeup, popup: setPopup }}
                        score={score}
                    />
                );
            }

            case "InstructionPopup": {
                return (
                    <InstructionPopup
                    // onClose={{ close: setInstPopup, popup: setPopup }}
                    />
                );
            }
            case "SharePopup": {
                return <SharePopup />;
            }
            case "FinishPopup": {
                return <FinishModal score={score} />;
            }
        }
    };
    useEffect(() => {});
    useEffect(() => {
        if (isFinishedButtonClicked) {
            api({
                path: "/users/mypage/",
                parms: {
                    method: "GET",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    api({
                        path: `/quizs/userquizsets/${data.current_quiz_id}`,
                        parms: {
                            method: "PATCH",
                            body: JSON.stringify({
                                is_done: true,
                            }),
                        },
                    })
                        .then((res) => {
                            if (res.ok) {
                                return res.json();
                            }
                        })
                        .then((data) => {
                            setPopup("FinishPopup");
                            setScore(data.score);
                            console.log("finish quiz: ", { data });
                        });
                });
        }
    }, [isFinishedButtonClicked]);
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
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("quiz solve: ", { data });
                });
        }
    }, [answerChosen]);

    useEffect(() => {
        if (isTimeup) {
            api({
                path: "/users/mypage/",
                parms: {
                    method: "GET",
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((data) => {
                    console.log("user score: ", data.best_score);
                    setScore(data.best_score);
                });
            //TODO:종료되었음. 점수를 띄워야함.
            setPopup("TimeupModal");
        }
    }, [isTimeup]);

    useEffect(() => {
        // state 변경시 안내메시지를 띄운다.
        [
            // {
            //     isPopup: isTimeup,
            //     popup: "TimeupModal",
            // },
            // {
            //     isPopup: isInitalInstructionPopup,
            //     popup: "InstructionPopup",
            // },
            {
                isPopup: isSharePopup,
                popup: "SharePopup",
            },
            {
                isPopup: isResumePopup,
                popup: "ResumeQuizPopup",
            },
        ].some((item, index) => {
            return item.isPopup ? setPopup(item.popup) : "";
        });
    }, [isSharePopup, isResumePopup]);

    useEffect(() => {
        //풀던 문제가 있는지 확인

        api({
            path: "/users/mypage",
            parms: {
                method: "GET",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.current_quiz_id) {
                    setIsResumePopup(true);
                }
            });
        //없으면 새문제를 발행
        const queryDate = Math.floor(Date.now() / 1000);
        //안내 메시지를 읽으면 퀴즈를 가져올지 정한다.
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
                    setIsResumePopup(true);
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
                                setPopup("InstructionPopup");
                                return res.json();
                            } else {
                                // TODO: 더 이상 문제를 못 풀면 기회가 없을 경우 share popup
                                loadPage("profilePage");
                            }
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
        <Div100vh
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <QuizPageContainer style={{ position: "relative" }}>
                {renderPopup(popup)}
                <PrograssBar ended={ended} setTimeup={setIsTimeup} />
                <QuizeContainer>
                    {userQuizs.map((item, index) => {
                        if (
                            currentQuizIndex === 19 &&
                            currentQuizIndex === index
                        ) {
                            return (
                                <div>
                                    <Quiz
                                        quiz={item}
                                        index={index}
                                        key={index}
                                        onChangeAnswer={setAnswerChosen}
                                        answerChosen={answerChosen}
                                    />
                                    <div
                                        onClick={() => {
                                            setIsFinishedButtonClicked(true);
                                            console.log("clicked");
                                        }}
                                    >
                                        FINISH
                                    </div>
                                </div>
                            );
                        }
                        if (
                            currentQuizIndex === index &&
                            currentQuizIndex !== 19
                        ) {
                            return (
                                <Quiz
                                    quiz={item}
                                    index={index}
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
                            marginRight: "10px",
                            color: "white",
                            backgroundColor: "#414CA6",
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
                            backgroundColor: "#414CA6",
                        }}
                        onClick={nextQuiz}
                    >
                        {">"}
                    </button>
                </div>
            </QuizPageContainer>
        </Div100vh>
    );
}

export { QuizPage };
