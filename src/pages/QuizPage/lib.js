import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled/macro";

export const QuizContainer = styled(motion.div)({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
});
export const QuestionContainer = (props) => {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.07 }}
            style={{
                fontFamily: "Montserrat",
                lineHeight: "35px",
                padding: "20px",
                dispaly: "flex",
                flexDirection: "column",
                textAlign: "left",
                alignItems: "flex-start",
                justifyContent: "center",
                fontSize: "20px",
                display: "flex",
                height: "auto",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                    width: "40px",
                    fontWeight: "900",
                    fontSize: "24px",
                    marginBottom: "5px",
                    border: "solid black 3px",
                }}
            >
                {props.index}
            </div>
            <div>{props.content}</div>
        </motion.div>
    );
};

const StyledRadioInput = styled(motion.input)({
    display: "none",
});

export const AnswerContainer = (props) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                backgroundColor: "#46ffcc",
            }}
        >
            {props.quiz.answers.map((item, index) => {
                return (
                    <AnimatePresence>
                        <motion.label
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: -40,
                                },
                                visible: (i) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: 0.1 + i * 0.05,
                                    },
                                }),
                                chosen: (i) => ({
                                    opacity: 1,
                                    y: -40,
                                    transition: {
                                        delay: i * 0.05,
                                    },
                                }),
                                thisAnswerChosen: (i) => ({
                                    opacity: [1, 0, 1, 0, 1],
                                    backgroundColor: "#3c51fd",
                                    color: "white",
                                    transition: {
                                        duration: 0.5,
                                    },
                                }),
                            }}
                            custom={index}
                            initial="hidden"
                            animate={
                                props.isChosen
                                    ? item.uuid ===
                                      props.answerChosen[props.quiz.id]
                                        ? "thisAnswerChosen"
                                        : "chosen"
                                    : "visible"
                            }
                            exit={{ height: 0 }}
                            style={{
                                border: "solid 3px #2F3075",
                                opacity: "0",
                                display: "flex",
                                alignItems: "center",
                                padding: "15px",
                                textAlign: "left",
                                backgroundColor: "white",
                                color: "black",
                                fontSize: "17px",
                                fontFamily: "Montserrat",
                                fontWeight: "400",
                                boxShadow: "5px 5px 0px 0px #414CA6",
                                height: "auto",
                                width: "90%",
                                marginTop: "5px",
                            }}
                            whileTap={{
                                boxShadow: "0px 0px 0px 0px #414CA6",
                            }}
                        >
                            <StyledRadioInput
                                type="radio"
                                name={props.quiz.id}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        props.onChangeAnswer((prevState) => {
                                            return {
                                                ...prevState,
                                                [props.quiz.id]: item.uuid,
                                            };
                                        });
                                        props.onChosen(true);
                                    }
                                }}
                                checked={
                                    item.uuid ===
                                    props.answerChosen[props.quiz.id]
                                }
                            />
                            {item.content}
                        </motion.label>
                    </AnimatePresence>
                );
            })}
        </div>
    );
};
const StyledBar = styled(motion.div)(
    {
        border: "2px solid #2F3075",
        backgroundColor: "#46ffcc",
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
        borderLeft: "none",
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
    // Segoe UI,
    padding: "15px",
    fontFamily: "Montserrat",
    border: "none",
    color: "#414CA6",
    backgroundColor: "#46ffcc00",
    textTransform: "uppercase",
});

export const NextButton = ({ onClick }) => {
    return (
        <StyledNextButton
            onClick={onClick}
            initial={{
                y: 60,
                scale: 0.8,
                opacity: 0,
                rotateX: -80,
                transformPerspective: 1000,
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                rotateX: 0,
                transformPerspective: 1000,
            }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
        >
            NEXT →
        </StyledNextButton>
    );
};

export const FinishButton = ({ onClick }) => {
    return (
        <StyledNextButton
            initial={{
                y: 60,
                scale: 0.8,
                opacity: 0,
                rotateX: -80,
                transformPerspective: 1000,
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                rotateX: 0,
                transformPerspective: 1000,
            }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
            style={{
                opacity: "0",
                fontWeight: "700",
            }}
            onClick={onClick}
        >
            FINISH
        </StyledNextButton>
    );
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
export { PrograssBarContainer, Bar, TimerText };
