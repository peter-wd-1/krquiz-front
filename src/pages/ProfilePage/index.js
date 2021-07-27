import React, { useState, useEffect, useContext } from "react";
import { ApiContext, PageContext } from "components/PageContainer/Context";
import { QuizeContainer } from "pages/QuizPage/lib";

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
            .then((data) => {});
    }, []);

    return (
        <QuizeContainer>
            <h1 style={{ color: "white" }}>Quiz Profile View</h1>
            <h1
                style={{ color: "white" }}
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload(false);
                }}
            >
                LogOut
            </h1>
        </QuizeContainer>
    );
}

export { ProfilePage };
