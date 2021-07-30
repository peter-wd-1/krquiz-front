import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";

const StyledModalContainer = styled(motion.div)({
    flexDirection: "column",
    opacity: "0",
    backgroundColor: "white",
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: "10",
});

const TimeUpHeader = styled("h1")({
    fontFamily: "Bungee",
    marginTop: "0px",
    padding: "0px",
});

export const InstructionHeader = styled("h2")({
    fontFamily: "Bungee",
    marginTop: "0px",
    fontSize: "20px",
});

const ModalContainer = ({ children }) => {
    return (
        <StyledModalContainer
            children={children}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.15 }}
        />
    );
};

const StyledImage = styled(motion.img)({
    height: "70px",
    width: "70px",
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
    width: "90%",
    height: "auto",
    backgroundColor: "white",
    color: "#2F3075",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "50",
    border: "2.3px solid #2F3075 ",
    boxShadow: "12px 12px 1px 0px #414CA6",
    padding: "20px",
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
    fontWeight: "900",
    backgroundColor: "#414CA6",
    width: "100%",
    height: "40px",
    border: "none",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
});

export { ModalContainer, PopupModal, Image, TimeUpHeader, CloseButton };
