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

const StyledInput = styled(motion.input)({ color: "red" });
const Input = motionWrapper(StyledInput, {
    animate: {
        scale: 0.9,
    },
});

const StyledLabel = styled(motion.label)({
    display: "flex",
    flexDirection: "row",
});
const Label = motionWrapper(StyledLabel);

const StyledFieldSet = styled(motion.fieldset)({});
const FieldSet = motionWrapper(StyledFieldSet);

const StyledPhoneInput = styled(motion.input)({});
const PhoneInput = motionWrapper(StyledPhoneInput, {});

export { Input, Label, FieldSet, PhoneInput };
