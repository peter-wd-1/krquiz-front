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
        border: "2px solid #2F3075",
        backgroundColor: "#42bbb5",
        position: "absolute",
    },
    ({ counter, barHeight }) => ({
        width: `${1200 < counter ? 100 : Math.floor((counter / 1200) * 100)}%`,
        height: barHeight,
    })
);

const StyledBarBackground = styled(motion.div)(
    {
        backgroundColor: "lightgray",
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "2px dotted #2F3075",
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
    height: "100%",
    width: "100%",
    backgroundColor: "white",
});
const Bar = (props) => {
    return (
        <>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "baseline",
                    alignItems: "flex-end",
                }}
            >
                <div
                    style={{
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        padding: "0",
                        margin: "0",
                        textAlign: "left",
                        width: "100%",
                    }}
                >
                    Time left
                </div>
                {props.children}
            </div>
            <StyledBarContainer id="bar">
                <StyledBarBackground barHeight="8px">
                    <StyledBar counter={props.counter} barHeight="10px" />
                </StyledBarBackground>
            </StyledBarContainer>
        </>
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
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
});

const TimerText = styled("h1")({
    fontSize: "20px",
    fontFamily: "Montserrat",
});
export { QuizeContainer, PrograssBarContainer, Bar, TimerText };
