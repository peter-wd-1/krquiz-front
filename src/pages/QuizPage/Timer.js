import React, { useState, useEffect, useRef } from "react";
import { TimerText } from "./lib";
import Moment from "react-moment";
function Timer(props) {
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSecents] = useState(1);
    const [stop, setStop] = useState(false);
    useInterval(() => {
        if (!stop) {
            const serverTestEnd = new Date(props.ended);
            const now = new Date();
            props.onCount(serverTestEnd - now);
        }
    }, 1000);

    useEffect(() => {
        const date = new Date(props.counter);
        setMinutes(date.getMinutes());
        setSecents(date.getSeconds());
        //시간 검증

        if (props.counter < 0) {
            props.timeUp(true);
            setStop(true);
        }
    }, [props.counter]);

    return (
        <div>
            <TimerText>
                {minutes} : {seconds}
            </TimerText>
        </div>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
export { Timer };
