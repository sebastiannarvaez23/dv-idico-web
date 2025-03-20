import { jwtDecode } from "jwt-decode";

import { AppDispatch } from "../../store";
import { fetchLogout, fetchSignin } from "../../../services/auth";
import { setSession } from "./sessionSlice";


export const signin = ({ nickname, password }: { nickname: string, password: string }, navigate: (path: string) => void) => {
    return async (dispatch: AppDispatch) => {
        try {
            const token = await fetchSignin(nickname, password);
            localStorage.setItem('token', token);
            const decoded: TokenSession = jwtDecode(token);
            await dispatch(setSession({ isAuthenticated: true, nickname: decoded.sub, role: decoded.role, permissions: decoded.services }));
            navigate('/');
        } catch (error: any) {
            throw error;
        }
    };
};

export const logout = (nickname: string, navigate: (path: string) => void) => {
    return async (dispatch: AppDispatch) => {
        try {
            await fetchLogout(nickname);
            localStorage.removeItem('token');
            await dispatch(setSession({ isAuthenticated: false, nickname: undefined, role: undefined, permissions: [] }));
            navigate('/auth');
        } catch (error: any) {
            throw error;
        }
    };
};