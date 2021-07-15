import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";

const motionWrapper = (StyledComponent, motionProps) => (props) => {
    return (
        <StyledComponent {...motionProps} {...props}>
            {props.children}
        </StyledComponent>
    );
};
// const Ul = motionWrapper(StyledUl, {
//     animate: {
//         scale: 1.3,
//     },
// });

const StyledUl = styled(motion.ul)(
    {
        backgroundColor: "#fff",
        height: "200px",
        width: "100%",
        overflowY: "scroll",
        position: "absolute",
        margin: 0,
        padding: "5px",
        boxShadow: "-1px 15px 34px -21px rgba(0,32,86,0.21)",
        boxSizing: "border-box",
        borderRadius: "8px",
        zIndex: 9999,
    },
    ({ isOpen }) =>
        isOpen
            ? {
                  display: "flex",
                  flexDirection: "column",
              }
            : {
                  display: "none",
              }
);

const spring = {
    type: "spring",
    stiffness: 1000,
    damping: 30,
};

const Ul = ({ isOpen, children }) => {
    return (
        <StyledUl
            isOpen={isOpen}
            variants={{
                open: { scale: 1 },
                close: { scale: 0.7 },
            }}
            animate={isOpen ? "open" : "close"}
            transition={spring}
            children={children}
        />
    );
};

const Container = styled("div")({
    position: "relative",
});

export { Ul, Container };
