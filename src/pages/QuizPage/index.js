import React, { useEffect, useState, useContext } from "react";
import { QuizeContainer, QuizPageContainer } from "./lib";
import { Quiz } from "./Quiz";
import { PrograssBar } from "./PrograssBar";
import { ApiContext, PageContext } from "components/PageContainer/Context";
import {
    TimeupModal,
    InstructionPopup,
    SharePopup,
    ResumeQuizPopup,
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

    const renderSwitch = (parm) => {
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
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("quiz solve: ", { data });
                });
        }
    }, [answerChosen]);

    useEffect(() => {
        if (isTimeup) {
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
                            }
                            // TODO: 더 이상 문제를 못 풀면 기회가 없을 경우 share popup
                            loadPage("profilePage");
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
                {renderSwitch(popup)}
                <PrograssBar ended={ended} setTimeup={setIsTimeup} />
                <QuizeContainer>
                    {userQuizs.map((item, index) => {
                        if (currentQuizIndex === index) {
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
