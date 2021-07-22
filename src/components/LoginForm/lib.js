import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";

const motionWrapper = (StyledComponent, motionProps) => (props) => {
    return (
        <StyledComponent {...motionProps} {...props}>
            {props.children}
        </StyledComponent>
    );
};

const StyledForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
});

const Form = ({ children }) => {
    return <StyledForm children={children} />;
};

const StyledFieldSet = styled(motion.fieldset)({
    display: "flex",
    width: "90vw",
    flexDirection: "column",
    border: "none",
    backgroundColor: "white",
    padding: "0",
});

const FieldSet = ({ children }) => {
    return (
        <StyledFieldSet
            animate={{
                boxShadow: "12px 12px 1px 0px rgb(17 3 202 / 76%)",
            }}
            children={children}
        />
    );
};
const StyledSubmitButton = styled(motion.button)({
    marginTop: "20px",
    height: "60px",
    borderRadius: "0px",
    border: "none",
    backgroundColor: "#FEF48C",
    color: "white",
    fontFamily: "Bungee",
    fontSize: "24px",
    "webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
    width: "90%",
    margin: "auto",
    marginBottom: "13px",
});
const spring = {
    type: "spring",
    stiffness: 3000,
    damping: 4,
};

const SubmitButton = ({ children, ...props }) => {
    return (
        <StyledSubmitButton
            animate={{ backgroundColor: "#414CA6" }}
            whileTap={{
                boxShadow: "5px 5px 1px 0px rgb(17 3 202 / 76%)",
                color: "#ffff",
                backgroundColor: "#ea9b9b",
            }}
            children={children}
            {...props}
        />
    );
};

export { FieldSet, Form, SubmitButton };
