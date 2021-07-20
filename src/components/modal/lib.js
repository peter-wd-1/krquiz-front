import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";

const StyledModalContainer = styled(motion.div)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: "0",
    backgroundColor: "white",
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100vw",
    height: "100vh",
    zIndex: "10",
});

const TimeUpHeader = styled("h1")({
    fontFamily: "Bungee shade",
    marginTop: "0px",
});

export const InstructionHeader = styled("h2")({
    fontFamily: "Bungee shade",
    marginTop: "0px",
});

const ModalContaniner = ({ children }) => {
    return (
        <StyledModalContainer
            children={children}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.15 }}
        />
    );
};

const StyledImage = styled(motion.img)({
    height: "100px",
    width: "100px",
});

const Image = ({ children, ...props }) => {
    return (
        <StyledImage
            animate={{ rotate: 360 * 3 }}
            transition={spring}
            {...props}
        />
    );
};

const StyledModal = styled(motion.div)({
    display: "flex",
    flexDirection: "column",
    width: "80vw",
    backgroundColor: "white",
    color: "#2F3075",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "20",
    border: "2.3px solid #2F3075 ",
    boxShadow: "12px 12px 1px 0px rgb(198 161 255 / 64%)",
    padding: "10px",
});

const spring = {
    type: "spring",
    stiffness: 2000,
    damping: 30,
};

const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const item = {
    visible: { scale: 1 },
    hidden: { scale: 0.5 },
};

const PopupModal = ({ children }) => {
    return (
        <StyledModal
            initial="hidden"
            animate="visible"
            variants={item}
            children={children}
            transition={spring}
        />
    );
};

const CloseButton = styled(motion.div)({
    backgroundColor: "#f2ff42",
    width: "100%",
    height: "40px",
    border: "2.3px solid #2F3075 ",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
});

export { ModalContaniner, PopupModal, Image, TimeUpHeader, CloseButton };
