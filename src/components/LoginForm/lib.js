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

const Form = styled("from")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

const StyledFieldSet = styled(motion.fieldset)({
    backgroundColor: "white",
    display: "flex",
    width: "80vw",
    flexDirection: "column",
});
const FieldSet = motionWrapper(StyledFieldSet, {});

export { FieldSet, Form };
