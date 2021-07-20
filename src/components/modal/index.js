import React from "react";
import {
    ModalContaniner,
    CloseButton,
    PopupModal,
    TimeUpHeader,
    Image,
    InstructionHeader,
} from "./lib";

import { SocialMediaButtons } from "./SotialMediaShareButton";
import noChanceIcon from "image/xicon.png";
import timeupIcon from "image/Sandglass.png";

function Modal(props) {
    return (
        <div style={{ display: "flex" }}>
            {props.children}
            <PopupModal></PopupModal>
            <ModalContaniner />
        </div>
    );
}

function TimeupModal(props) {
    return (
        <div style={{ display: "flex" }}>
            <PopupModal>
                <Image src={timeupIcon} alt="Logo" />
                <TimeUpHeader>Time Up!</TimeUpHeader>
                <CloseButton
                    style={{ marginBottom: "10px" }}
                    onClick={() => {}}
                >
                    Try Again
                </CloseButton>
                <CloseButton onClick={() => props.onClose(false)}>
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContaniner />
        </div>
    );
}

function InstructionPopup(props) {
    return (
        <div style={{ display: "flex" }}>
            <PopupModal>
                <Image src={timeupIcon} alt="Logo" />
                <InstructionHeader>
                    The length of the quiz is 20min!
                </InstructionHeader>
                <CloseButton onClick={() => props.onClose(false)}>
                    Close
                </CloseButton>

                <SocialMediaButtons />
            </PopupModal>
            <ModalContaniner />
        </div>
    );
}

function SharePopup(props) {
    return (
        <div style={{ display: "flex" }}>
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
                <CloseButton onClick={() => props.onClose(false)}>
                    Close
                </CloseButton>
            </PopupModal>
            <ModalContaniner />
        </div>
    );
}

export { Modal, TimeupModal, InstructionPopup, SharePopup };
