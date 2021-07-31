import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";

const QuizeContainer = styled(motion.div)({
    display: "flex",
    flexDirection: "column",
    marginTop: "14%",
});
const StyledBar = styled(motion.div)(
    {
        backgroundColor: "#fff57a",
        position: "fixed",
        right: "0",
    },
    ({ counter, barHeight }) => ({
        width: `${Math.floor((counter / 1200) * 100)}%`,
        height: barHeight,
    })
);

const StyledBarBackground = styled(motion.div)(
    {
        backgroundColor: "#82790f",
        position: "relative",
    },
    ({ barHeight }) => ({
        height: barHeight,
    })
);

const StyledBarContainer = styled("div")({
    width: "100%",
});

export const QuizPageContainer = styled("div")({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "90%",
    width: "90%",
    backgroundColor: "white",
});
const Bar = (props) => {
    return (
        <StyledBarContainer>
            <StyledBarBackground barHeight="10px">
                <StyledBar counter={props.counter} barHeight="10px" />
            </StyledBarBackground>
        </StyledBarContainer>
    );
};

const StyledNextButton = styled(motion.button)({
    padding: "15px",
    marginBottom: "5px",
    fontFamily: "Bungee",
    border: "none",
    color: "white",
    backgroundColor: "#414CA6",
    textTransform: "uppercase",
});

const NextButton = ({}) => {
    return <StyledNextButton>next</StyledNextButton>;
};

const PrograssBarContainer = styled("div")({
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "80px",
    backgroundColor: "#414CA6",
    alignItems: "center",
    justifyContent: "center",
});

const TimerText = styled("h1")({
    color: "white",
    fontSize: "20px",
    fontFamily: "Montserrat",
});
export { QuizeContainer, PrograssBarContainer, Bar, TimerText };
