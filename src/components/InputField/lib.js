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

const StyledInput = styled(motion.input)({});
const Input = motionWrapper(StyledInput, {});

const StyledLabel = styled(motion.label)({
    display: "flex",
    flexDirection: "row",
    fontFamily: "Bungee Shade",
    color: "blue",
});
const Label = motionWrapper(StyledLabel);

const StyledPhoneInput = styled(motion.input)({});
const PhoneInput = motionWrapper(StyledPhoneInput, {});

export { Input, Label, PhoneInput };
