import { toast } from "react-toastify";
import StatisticService from "./statistics.service";
import StatisticSlice from "./statistics.slice";

const {
    loadPending,
    loadFailed,
    loadSuccess
} = StatisticSlice.actions;



export const loadStat = (
): any => async (dispatch: any) => {
    try {
        dispatch(loadPending());
        const response = await StatisticService.getAll();

        let data: any = null;

        try {
            data = await response.clone().json();
        } catch {
            data = await response.clone().text();
        }

        console.log(data.data.numberOfCalls)
        if (response.ok) {
            dispatch(loadSuccess({ numberOfDay: data.data.numberOfCalls }));
            console.log("sss")
            console.log(data.data.numberOfCalls)
        } else {
            dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
        }
    } catch (e: any) {
        dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
    }
};

