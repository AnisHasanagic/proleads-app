import { toast } from "react-toastify";
import CallService from "./call.service";
import CallSlice from "./call.slice";

const {
    addLoading,
    addSuccess,
    addError,
    loadPending,
    loadFailed,
    loadSuccess
} = CallSlice.actions;


export const addCall =
    (call: any,
        navigate: any): any =>
        async (dispatch: any) => {
            try {
                dispatch(addLoading());

                const response = await CallService.add(call);

                let data: any = null;

                try {
                    data = await response.clone().json();
                } catch {
                    data = await response.clone().text();
                }

                if (response.ok) {
                    dispatch(addSuccess());
                    toast.success("Oproep succesvol gedaan.");
                    navigate('/dashboard/calls')
                } else {
                    const error: any = {
                        message: data.message ? data.message : null,
                        errors: data.errors ? data.errors : null,
                    };

                    if (error.message) toast.error(error.message);
                    return dispatch(addError(error));
                }
            } catch (e: any) {
                toast.error("Er is iets fout gegaan.");
                return dispatch(
                    addError({ message: "Er is iets fout gegaan.", errors: null })
                );
            }
        };
export const loadCalls = (
    exportData: any
): any => async (dispatch: any) => {
    try {
        dispatch(loadPending());
        const response = await CallService.getAll(exportData);

        let data: any = null;

        try {
            data = await response.clone().json();
        } catch {
            data = await response.clone().text();
        }

        if (response.ok) {
            dispatch(loadSuccess({ list: data.calls, company_package: data.company_package }));
        } else {
            dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
        }
    } catch (e: any) {
        dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
    }
};
