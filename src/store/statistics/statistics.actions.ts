import { toast } from "react-toastify";
import StatisticService from "./statistics.service";
import StatisticSlice from "./statistics.slice";

const {
    loadPending,
    loadFailed,
    loadSuccess
} = StatisticSlice.actions;



export const loadCalls = (
    exportData: any
): any => async (dispatch: any) => {
    try {
        dispatch(loadPending());
        const response = await StatisticService.getAll(exportData);

        let data: any = null;

        try {
            data = await response.clone().json();
        } catch {
            data = await response.clone().text();
        }

        if (response.ok) {
            dispatch(loadSuccess({ list: data.calls }));
            console.log(data.calls)
        } else {
            dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
        }
    } catch (e: any) {
        dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
    }
};

