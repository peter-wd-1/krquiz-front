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

const H1 = styled("h1")({
    fontFamily: "Bungee Shade",
});

export { H1 };
