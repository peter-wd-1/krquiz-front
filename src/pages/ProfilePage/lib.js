import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled/macro";
import profileImage from "image/alphabet/P.png";
import logoutIcon from "image/logout.png";
import scoreIcon from "image/scoreIcon.png";
import chanceIcon from "image/playIcon.png";
import shareIcon from "image/Network.png";
import Div100vh from "react-div-100vh";
import flipIcon from "image/fliptoback.png";
import { SocialMediaButtons } from "components/modal/SotialMediaShareButton";

const StyledProfileContainer = styled("div")({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#9EF0F0",
});

const ProfileContainer = ({ children }) => {
    return (
        <Div100vh>
            <StyledProfileContainer children={children}>
                <div
                    style={{
                        zIndex: "100",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    {children}
                </div>
                <BackBlob />
            </StyledProfileContainer>
        </Div100vh>
    );
};

const StyledBlob = styled(motion.div)({
    position: "absolute",
    top: "-300px",
    right: "-30px",
    width: "700px",
    zIndex: "1",
});

const BackBlob = () => {
    return (
        <StyledBlob
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15 }}
        >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="white"
                    d="M56.3,-46.7C66.9,-31.6,65.2,-8.5,58.9,11.1C52.5,30.7,41.4,46.8,23.8,58.9C6.2,71,-17.8,79,-34.4,71.1C-51,63.3,-60.1,39.5,-61.8,18.1C-63.5,-3.4,-57.9,-22.5,-46.4,-37.8C-34.8,-53.1,-17.4,-64.6,2.7,-66.8C22.8,-68.9,45.7,-61.8,56.3,-46.7Z"
                    transform="translate(100 100)"
                />
            </svg>
        </StyledBlob>
    );
};

const BackBlob2 = () => {
    return (
        <StyledBlob
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15 }}
        >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#0F62FE"
                    d="M30.2,-46.4C36.3,-37.1,36.6,-24.5,44.4,-11.8C52.2,1,67.5,13.9,66.7,23.3C65.8,32.6,48.9,38.3,35.1,41.2C21.3,44,10.7,44,-2,46.8C-14.7,49.6,-29.4,55.2,-39.8,51.2C-50.1,47.2,-56.2,33.7,-56.3,21.2C-56.5,8.6,-50.8,-3,-44.2,-11.6C-37.7,-20.3,-30.3,-25.9,-22.8,-34.8C-15.2,-43.7,-7.6,-55.9,2.2,-58.9C12,-61.9,24,-55.8,30.2,-46.4Z"
                    transform="translate(100 100)"
                />
            </svg>
        </StyledBlob>
    );
};

const StyledButton = styled(motion.button)({
    height: "40px",
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
    boxShadow: "5px 5px 0px 0px #493fd6",
});

const NewQuizButton = ({ children, ...props }) => {
    return (
        <StyledButton
            initial={{ x: 200 }}
            animate={{
                backgroundColor: "#FEF48C",
                color: "#414CA6",
                x: 0,
            }}
            whileTap={{
                boxShadow: "0px 0px 0px 0px #493fd6",
                color: "#ffff",
                backgroundColor: "#ea9b9b",
            }}
            children={children}
            {...props}
        />
    );
};

