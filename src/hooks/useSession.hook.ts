import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import { AppDispatch, RootState } from "../store/store";
import { logout, setSession, signin } from "../store/slices/session";


function useSession() {

    const { isAuthenticate, nickname } = useSelector(
        (state: RootState) => state.session);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const reUseSessionActive = async (token: string) => {
        const decoded: TokenSession = jwtDecode(token);
        await dispatch(setSession({ isAuthenticate: true, nickname: decoded.sub, role: decoded.role, permissions: decoded.services }));
        await navigate('/');
    }

    const handleSignIn = (credentials: { nickname: string, password: string }) => {
        return dispatch(signin(credentials, navigate));
    }

    const handleLogout = (nickname: string) => {
        return dispatch(logout(nickname, navigate));
    }

    useLayoutEffect(() => {
        let token: string | null = localStorage.getItem("token");
        if (token) reUseSessionActive(token);
    }, []);

    return {
        isAuthenticate,
        nickname,
        handleSignIn,
        handleLogout
    }
}

export default useSession;