import { toast } from "react-toastify";
import UsersService from "./assignedUsers.service";
import usersSlice from "./assignedUsers.slice";

const {
    loading,
    loadSuccess,
    loadFailed,
} = usersSlice.actions;

export const loadAssignedUsers = (company_id:any): any => async (dispatch: any) => {
    try {
        dispatch(loading());

        console.log(company_id)


        const response = await UsersService.getAllAssigned(company_id);

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