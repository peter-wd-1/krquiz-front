import React, { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { PrograssBarContainer, Bar } from "./lib";
//import { ApiContext } from "components/PageContainer/Context";

function PrograssBar(props) {
    const [counter, setCounter] = useState(1);

    return (
        <PrograssBarContainer>
            <Timer
                tp={props.setTimeup}
                ended={props.ended}
                counter={counter}
                onCount={setCounter}
            />
            <Bar counter={counter / 1000} />
        </PrograssBarContainer>
    );
}

export { PrograssBar };
