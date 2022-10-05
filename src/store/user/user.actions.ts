import { removeToken, storeToken } from "../../utils/helpers";
import AuthService from "./user.service";
import userSlice from "./user.slice";

import { toast } from "react-toastify";

const {
    loginSuccess,
    loginError,
    loading,
    logoutSuccess,
    createAccountSuccess,
    createAccountError,
    checkUserAuthenticated,
    checkUserAuthenticatedError
} = userSlice.actions;

export const login =
    (
        username: string,
        password: string,
        navigate: any,
    ): any =>
    async (dispatch: any) => {
        try {
            dispatch(loading());

            const response = await AuthService.login({
                username,
                password,
            });

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                await storeToken(data.token);
                toast.success(data.message);

                const user = data.data.user;

                dispatch(loginSuccess({ token: data.token, user }));
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(loginError(error));
            }
        } catch (e: any) {
            toast.error("LOGIN_ERROR");
            return dispatch(
                loginError({ message: "LOGIN_ERROR", errors: null })
            );
        }
    };

    export const createAccount =
    (user:any): any =>
    async (dispatch: any) => {
        try {
            dispatch(loading());

            const response = await AuthService.createUser({
                user
            });

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                toast.success(data.message);
                

                return dispatch(createAccountSuccess());
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(createAccountError(error));
            }
        } catch (e: any) {
            toast.error("REGISTRATION_ERROR");
            return dispatch(
                createAccountError({
                    message: "REGISTRATION_ERROR",
                    errors: null,
                })
            );
        }
    };

    export const logout = (): any => async (dispatch: any) => {
        try {
            dispatch(loading());
    
            await removeToken();
            toast.success("SUCCESSFUL_LOGOUT");
    
            return dispatch(logoutSuccess());
        } catch (e: any) {
            return console.error(e.message);
        }
    };

    export const checkIfUserIsAuthenticated = (): any => async (dispatch: any) => {
        try {
            const response = await AuthService.checkAuthenticated();
    
            let data: any = null;
    
            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }
    
            if (response.ok) {
                const user = data.data.user;
    
                dispatch(loginSuccess({ token: localStorage.getItem('access_token'), user }));
            } else {
                dispatch(checkUserAuthenticatedError());
            }
        } catch (e: any) {
            dispatch(checkUserAuthenticatedError());
        }
    };


