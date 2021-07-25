import React, { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { PrograssBarContainer, Bar } from "./lib";
//import { ApiContext } from "components/PageContainer/Context";

function PrograssBar(props) {
    const [counter, setCounter] = useState(new Date());

    return (
        <PrograssBarContainer>
            <Bar counter={counter / 1000} />
            <Timer
                timeUp={props.setTimeup}
                ended={props.ended}
                counter={counter}
                onCount={setCounter}
            />
        </PrograssBarContainer>
    );
}

export { PrograssBar };
