import React, { useState } from "react";
import { SocialMediaButtons } from "./SotialMediaShareButton";
import noChanceIcon from "image/xicon.png";
import timeupIcon from "image/Sandglass.png";
import rocket from "image/Rocket.png";
import messageIcon from "image/Message.png";
import Div100vh from "react-div-100vh";
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
    return (
        <Div100vh
            style={{
                display: `${isOpen ? "flex" : "none"}`,
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <Image src={messageIcon} />
                <InstructionHeader>{props.message}</InstructionHeader>
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
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
    return (
        <Div100vh
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PopupModal>
                <Image src={timeupIcon} />

                <TimeUpHeader
                    style={{
                        fontSize: "30px",
                    }}
                >
                    Time Up!
                </TimeUpHeader>
                <TimeUpHeader>Your Score is: </TimeUpHeader>
                <TimeUpHeader style={{ fontSize: "60px" }}>
                    {props.score}
                </TimeUpHeader>
                <TimeUpHeader>
                    Current Best Score:{props.bestScore}{" "}
                </TimeUpHeader>
                <CloseButton
                    style={{ marginBottom: "10px" }}
                    onClick={() => {}}
                >
                    Try Again
                </CloseButton>
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

function FinishModal(props) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Div100vh
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: `${isOpen ? "flex" : "none"}`,
            }}
        >
            <PopupModal>
                <Image src={timeupIcon} />

                <TimeUpHeader>Great Job!</TimeUpHeader>
                <TimeUpHeader>Your Score is: {props.score}</TimeUpHeader>
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <PopupModal>
                <Image src={timeupIcon} />
                <InstructionHeader>
                    The length of the quiz is 20min!
                </InstructionHeader>
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContainer />
        </Div100vh>
    );
}

function SharePopup(props) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Div100vh
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: `${isOpen ? "flex" : "none"}`,
            }}
        >
            <PopupModal>
                <Image
                    style={{ width: "60px", height: "60px" }}
                    src={noChanceIcon}
                    alt="Logo"
                />
                <InstructionHeader
                    style={{ fontFamily: "Bungee", paddingTop: "10px" }}
                >
                    You have no chance left, Share this page and earn more
                    chances
                </InstructionHeader>
                <SocialMediaButtons />
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    Close
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
