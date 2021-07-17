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

const StyledInput = styled(motion.input)({
    height: "40px",
    border: "none",
    boxShadow: "0px 11px 20px 0px rgb(0 32 86 / 21%)",
    width: "100%",
    borderRadius: "10px",
    marginBottom: "4px",
});
const Input = motionWrapper(StyledInput, {});

const StyledLabel = styled(motion.label)({
    display: "flex",
    flexDirection: "column",
    fontFamily: "Bungee Shade",
    color: "blue",
    padding: "3px",
    width: "100%",
    alignItems: "baseline",
    fontSize: "1.3em",
});
const Label = motionWrapper(StyledLabel);

const StyledPhoneInput = styled(motion.input)({
    width: "100%",
});
const PhoneInput = motionWrapper(StyledPhoneInput, {});

const StyledInvalidMessage = styled(motion.div)(
    {
        color: "white",
        backgroundColor: "#ed2b88",
        width: "100%",
    },
    ({ isValid }) =>
        isValid
            ? {
                  display: "none",
              }
            : {
                  display: "block",
              }
);

const InvalidMessage = ({ isValid, children }) => {
    return <StyledInvalidMessage isValid={isValid} children={children} />;
};

const InputContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    paddingTop: "5px",
    paddingBottom: "5px",
    alignItems: "center",
    marginBottom: "10px",
});

export { Input, Label, PhoneInput, InvalidMessage, InputContainer };
