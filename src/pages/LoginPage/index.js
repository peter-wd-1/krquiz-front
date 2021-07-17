import React, { useContext } from "react";
import { LoginForm } from "components/LoginForm";
import { H1 } from "pages/LoginPage/lib";

function LoginPage() {
    return (
        <div>
            <header>
                <H1>Let Us Let You In!</H1>
            </header>
            <LoginForm />
        </div>
    );
}

export { LoginPage };
