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
    marginBottom: "10px",
    height: "50px",
    border: "2px Solid #414CC2",
    boxShadow: "0px 11px 20px 0px rgb(0 32 86 / 21%)",
    width: "100%",
    borderradius: "10px",
    "-webkit-appearance": "none",
    borderRadius: "4px",
    padding: "10px",
    boxSizing: "border-box",
    // ":focus": {
    //     border: "4px Solid Orange",
    // },
});

const Input = motionWrapper(StyledInput, {});

// const Input = styled.input`
//     height: 40px;
//     border: none;
//     box-shadow: 0px 11px 20px 0px rgb(0 32 86 / 21%);
//     width: 100%;
//     borderradius: 10px;
//     marginbottom: 4px;
//     -webkit-appearance: none;
// `;
const StyledLabel = styled(motion.label)({
    display: "flex",
    flexDirection: "column",
    fontFamily: "Bungee",
    color: "#414CC2",
    width: "90%",
    alignItems: "baseline",
    fontSize: "0.8em",
});

const Label = motionWrapper(StyledLabel);

const StyledPhoneInput = styled(motion.input)({
    width: "100%",
    height: "40px",
    border: "none",
    boxShadow: "0px 11px 20px 0px rgb(0 32 86 / 21%)",
    width: "100%",
    borderradius: "10px",
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
    width: "100%",
});

export { Input, Label, PhoneInput, InvalidMessage, InputContainer };
