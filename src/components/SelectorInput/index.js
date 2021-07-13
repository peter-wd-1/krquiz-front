import React, { useState } from "react";
import { Ul, Container } from "./lib";
function SelectorInput({ items }) {
    const [isOpen, setIsOpen] = useState(false);
    //TODO: abstract needed flag
    const [selected, setSelected] = useState({ flag: items[0].flag });
    return (
        <Container>
            <div
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {selected.flag}
            </div>{" "}
            <Ul isOpen={isOpen}>
                {items.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                setIsOpen();
                                setSelected({
                                    flag: item.flag,
                                    flagCode: item.dial_code,
                                });
                            }}
                        >
                            {item.flag}
                        </li>
                    );
                })}
            </Ul>
        </Container>
    );
}
export { SelectorInput };
