import React, { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { PrograssBarContainer, Bar, TimerText } from "./lib";
//import { ApiContext } from "components/PageContainer/Context";

function PrograssBar(props) {
    const [counter, setCounter] = useState(new Date());

    return (
        <PrograssBarContainer>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                }}
            >
                <TimerText style={{ fontSize: "25px" }}>
                    {props.solvedCount}
                </TimerText>
                <div style={{ fontSize: "15px" }}>/20</div>
            </div>
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
