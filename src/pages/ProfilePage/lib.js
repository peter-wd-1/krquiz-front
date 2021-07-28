import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";
const StyledProfileContainer = styled("div")({
    backgroundColor: "white",
    display: "flex",
});

const ProfileContainer = ({ children }) => {
    return <StyledProfileContainer children={children} />;
};
export { ProfileContainer };
