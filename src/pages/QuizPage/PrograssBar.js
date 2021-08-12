import React, { useState } from "react";
import { Bar, PrograssBarContainer, TimerText, QuizNumberContainer } from "./lib";
import { Timer } from "./Timer";
//import { ApiContext } from "components/PageContainer/Context";

function PrograssBar(props) {
    const [counter, setCounter] = useState(new Date());

    return (
        <PrograssBarContainer>
          <QuizNumberContainer>
              <TimerText style={{ fontSize: "25px" , lineHeight:"25px", marginTop:"14px"}}>
                {props.solvedCount}
              </TimerText>
              <div style={{ fontSize: "15px" }}>/20</div>
          </QuizNumberContainer>
          <Bar counter={counter / 1000}>
            <Timer
              timeUp={props.setTimeup}
              ended={props.ended}
              counter={counter}
              onCount={setCounter}
            />
          </Bar>
        </PrograssBarContainer>
    );
}

export { PrograssBar };
