import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";
import background from "image/backgroundimage.png";
const Page = styled("div")({
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
});

export { Page };
