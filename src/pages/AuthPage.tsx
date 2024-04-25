import React, { useState } from "react";
import LoginFormComponent from "../components/auth/LoginFormComponent";
import SignUpFormComponent from "../components/auth/SignUpFormComponent";

function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleShowSignUp = () => {
        setShowLogin(false);
        setShowSignUp(true);
    };

    const handleShowLogin = () => {
        setShowSignUp(false);
        setShowLogin(true);
    };

    return (
        <div>
            {showLogin && (
                <div>
                    <LoginFormComponent />
                    <a href="#" onClick={handleShowSignUp}>¿No tienes una cuenta? Regístrate aquí</a>
                </div>
            )}
            {showSignUp && (
                <div>
                    <SignUpFormComponent />
                    <a href="#" onClick={handleShowLogin}>¿Ya tienes una cuenta? Inicia sesión aquí</a>
                </div>
            )}
        </div>
    );
}

export default AuthPage;