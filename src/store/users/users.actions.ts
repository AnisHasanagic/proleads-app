import { toast } from "react-toastify";
import UsersService from "./users.service";
import usersSlice from "./users.slice";

const {
    loading,
    loadSuccess,
    loadFailed,
    createAccountError,
    createAccountSuccess
} = usersSlice.actions;

export const loadUsers = (): any => async (dispatch: any) => {
    try {
        dispatch(loading());

        const response = await UsersService.getAll();

        let data: any = null;

        try {
            data = await response.clone().json();
        } catch {
            data = await response.clone().text();
        }

        if (response.ok) {
            dispatch(loadSuccess({ list: data.users }));
        } else {
            dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
        }
    } catch (e: any) {
        dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
    }
};
export const createAccount =
    (user:any): any =>
    async (dispatch: any) => {
        try {
            dispatch(loading());

            const response = await UsersService.createUser({
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
