import React, { useState, useEffect, useContext } from "react";
import { ApiContext, PageContext } from "components/PageContainer/Context";
import { QuizeContainer } from "pages/QuizPage/lib";
import {
    ProfileContainer,
    UserInfo,
    ProfilePageText,
    ProfileImage,
    ProfileIntro,
    ProfileHeadline,
    NewQuizButton,
    LogoutButton,
    ChancesInfo,
    BestScoreInfo,
    ShareInfo,
} from "./lib";

import {
    Modal,
    TimeupModal,
    InstructionPopup,
    SharePopup,
    ResumeQuizPopup,
    FinishModal,
} from "components/modal";

function ProfilePage() {
    const api = useContext(ApiContext);
    const loadPage = useContext(PageContext);
    const [profileInfo, setProfileInfo] = useState({
        username: "",
    });
    const [newQuiz, setNewQuiz] = useState(false);
    const [popup, setPopup] = useState("");
    const [raiseChance, setRaiseChance] = useState(false);

    const renderPopup = (parm) => {
        switch (parm) {
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
        if (newQuiz) {
            const queryDate = Math.floor(Date.now() / 1000);
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
                    setNewQuiz(false);
                    // setCurrentQuizSetId(data.id);
                    // setEnded(data.ended);
                    // setUserQuizs(data.user_quiz);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    });
    useEffect(() => {
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
                setProfileInfo(data);
            })
            .catch((e) => {
                console.error("Error occured in profile mypage api call: ", e);
            });
    }, []);

    useEffect(() => {
        if (raiseChance) {
            api({
                path: "/users/share/",
                parms: {
                    method: "GET",
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("share successful");
                        setRaiseChance(false);
                    }
                })
                .catch((e) => {
                    console.error(
                        "Error occured in profile mypage api call: ",
                        e
                    );
                });
        }
    }, [raiseChance]);

    return (
        <ProfileContainer>
            {renderPopup(popup)}
            <ProfileHeadline>Profile</ProfileHeadline>
            <ProfileIntro>
                <UserInfo profileInfo={profileInfo} />
                <NewQuizButton onClick={() => setNewQuiz(true)}>
                    {/* TODO: 상태에 따라 다른 메시지 출력 */}
                    Start Quiz
                </NewQuizButton>
            </ProfileIntro>
            <BestScoreInfo score={profileInfo.best_score} />
            <ChancesInfo
                chancesUsed={profileInfo.quiz_count}
                chancesAvailable={profileInfo.possible_count}
            />
            <ShareInfo raiseChance={setRaiseChance} />
            <LogoutButton
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload(false);
                }}
            />
            {/* <div */}
            {/*     style={{ */}
            {/*         fontWeight: "900", */}
            {/*         backgroundColor: "#414CA6", */}
            {/*         width: "30%", */}
            {/*         height: "40px", */}
            {/*         border: "none", */}
            {/*         color: "white", */}
            {/*         display: "flex", */}
            {/*         justifyContent: "center", */}
            {/*         alignItems: "center", */}
            {/*         textTransform: "uppercase", */}
            {/*     }} */}
            {/*     onClick={() => { */}
            {/*         localStorage.removeItem("token"); */}
            {/*         window.location.reload(false); */}
            {/*     }} */}
            {/* > */}
            {/*     LOGOUT */}
            {/* </div> */}
        </ProfileContainer>
    );
}

export { ProfilePage };
