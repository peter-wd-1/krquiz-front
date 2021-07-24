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
    "@media (max-width: 600px)": {
        width: "100%",
    },
    "@media (min-width: 600px)": {
        width: "30%",
    },
});

export { Page };
