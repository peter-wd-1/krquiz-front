import React from "react";
import { QuestionContainer, AnswerContainer, QuizContainer } from "./lib";
function Quiz(props) {
    return (
        <QuizContainer key={props.quiz.id}>
            <QuestionContainer
                index={props.index}
                content={props.quiz.content}
            />
            <AnswerContainer
                onChangeAnswer={props.onChangeAnswer}
                quiz={props.quiz}
                answerChosen={props.answerChosen}
                onChosen={props.onChosen}
                isChosen={props.isChosen}
            />
        </QuizContainer>
    );
}

export { Quiz };
