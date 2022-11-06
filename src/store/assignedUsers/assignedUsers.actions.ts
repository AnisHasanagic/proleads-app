import { toast } from "react-toastify";
import UsersService from "./assignedUsers.service";
import usersSlice from "./assignedUsers.slice";

const {
    loading,
    loadSuccess,
    loadFailed,
} = usersSlice.actions;

export const loadAssignedUsers = (): any => async (dispatch: any) => {
    try {
        dispatch(loading());

        const response = await UsersService.getAllAssigned();

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