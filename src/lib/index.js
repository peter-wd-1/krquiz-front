import React from "react";
import { motion } from "framer-motion";
import { jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";

const motionWrapper = (StyledComponent, ...motionProps) => (props) => {
    return (
        <StyledComponent {...motionProps} {...props}>
            {props.children}
        </StyledComponent>
    );
};

const StyledInput = styled(motion.input)({});
const Input = motionWrapper(StyledInput);

const StyledLabel = styled(motion.label)({});
const Label = motionWrapper(StyledLabel);

export { Input, Label };
