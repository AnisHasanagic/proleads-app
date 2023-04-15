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
    updateSuccess,
    loadingStatistics,
    loadStatisticsSuccess,
    loadStatisticsFailed,
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
            dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
        }
    } catch (e: any) {
        dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
    }
};
export const createAccount =
    (
        username: string,
        password: string,
        full_name: string,
        role: string,
        isDeleted: boolean,
        navigate: any
    ): any =>
    async (dispatch: any) => {
        try {
            dispatch(loading());

            const response = await UsersService.createUser({
                username,
                password,
                full_name,
                role,
                isDeleted,
            });

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(createAccountSuccess());
                dispatch(loadUsers());
                toast.success("Gebruiker succesvol aangemaakt.");
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(createAccountError(error));
            }
        } catch (e: any) {
            toast.error("Registratie fout.");
            return dispatch(
                createAccountError({
                    message: "Registratie fout.",
                    errors: null,
                })
            );
        }
    };

export const updateAccount =
    (user: any, user_id: string, navigate: any): any =>
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
                toast.success("Gebruiker succesvol geüpdatet.");
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(updateError(error));
            }
        } catch (e: any) {
            toast.error("Er is iets fout gegaan.");
            return dispatch(
                updateError({
                    message: "Er is iets fout gegaan.",
                    errors: null,
                })
            );
        }
    };

export const updatePassword =
    (user: any, user_id: string, navigate: any): any =>
    async (dispatch: any) => {
        try {
            dispatch(updateLoading());

            const response = await UsersService.updatePassword(user, user_id);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(updateSuccess());
                dispatch(loadUsers());
                toast.success("Wachtwoord succesvol veranderd.");
                navigate("/dashboard");
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(updateError(error));
            }
        } catch (e: any) {
            toast.error("Er is iets fout gegaan.");
            return dispatch(
                updateError({
                    message: "Er is iets fout gegaan.",
                    errors: null,
                })
            );
        }
    };

export const loadStatistics = (): any => async (dispatch: any) => {
    try {
        dispatch(loadingStatistics());

        const response = await UsersService.getStatistics();

        let data: any = null;

        try {
            data = await response.clone().json();
        } catch {
            data = await response.clone().text();
        }

        if (response.ok) {
            dispatch(loadStatisticsSuccess({ list: data.users }));
        } else {
            dispatch(loadStatisticsFailed({ message: "Er is iets fout gegaan." }));
        }
    } catch (e: any) {
        dispatch(loadStatisticsFailed({ message: "Er is iets fout gegaan." }));
    }
};
