import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { jwtDecode } from "jwt-decode";

import { AppDispatch, RootState } from "../store/store";
import { logout, setSession, signin } from "../store/slices/session";

function useSession() {

    const { isAuthenticate, nickname, permissions } = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const reUseSessionActive = async (token: string) => {
        try {
            const decoded: TokenSession = jwtDecode(token);
            await dispatch(setSession({
                isAuthenticate: true,
                nickname: decoded.sub,
                role: decoded.role,
                permissions: decoded.services
            }));
        } catch (error) {
            localStorage.removeItem("token");
            dispatch(logout(nickname!, navigate));
        } finally {
            setIsLoading(false);
        }
    };

    const handleValidateAuthorization = (service: string): boolean => {
        return permissions.includes(service);
    }

    const handleSignIn = (credentials: { nickname: string, password: string }) => {
        return dispatch(signin(credentials, navigate));
    };

    const handleLogout = (nickname: string) => {
        return dispatch(logout(nickname, navigate));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) reUseSessionActive(token);
        else setIsLoading(false);
    }, []);

    return {
        isAuthenticate,
        nickname,
        isLoading,
        handleSignIn,
        handleLogout,
        handleValidateAuthorization
    };
}

export default useSession;