export const MenuBar = ({}) => {
    return (
        <div>
            <LogoutButton />
        </div>
    );
};
export const LogoutButton = ({ children, ...props }) => {
    return (
        <StyledButton
            style={{
                backgroundColor: "#FEF48C",
                position: "absolute",
                bottom: "10px",
                right: "5%",
                width: "130px",
            }}
            animate={{ backgroundColor: "#2a62ff" }}
            whileTap={{
                boxShadow: "0px 0px 0px 0px #493fd6",
                color: "#ffff",
                backgroundColor: "#ea9b9b",
            }}
            children={children}
            {...props}
        >
            {children ? (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={logoutIcon}
                        style={{
                            paddingLeft: "10px",
                            transform: "rotateY(180deg)",
                            height: "50%",
                        }}
                    />
                    {children}
                </div>
            ) : (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    LOGOUT
                    <img
                        src={logoutIcon}
                        style={{ height: "50%", paddingLeft: "10px" }}
                    />
                </div>
            )}
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
                    Hi, <strong>{profileInfo.name}</strong> 🖖{" "}
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
    color: "#1d1081",
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
    fontSize: "15px",
    padding: "2px",
    whiteSpace: "nowrap",
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
    boxShadow: "9px 9px 0px 0px #493fd6",
    padding: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundColor: "white",
    color: "",
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
                    marginBottom: "5px",
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
                        marginRight: "15px",
                    }}
                />
                <h4>Your Best Score</h4>{" "}
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection: "row",
                    fontSize: "24px",
                    padding: "0px",
                    margin: "0px",
                    marginBottom: "5px",
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
                /100<h6>points</h6>
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
    backgroundColor: "white",
});

export const ChancesInfo = ({ chancesAvailable, chancesUsed, onHelpClick }) => {
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
                        marginRight: "15px",
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

            <motion.div
                style={{
                    position: "absolute",
                    bottom: "0",
                    right: "10px",
                    textDecoration: "underline",
                }}
                onClick={() => {
                    onHelpClick(true);
                }}
            >
                <h6>Want more chances?</h6>
            </motion.div>
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
    padding: "0",
    boxShadow: "9px 9px 0px 0px #493fd6",
    backgroundColor: "white",
});

const variants = {
    help: {
        rotateX: 360,
    },
    closed: {
        ratateX: 0,
    },
};

export const ShareInfo = ({
    raiseChance,
    availableShare,
    onHelpShare,
    isHelpShare,
}) => {
    const [isLoading, setLoading] = useState(false);
    const share = (link) => {
        raiseChance({ value: true, link });
        setLoading(true);
    };
    return (
        <ShareInfoContainer
            initial={{ rotateX: 0, transformPerspective: 8000 }}
            animate={isHelpShare ? "help" : "closed"}
            variants={variants}
        >
            {isHelpShare ? (
                <div
                    style={{
                        width: "100%",
                        padding: "10px",
                        paddingLeft: "40px",
                    }}
                >
                    <h4 style={{ textAlign: "left" }}>
                        Share to get more chances
                    </h4>
                    <h5 style={{ textAlign: "left" }}>You have shared:</h5>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            flexDirection: "row",
                            fontSize: "24px",
                            padding: "0px",
                            margin: "0px",
                            marginBottom: "5px",
                        }}
                    >
                        <h1
                            style={{
                                fontFamily: "BunGee",
                                padding: "0px",
                                margin: "0px",
                                fontSize: "50px",
                            }}
                        >
                            {availableShare}
                        </h1>
                        /3
                    </div>
                    <img
                        style={{
                            position: "absolute",
                            width: "30px",
                            bottom: "5px",
                            right: "5px",
                        }}
                        src={flipIcon}
                        onClick={() => {
                            onHelpShare(false);
                        }}
                    />
                </div>
            ) : (
                <div style={{ padding: "10px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            padding: "0px",
                            margin: "0px",
                            marginBottom: "5px",
                        }}
                    >
                        <h4 style={{ margin: "0" }}>Share With Us</h4>
                        <h6 style={{ margin: "0" }}>
                            {" "}
                            🌟 and earn more chances up to 5 times! 🌟{" "}
                        </h6>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {!isLoading
                            ? SocialMediaButtons.map((item, index) => {
                                  return (
                                      <button
                                          onClick={(e) => {
                                              share(item.url);
                                          }}
                                          style={{
                                              padding: "5px",
                                              backgroundColor: "white",
                                          }}
                                      >
                                          <img src={item.image} />
                                      </button>
                                  );
                              })
                            : ""}
                    </div>
                    <img
                        style={{
                            position: "absolute",
                            width: "30px",
                            bottom: "5px",
                            right: "5px",
                        }}
                        src={flipIcon}
                        onClick={() => {
                            onHelpShare(true);
                        }}
                    />
                </div>
            )}
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
