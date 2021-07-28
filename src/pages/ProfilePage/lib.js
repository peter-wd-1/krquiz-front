import React, { Suspense } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";
import profileImage from "image/alphabet/P.png";
const StyledProfileContainer = styled("div")({
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
});

const ProfileContainer = ({ children }) => {
    return <StyledProfileContainer children={children} />;
};

const NewQuizButton = styled("div")({});

const StyledUserInfo = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
});

const UserInfo = ({ children }) => {
    return <StyledUserInfo children={children} />;
};

const StyledImage = styled(motion.img)({
    height: "70px",
    width: "70px",
});

// const Image = ({ children, ...props }) => {
//     return (
//         <StyledImage
//             animate={{ rotate: 360 * 3 }}
//             transition={spring}
//             {...props}
//         />
//     );
// };

const ProfilePageText = styled("div")({
    fontFamily: "Montserrat",
});

const StyledProfileImage = styled(motion.img)({
    backgroundColor: "#FFDF5E",
    borderRadius: "20px",
    padding: "10px",
    boxSizing: "border-box",
    height: "50px",
    width: "50px",
});

const spring = {
    type: "spring",
    stiffness: 2000,
    damping: 30,
};

const ProfileImage = ({ children, initial }) => {
    return (
        <StyledProfileImage
            src={profileImage}
            hildren={children}
            transition={spring}
        />
    );
};
export {
    ProfileContainer,
    NewQuizButton,
    UserInfo,
    ProfilePageText,
    ProfileImage,
};
