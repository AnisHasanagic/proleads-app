import { removeToken, storeToken } from "../../utils/helpers";
import AuthService from "./user.service";
import userSlice from "./user.slice";

import { toast } from "react-toastify";

const {
    loginSuccess,
    loginError,
    loading,
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


