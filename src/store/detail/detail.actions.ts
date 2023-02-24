import { toast } from "react-toastify";
import DetailService from "./detail.service";
import DetailSlice from "./detail.slice";

const { loading, loadSuccess, loadError } = DetailSlice.actions;

export const loadCompany =
    (company_id: string): any =>
    async (dispatch: any) => {
        try {
            dispatch(loading());

            const response = await DetailService.getOne(company_id);
            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }
            if (response.ok) {
                dispatch(loadSuccess({ company: data.data.company }));
            } else {
                dispatch(loadError({ message: "Er is iets fout gegaan." }));
            }
        } catch (e: any) {
            dispatch(loadError({ message: "Er is iets fout gegaan." }));
        }
    };
