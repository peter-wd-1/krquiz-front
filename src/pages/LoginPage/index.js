import React, { useContext } from "react";
import { LoginForm } from "components/LoginForm";
import { LogoutButton } from "pages/ProfilePage/lib";
import xicon from "image/xicon.png";
function LoginPage() {
    return (
        <div>
            <LoginForm />
            <LogoutButton
                style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "5%",
                    width: "130px",
                }}
                onClick={() => {
                    localStorage.removeItem("landingVisit");
                    window.location.reload(false);
                }}
            >
                home
            </LogoutButton>
        </div>
    );
}

export { LoginPage };
