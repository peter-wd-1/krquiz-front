import React, { useState } from "react";
import {
    ModalContainer,
    CloseButton,
    PopupModal,
    TimeUpHeader,
    Image,
    InstructionHeader,
} from "./lib";

import { SocialMediaButtons } from "./SotialMediaShareButton";
import noChanceIcon from "image/xicon.png";
import timeupIcon from "image/Sandglass.png";
import rocket from "image/Rocket.png";
import messageIcon from "image/Message.png";
function Modal(props) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div
            style={{
                display: `${isOpen ? "flex" : "none"}`,
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
        </div>
    );
}

function ResumeQuizPopup(props) {
    return (
        <div style={{ display: "flex" }}>
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
        </div>
    );
}

function TimeupModal(props) {
    return (
        <div style={{ display: "flex" }}>
            <PopupModal>
                <Image src={timeupIcon} />

                <TimeUpHeader
                    style={{
                        fontSize: "30px",
                    }}
                >
                    Time Up!
                </TimeUpHeader>
                <TimeUpHeader>Your Best Score is: </TimeUpHeader>
                <TimeUpHeader style={{ fontSize: "100px" }}>
                    {props.score}
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
        </div>
    );
}

function FinishModal(props) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div
            style={{
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
        </div>
    );
}

function InstructionPopup(props) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            style={{
                display: `${isOpen ? "flex" : "none"}`,
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
        </div>
    );
}

function SharePopup(props) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div style={{ display: `${isOpen ? "flex" : "none"}` }}>
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
        </div>
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
