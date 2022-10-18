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
} = CompanySlice.actions;

export const loadCompanies = (user_id:string): any => async (dispatch: any) => {
    try {
        dispatch(loadPending());

        const response = await CompanyService.getAll(user_id);

        let data: any = null;

        try {
            data = await response.clone().json();
        } catch {
            data = await response.clone().text();
        }

        if (response.ok) {
            dispatch(loadSuccess({ list: data.companys }));
        } else {
            dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
        }
    } catch (e: any) {
        dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
    }
};

export const loadCompany = (company_id:string): any => async (dispatch:any) => {
    try{
        dispatch(loadPending());
     
        const response = await CompanyService.getOne(company_id);
        console.log(response)
        let data: any = null;
        
        try {
            data = await response.clone().json();
        } catch {
            data = await response.clone().text();
        }
      console.log(data)
        if (response.ok) {
            dispatch(loadSuccess({ list: data.company }));
        } else {
            dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
        }
    } catch (e: any) {
        dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
    }
    }


export const updateCompany =
    (company: any, company_id: string,user_id:string,navigate:any): any =>
    async (dispatch: any) => {
        try {
            dispatch(updateLoading());
            console.log(company)
            const response = await CompanyService.update(company, company_id);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(updateSuccess());
                dispatch(loadCompanies(user_id));
                toast.success(data.message);
                navigate("/dashboard")

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

export const addCompany =
    (company: any,
        user_id: string,
        navigate:any): any =>
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
                dispatch(loadCompanies(user_id));
                toast.success(data.message);
                window.location.reload();
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(addError(error));
            }
        } catch (e: any) {
            toast.error("SOMETHING_WENT_WRONG");
            return dispatch(
                addError({ message: "SOMETHING_WENT_WRONG", errors: null })
            );
        }
    };