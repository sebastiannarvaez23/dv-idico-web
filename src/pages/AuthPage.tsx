import { useState } from "react";
import LoginFormComponent from "../components/auth/SignInFormComponent";
import SignUpFormComponent from "../components/auth/SignUpFormComponent";

const AuthPage = () => {
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
                    <a onClick={handleShowSignUp}>¿No tienes una cuenta? Regístrate aquí</a>
                </div>
            )}
            {showSignUp && (
                <div>
                    <SignUpFormComponent handleShowLogin={handleShowLogin} />
                    <a onClick={handleShowLogin}>¿Ya tienes una cuenta? Inicia sesión aquí</a>
                </div>
            )}
        </div>
    );
}

export default AuthPage;