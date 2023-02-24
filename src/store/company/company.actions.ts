import { toast } from "react-toastify";
import CompanyService from "./company.service";
import CompanySlice from "./company.slice";

const {
    loadPending,
    loadSuccess,
    loadFailed,
    updateLoading,
    updateSuccess,
    updateError,
    addLoading,
    addSuccess,
    addError,
    loadingAssignedUsers,
    loadSuccessAssignedUsers,
    loadFailedAssignedUsers,
    loadingUnassignedUsers,
    loadSuccessUnassignedUsers,
    loadFailedUnassignedUsers,
} = CompanySlice.actions;

export const loadCompanies =
    (load_all: boolean): any =>
    async (dispatch: any) => {
        try {
            dispatch(loadPending());

            const response = await CompanyService.getAll(load_all);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(loadSuccess({ list: data.companys }));
            } else {
                dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
            }
        } catch (e: any) {
            dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
        }
    };

export const loadCompany =
    (company_id: string): any =>
    async (dispatch: any) => {
        try {
            dispatch(loadPending());

            const response = await CompanyService.getOne(company_id);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }
            if (response.ok) {
                dispatch(loadSuccess({ list: data.company }));
            } else {
                dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
            }
        } catch (e: any) {
            dispatch(loadFailed({ message: "Er is iets fout gegaan." }));
        }
    };

export const updateCompany =
    (company: any, company_id: string): any =>
    async (dispatch: any) => {
        try {
            dispatch(updateLoading());
            const response = await CompanyService.update(company, company_id);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(updateSuccess());
                dispatch(loadCompanies(true));
                toast.success("Bedrijfsrecord succesvol bijgewerkt.");
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

export const addCompany =
    (company: any): any =>
    async (dispatch: any) => {
        try {
            dispatch(addLoading());

            const response = await CompanyService.add(company);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(addSuccess());
                dispatch(loadCompanies(true));
                toast.success("Bedrijfsrecord succesvol toegevoegd.");
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

export const loadAssignedUsers =
    (company_id: any): any =>
    async (dispatch: any) => {
        try {
            dispatch(loadingAssignedUsers());

            const response = await CompanyService.getAllAssigned(company_id);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(loadSuccessAssignedUsers({ list: data.users }));
            } else {
                dispatch(
                    loadFailedAssignedUsers({
                        message: "Er is iets fout gegaan.",
                    })
                );
            }
        } catch (e: any) {
            dispatch(
                loadFailedAssignedUsers({ message: "Er is iets fout gegaan." })
            );
        }
    };

export const loadUnAssignedUsers =
    (company_id: any): any =>
    async (dispatch: any) => {
        try {
            dispatch(loadingUnassignedUsers());

            const response = await CompanyService.getAllUnAssigned(company_id);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(loadSuccessUnassignedUsers({ list: data.users }));
            } else {
                dispatch(
                    loadFailedUnassignedUsers({
                        message: "Er is iets fout gegaan.",
                    })
                );
            }
        } catch (e: any) {
            dispatch(
                loadFailedUnassignedUsers({
                    message: "Er is iets fout gegaan.",
                })
            );
        }
    };
