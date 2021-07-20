import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";
import background from "image/backgroundimage.jpg";
const Page = styled("div")({
    backgroundImage: `url(${background})`,
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    height: "100%",
    width: "100vw",
});

export { Page };
