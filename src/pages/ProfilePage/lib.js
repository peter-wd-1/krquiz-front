import React, { Suspense } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";
import profileImage from "image/alphabet/P.png";
import logoutIcon from "image/logout.png";
import scoreIcon from "image/scoreIcon.png";
import chanceIcon from "image/playIcon.png";
import Div100vh from "react-div-100vh";
import { SocialMediaButtons } from "components/modal/SotialMediaShareButton";

const StyledProfileContainer = styled("div")({
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
});

const ProfileContainer = ({ children }) => {
    return (
        <Div100vh>
            <StyledProfileContainer children={children} />
        </Div100vh>
    );
};

const StyledButton = styled(motion.button)({
    height: "50px",
    border: "none",
    backgroundColor: "#414CA6",
    color: "white",
    fontFamily: "Bungee",
    fontSize: "17px",
    "webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
    border: "2px solid black",
    paddingRight: "10px",
    paddingLeft: "10px",
    boxShadow: "5px 5px 1px 0px rgb(17 3 202 / 76%)",
});

const NewQuizButton = ({ children, ...props }) => {
    return (
        <StyledButton
            animate={{ backgroundColor: "#FEF48C", color: "#414CA6" }}
            whileTap={{
                boxShadow: "0px 0px 0px 0px rgb(17 3 202 / 76%)",
                color: "#ffff",
                backgroundColor: "#ea9b9b",
            }}
            children={children}
            {...props}
        />
    );
};

export const LogoutButton = ({ children, ...props }) => {
    return (
        <StyledButton
            style={{
                backgroundColor: "#FEF48C",
                position: "absolute",
                bottom: "10px",
                right: "10px",
            }}
            animate={{ backgroundColor: "#2a62ff" }}
            whileTap={{
                boxShadow: "0px 0px 0px 0px rgb(17 3 202 / 76%)",
                color: "#ffff",
                backgroundColor: "#ea9b9b",
            }}
            children={children}
            {...props}
        >
            {"LOGOUT "}
            <img src={logoutIcon} style={{ height: "50%" }} />
        </StyledButton>
    );
};

const StyledUserInfo = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "10px",
});

export const ProfileIntro = styled("div")({
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
});

const UserInfo = ({ profileInfo }) => {
    return (
        <div
            style={{
                display: "flex",
                padding: "10px",
                paddingLeft: "0px",
            }}
        >
            <ProfileImage />
            <StyledUserInfo>
                <ProfilePageText>
                    Hi, <strong>{profileInfo.name}</strong>🖖{" "}
                </ProfilePageText>
                <ProfilePageText style={{ fontSize: "14px" }}>
                    🇺🇸 {profileInfo.username.slice(1, 4)}-
                    {profileInfo.username.slice(4, 7)}-
                    {profileInfo.username.slice(7, 12)}
                </ProfilePageText>
            </StyledUserInfo>
        </div>
    );
};

export const ProfileHeadline = styled("h1")({
    fontFamily: "Bungee Shade",
    width: "90%",
    textAlign: "left",
});

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
    fontSize: "17px",
    padding: "2px",
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

const BestScoreContainer = styled(motion.div)({
    marginTop: "10px",
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "solid 2px black",
    width: "90%",
    boxShadow: "9px 9px 1px 0px rgb(17 3 202 / 76%)",
    padding: "20px",
});

export const BestScoreInfo = ({ score }) => {
    return (
        <BestScoreContainer>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "0px",
                    margin: "0px",
                }}
            >
                <img
                    src={scoreIcon}
                    style={{
                        height: "40px",
                        borderRadius: "100%",
                        backgroundColor: "#FFDF5E",
                        padding: "0px",
                        margin: "0px",
                    }}
                />
                <h4>Your Best Score</h4>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection: "row",
                    fontSize: "24px",
                    padding: "0px",
                    margin: "0px",
                }}
            >
                <h1
                    style={{
                        fontFamily: "BunGee",
                        padding: "0px",
                        margin: "0px",
                        marginLeft: "20px",
                        fontSize: "50px",
                    }}
                >
                    {score}
                </h1>
                /100<h6>( points )</h6>
            </div>
        </BestScoreContainer>
    );
};

const ChancesInfoContainer = styled(motion.div)({
    marginTop: "20px",
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "solid 2px black",
    width: "90%",
    boxShadow: "9px 9px 0px 0px #493fd6",
    padding: "20px",
    position: "relative",
});

export const ChancesInfo = ({ chancesAvailable, chancesUsed }) => {
    return (
        <ChancesInfoContainer>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "0px",
                    margin: "0px",
                }}
            >
                <img
                    src={chanceIcon}
                    style={{
                        height: "40px",
                        borderRadius: "100%",
                        backgroundColor: "#5effc3",
                        padding: "0px",
                        margin: "0px",
                    }}
                />
                <h4>Your Chances Left</h4>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection: "row",
                    fontSize: "24px",
                    padding: "0px",
                    margin: "0px",
                }}
            >
                <h1
                    style={{
                        fontFamily: "BunGee",
                        padding: "0px",
                        margin: "0px",
                        marginLeft: "20px",
                        fontSize: "50px",
                    }}
                >
                    {chancesAvailable - chancesUsed}
                </h1>
                {/* <h6>( used )</h6> /{chancesAvailable} <h6>( total chances )</h6> */}
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "0",
                    right: "10px",
                    textDecoration: "underline",
                }}
            >
                <h6>Want more chances?</h6>
            </div>
        </ChancesInfoContainer>
    );
};

const ShareInfoContainer = styled(motion.div)({
    marginTop: "20px",
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "solid 2px black",
    width: "90%",
    position: "relative",
    padding: "10px",
    boxShadow: "9px 9px 0px 0px #493fd6",
});

export const ShareInfo = ({ raiseChance }) => {
    const share = (link) => {
        raiseChance(true);
        window.location = link;
    };
    return (
        <ShareInfoContainer>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "0px",
                    margin: "0px",
                }}
            >
                <h4 style={{ margin: "0" }}>Share With Us</h4>
                <h6 style={{ margin: "0" }}>
                    {" "}
                    🌟 and earn more chances upto 5 times! 🌟{" "}
                </h6>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {SocialMediaButtons.map((item, index) => {
                    return (
                        <div
                            onClick={() => share(item.url)}
                            style={{ padding: "5px" }}
                        >
                            <img src={item.image} />
                        </div>
                    );
                })}
            </div>
        </ShareInfoContainer>
    );
};

export {
    ProfileContainer,
    NewQuizButton,
    UserInfo,
    ProfilePageText,
    ProfileImage,
};
