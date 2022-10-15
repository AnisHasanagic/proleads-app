import { toast } from "react-toastify";
import UsersService from "./users.service";
import usersSlice from "./users.slice";

const {
    loading,
    loadSuccess,
    loadFailed,
    createAccountError,
    createAccountSuccess,
    updateLoading,
    updateError,
    updateSuccess
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
    (username:string,
        password:string,
        first_name:string,
        last_name:string,
        role:string,
        isDeleted:boolean,
        navigate:any): any =>
    async (dispatch: any) => {
        try {
            dispatch(loading());

            const response = await UsersService.createUser({
                username,
                password,
                first_name,
                last_name,
                role,
                isDeleted
            });

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                toast.success(data.message);
                navigate('/dashboard')

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

    export const updateAccount =
    (user: any, user_id: string): any =>
    async (dispatch: any) => {
        try {
            dispatch(updateLoading());

            const response = await UsersService.update(user, user_id);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(updateSuccess());
                dispatch(loadUsers());
                toast.success(data.message);
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(updateError(error));
            }
        } catch (e: any) {
            toast.error("SOMETHING_WENT_WRONG");
            return dispatch(
                updateError({ message: "SOMETHING_WENT_WRONG", errors: null })
            );
        }
    };
