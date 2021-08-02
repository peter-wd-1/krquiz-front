import React, { useState, useEffect, useContext } from "react";
import { ApiContext, PageContext } from "components/PageContainer/Context";
import { QuizeContainer } from "pages/QuizPage/lib";
import xicon from "image/xicon.png";
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
    RefreshButton,
} from "./lib";

import {
    TimeupModal,
    InstructionPopup,
    SharePopup,
    UsedAllSharePopup,
} from "components/modal";

function ProfilePage() {
    const api = useContext(ApiContext);
    const loadPage = useContext(PageContext);
    const [profileInfo, setProfileInfo] = useState({
        username: "",
    });
    const [newQuiz, setNewQuiz] = useState(false);
    const [popup, setPopup] = useState("");
    const [raiseChance, setRaiseChance] = useState({ value: false });
    const [isHelpShare, setHelpShare] = useState(false);
    const closePopup = () => {
        setPopup(false);
    };
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
                return <SharePopup closePopup={closePopup} />;
            }
            case "UsedAllShare": {
                return (
                    <UsedAllSharePopup
                        closePopup={() => {
                            window.location.reload();
                            closePopup();
                        }}
                    />
                );
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
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }, [newQuiz]);

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
                if (data.quiz_count === data.possible_count) {
                    setPopup("SharePopup");
                }
            })
            .catch((e) => {
                console.error("Error occured in profile mypage api call: ", e);
            });
    }, []);

    useEffect(() => {
        if (raiseChance.value) {
            api({
                path: "/users/share/",
                parms: {
                    method: "GET",
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("share successful");
                        window.location.reload();
                        window.location = raiseChance.link;
                        setRaiseChance({ value: false });
                    } else {
                        console.log("share not available");
                        setPopup("UsedAllShare");
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
                onHelpClick={setHelpShare}
            />
            <ShareInfo
                raiseChance={setRaiseChance}
                isHelpShare={isHelpShare}
                onHelpShare={setHelpShare}
                availableShare={profileInfo.possible_count - 2}
            />
            <LogoutButton
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload(false);
                }}
            />

            <LogoutButton
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "5%",
                    width: "130px",
                }}
                onClick={() => {
                    localStorage.removeItem("landingVisit");
                    window.location.reload(false);
                }}
            >
                home
            </LogoutButton>
        </ProfileContainer>
    );
}

export { ProfilePage };
