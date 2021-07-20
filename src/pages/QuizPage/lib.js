import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";

const QuizeContainer = styled(motion.div)({
    display: "flex",
    flexDirection: "column",
});
const StyledBar = styled(motion.div)(
    {
        height: "10px",
        backgroundColor: "black",
    },
    ({ counter }) => ({
        width: `${Math.floor((counter / 1200) * 100)}%`,
    })
);

const StyledBarContainer = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    width: "100vw",
});

export const QuizPageContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "90vh",
    width: "90vw",
    backgroundColor: "white",
});
const Bar = (props) => {
    return (
        <StyledBarContainer>
            <StyledBar counter={props.counter} />
        </StyledBarContainer>
    );
};

const PrograssBarContainer = styled("div")({
    position: "fixed",
    display: "block",
    top: "0px",
    left: "0px",
    paddingTop: "20px",
    width: "100vw",
});

const TimerText = styled("h1")({
    fontFamily: "Abril Fatface",
});
export { QuizeContainer, PrograssBarContainer, Bar, TimerText };
