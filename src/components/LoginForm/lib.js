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

const StyledForm = styled(motion.form)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
});

const Form = ({ children }) => {
    return <StyledForm children={children} />;
};

const StyledFieldSet = styled(motion.fieldset)({
    display: "flex",
    width: "90%",
    flexDirection: "column",
    border: "4px solid #2F3075",
    backgroundColor: "white",
    padding: "0",
});

// initial={{
//     y: 200,
//     scale: 0.8,
//     opacity: 0,
//     rotateX: -80,
//     transformPerspective: 1000,
// }}
// animate={{
//     y: 0,
//     scale: 1,
//     opacity: 1,
//     rotateX: 0,
//     transformPerspective: 1000,
//     boxShadow: [
//         "0px 0px 0px 0px rgb(12 4 123 / 76%)",
//         "12px 12px 0px 0px rgb(12 4 123 / 76%)",
//     ],
// }}
// transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2, delay: 1 }}

const FieldSet = ({ children }) => {
    return (
        <StyledFieldSet
            initial={{
                y: 300,
                scale: 0.8,
                opacity: 0,
                rotateX: -80,
                transformPerspective: 1000,
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                rotateX: 0,
                transformPerspective: 1000,
                boxShadow: "12px 12px 0px 0px rgb(12 4 123 / 76%)",
            }}
            transition={{ delay: 0.4 }}
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
                color: "Yellow",
                backgroundColor: "#ea9b9b",
            }}
            children={children}
            {...props}
        />
    );
};

export { FieldSet, Form, SubmitButton };
