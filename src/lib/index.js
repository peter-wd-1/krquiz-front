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
    whileTap: {
        scale: 0.9,
    },
});

const StyledLabel = styled(motion.label)({});
const Label = motionWrapper(StyledLabel);

const StyledFeildSet = styled(motion.label)({});
const FeildSet = motionWrapper(StyledFeildSet);

export { Input, Label, FeildSet };
