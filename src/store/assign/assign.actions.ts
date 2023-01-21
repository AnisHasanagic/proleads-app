import { toast } from "react-toastify";
import { loadAssignedUsers, loadUnAssignedUsers } from "../company/company.actions";
import AssignService from "./assign.service";
import AssignSlice from "./assign.slice";

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
} = AssignSlice.actions;


export const toggleAssign =
    (assign: any): any =>
    async (dispatch: any) => {
        try {
            dispatch(addLoading());

            const response = await AssignService.toggle(assign);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(addSuccess());
                toast.success(data.message);
                dispatch(loadAssignedUsers(assign.company_id))
                dispatch(loadUnAssignedUsers(assign.company_id))
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
