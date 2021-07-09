import React from "react";
import { motion } from "framer-motion";

function Input({ items }) {
    return (
        <motion.fieldset>
            {items.map((item, index) => (
                <label key={index}>
                    <p>{item.name}</p>
                    <input
                        type={item.type}
                        name={item.name}
                        onChange={item.onChange}
                    />
                </label>
            ))}
        </motion.fieldset>
    );
}

export default Input;
