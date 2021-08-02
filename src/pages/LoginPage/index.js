import React, { useContext } from "react";
import { LoginForm } from "components/LoginForm";
import { LogoutButton } from "pages/ProfilePage/lib";
import xicon from "image/xicon.png";
function LoginPage() {
    return (
        <div>
            <LoginForm />
            <LogoutButton>HOME</LogoutButton>
        </div>
    );
}

export { LoginPage };
