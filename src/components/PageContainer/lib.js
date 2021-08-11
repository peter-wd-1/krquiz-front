import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";
import background from "image/backgroundimage.png";
const Page = styled("div")({
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    "@media (max-width: 800px)": {
        width: "100%",
    },

    "@media (min-width: 1200px)": {
        width: "35%",
    },
    "@media (min-width: 1500px)": {
        width: "25%",
    },
});

export { Page };
