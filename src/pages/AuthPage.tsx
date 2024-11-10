import { useState } from "react";

import { Box } from "@mui/material";

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
                    <Box mt={2}>
                        <a onClick={handleShowSignUp}>¿No tienes una cuenta? Regístrate aquí</a>
                    </Box>
                    <Box mt={2}>
                        <a onClick={handleShowLogin}>¿Olvidaste tu contraseña?</a>
                    </Box>
                </div>
            )
            }
            {
                showSignUp && (
                    <div>
                        <SignUpFormComponent handleShowLogin={handleShowLogin} />
                        <Box mt={2}>
                            <a onClick={handleShowLogin}>¿Ya tienes una cuenta? Inicia sesión aquí</a>
                        </Box>
                    </div>
                )
            }
        </div >
    );
}

export default AuthPage;