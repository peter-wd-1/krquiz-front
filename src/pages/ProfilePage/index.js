import React, { useState, useEffect, useContext } from "react";
import { ApiContext, PageContext } from "components/PageContainer/Context";
import { QuizeContainer } from "pages/QuizPage/lib";
import { ProfileContainer } from "./lib";
function ProfilePage() {
    // api call -> user info

    //     {
    //         title: ID

    //         username*	string

    //         name*	string
    //         email	string($email)

    //         quiz_count	integer
    //         maximum: 5
    //         minimum: 0

    //         possible_count	integer
    //         maximum: 5
    //         minimum: 0

    //         best_score	string

    //         current_quiz_id	string
    // }
    // show info UI
    // username, phone, email, avatar
    // popup earn chance Modal
    //

    const api = useContext(ApiContext);
    const loadPage = useContext(PageContext);
    const [profileInfo, setProfileInfo] = useState({});

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

    return (
        <ProfileContainer>
            <h1
                style={{ color: "white" }}
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload(false);
                }}
            >
                LogOut
            </h1>
        </ProfileContainer>
    );
}

export { ProfilePage };
