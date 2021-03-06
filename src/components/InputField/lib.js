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
    height: "50px",
    border: "2px Solid #414CC2",
    boxShadow: "0px 11px 20px 0px rgb(0 32 86 / 21%)",
    width: "100%",
    borderradius: "10px",
    "-webkit-appearance": "none",
    borderRadius: "4px",
    padding: "10px",
    boxSizing: "border-box",
    color: "#0c047b",
    fontFamily: "Montserrat",
    fontSize: "18px",
    // ":focus": {
    //     border: "4px Solid Orange",
    // },
});

const Input = (props) => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {props.phoneLable ? (
                <div
                    style={{
                        zIndex: "2",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        width: "30%",
                        height: "50px",
                        whiteSpace: "nowrap",
                        color: "gray",
                    }}
                >
                    🇺🇸 +1
                </div>
            ) : (
                ""
            )}
            <StyledInput {...props} />
        </div>
    );
};

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
        width: "90%",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "15px",
        fontFamily: "Montserrat",
    }
    // ({ isValid }) =>
    //     isValid
    //         ? {
    //               display: "none",
    //           }
    //         : {
    //               display: "block",
    //           }
);

const messageVarient = {
    open: { height: "auto" },
    close: { backgroundColor: "#2bedb7", color: "#414CA6", height: "auto" },
};
const InvalidMessage = ({ isValid, children }) => {
    return (
        <StyledInvalidMessage
            initial={{ height: 0 }}
            animate={isValid ? "close" : "open"}
            /* isValid={isValid} */
            variants={messageVarient}
            children={children}
        />
    );
};

const StyledInputContainer = styled(motion.div)({
    display: "flex",
    flexDirection: "column",
    paddingTop: "5px",
    paddingBottom: "5px",
    alignItems: "center",
    width: "100%",
});

const InputContainer = ({ children }) => {
    return (
        <StyledInputContainer
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            children={children}
        />
    );
};
const StyledVerifyPhoneButton = styled(motion.button)({
    backgroundColor: "#414CA6",
    color: "white",
    padding: "10px",
    width: "90%",
    fontFamily: "Montserrat",
    boxShadow: "5px 5px 0px 0px #0c047b",
});

export const VerifyPhoneButton = ({ onClick }) => {
    return (
        <StyledVerifyPhoneButton
            initial={{ height: "0" }}
            animate={{ height: "auto" }}
            whileTap={{
                boxShadow: "0px 0px 0px 0px #0c047b",
            }}
            onClick={onClick}
        >
            Send Verification Code
        </StyledVerifyPhoneButton>
    );
};

export { Input, Label, PhoneInput, InvalidMessage, InputContainer };
