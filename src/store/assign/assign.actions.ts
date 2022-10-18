import { toast } from "react-toastify";
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


export const addAssign =
    (assign: any,
        navigate:any): any =>
    async (dispatch: any) => {
        try {
            dispatch(addLoading());
            console.log(assign)

            const response = await AssignService.add(assign);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(addSuccess());
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