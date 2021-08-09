import React, { useState, useEffect } from "react";
import { SocialMediaButtons } from "./SotialMediaShareButton";
import noChanceIcon from "image/Lamp.png";
import timeupIcon from "image/Sandglass.png";
import xIcon from "image/xicon.png";
import rocket from "image/Rocket.png";
import messageIcon from "image/Message.png";
import lightBulb from "image/Lamp.png";
import Div100vh from "react-div-100vh";
import Confetti from "react-dom-confetti";
import shareIcon from "image/Network.png";
import {
    ModalContainer,
    CloseButton,
    PopupModal,
    TimeUpHeader,
    Image,
    InstructionHeader,
} from "./lib";

function Modal(props) {
    const [isOpen, setIsOpen] = useState(true);
    // useEffect(() => {
    //     setIsOpen(true);
    // }, []);
    return (
        <Div100vh
            style={{
                display: `${isOpen ? "flex" : "none"}`,
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <PopupModal>
                <Image src={messageIcon} />
                <InstructionHeader>{props.message}</InstructionHeader>
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                        console.log({ props });
                        props.closePopup();
                    }}
                >
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}

function ResumeQuizPopup(props) {
    return (
        <Div100vh
            style={{
                display: "flex",
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <Image src={rocket} />
                <InstructionHeader>
                    You have quiz that is still going on.
                </InstructionHeader>

                <CloseButton
                    onClick={() => {
                        props.onClose.close(false);
                        props.onClose.popup("");
                    }}
                >
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}

function TimeupModal(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [run, setRun] = useState(false);
    const confettiConfig = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: "0.25",
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        perspective: "668px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    };

    useEffect(() => {
        setRun(!run);
    }, []);

    return (
        <Div100vh
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                display: `${isOpen ? "flex" : "none"}`,
                width: "100%",
            }}
        >
            <PopupModal>
                <Confetti active={run} config={confettiConfig} />
                <InstructionHeader
                    style={{
                        fontSize: "30px",
                    }}
                >
                    Time Up!
                </InstructionHeader>
                <Image src={timeupIcon} />
                <InstructionHeader>Your Score is: </InstructionHeader>
                <TimeUpHeader
                    style={{
                        fontSize: "60px",
                        fontFamily: "Bungee Shade",
                        margin: "10px",
                    }}
                >
                    {props.score}
                </TimeUpHeader>
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                        window.location.reload(false);
                    }}
                >
                    Finish
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}

function FinishModal(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [run, setRun] = useState(false);
    const confettiConfig = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: "0.25",
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        perspective: "668px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    };

    useEffect(() => {
        setRun(!run);
    }, []);
    return (
        <Div100vh
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: `${isOpen ? "flex" : "none"}`,
                width: "100%",
            }}
        >
            <PopupModal>
                <Confetti active={run} config={confettiConfig} />
                <TimeUpHeader style={{ fontSize: "20px" }}>
                    Great Job!
                </TimeUpHeader>
                <Image src={timeupIcon} />
                <TimeUpHeader style={{ fontSize: "20px" }}>
                    Your Score is{" "}
                </TimeUpHeader>
                <TimeUpHeader
                    style={{
                        paddingBottom: "20px",
                        fontFamily: "Bungee Shade",
                        fontSize: "60px",
                    }}
                >
                    {props.score}
                </TimeUpHeader>
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                        window.location.reload(false);
                    }}
                >
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}

function InstructionPopup(props) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Div100vh
            style={{
                display: `${isOpen ? "flex" : "none"}`,
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
            }}
        >
            <PopupModal>
                <Image src={timeupIcon} />
                <InstructionHeader>
                    Quiz Length is{" "}
                    <h1
                        style={{
                            fontFamily: "Bungee Shade",
                            fontSize: "70px",
                            paddingBottom: "5px",
                        }}
                    >
                        20
                    </h1>
                    Minutes.
                </InstructionHeader>
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                        window.location.reload(false);
                    }}
                >
                    START
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}

function SharePopup(props) {
    return (
        <Div100vh
            style={{
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        paddingTop: "10px",
                        paddingBottom: "0px",
                        margin: "0px",
                    }}
                >
                    <strong>Pro Tip!</strong>
                </InstructionHeader>
                <Image
                    style={{ width: "80px", height: "80px" }}
                    src={noChanceIcon}
                    alt="Logo"
                />
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        paddingTop: "10px",
                    }}
                >
                    <strong>Share</strong> with your firends and get more
                    chances!
                </InstructionHeader>
                <CloseButton
                    onClick={() => {
                        props.closePopup();
                    }}
                >
                    okay!
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}
export function UsedAllSharePopup(props) {
    return (
        <Div100vh
            style={{
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        paddingTop: "10px",
                    }}
                >
                    <strong> Sorry, ☹</strong>
                </InstructionHeader>
                <Image
                    style={{ width: "60px", height: "60px" }}
                    src={xIcon}
                    alt="Logo"
                />
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        paddingTop: "10px",
                    }}
                >
                    You can't get more then 3 times of chances.
                </InstructionHeader>
                <CloseButton
                    onClick={() => {
                        props.closePopup();
                    }}
                >
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}

export function NoChancesPopup(props) {
    return (
        <Div100vh
            style={{
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        paddingTop: "10px",
                    }}
                >
                    <strong> Sorry, ☹</strong>
                </InstructionHeader>
                <Image
                    style={{ width: "60px", height: "60px" }}
                    src={xIcon}
                    alt="Logo"
                />
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        paddingTop: "10px",
                    }}
                >
                    You have no chances left
                </InstructionHeader>
                <CloseButton
                    onClick={() => {
                        props.closePopup();
                    }}
                >
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}



export function ShareDone(props) {
    return (
        <Div100vh
            style={{
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        paddingTop: "10px",
                    }}
                >
                    <strong>Thank you ️🙏</strong>
                </InstructionHeader>
                <Image
                    style={{ width: "60px", height: "60px" }}
                    src={shareIcon}
                    alt="Logo"
                />
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        paddingTop: "10px",
                    }}
                >
                    Share message successfully sent. You got +1 more chance!
                </InstructionHeader>
                <CloseButton
                    onClick={() => {
                        props.closePopup();
                    }}
                >
                    OKAY!
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}


export function ShareFail(props) {
    return (
        <Div100vh
            style={{
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                        paddingTop: "10px",
                    }}
                >
                    <strong>Sorry, 😟</strong>
                </InstructionHeader>
                <Image
                    style={{ width: "60px", height: "60px" }}
                    src={xIcon}
                    alt="Logo"
                />
                <InstructionHeader
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        paddingTop: "10px",
                    }}
                >
                    Message delivery failed :(
                    <br/>Try again
                </InstructionHeader>
                <CloseButton
                    onClick={() => {
                        props.closePopup();
                    }}
                >
                    OKAY!
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}




export {
    Modal,
    TimeupModal,
    InstructionPopup,
    SharePopup,
    ResumeQuizPopup,
    FinishModal,
};
