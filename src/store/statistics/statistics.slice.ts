import { createSlice } from '@reduxjs/toolkit'

type StatisticsSlice = {
    loading: boolean,
    list:Statistics[],
    error: string,
    add: {
        loading: boolean;
        errors: any[];
        message: string;
    };
};

type Statistics = {
    day:string;
    count:number
};

const INITIAL_STATE: StatisticsSlice = {
    list: [],
    loading:false,
    error: "",
    add: {
        loading: false,
        errors: [],
        message: "",
    },
};

const statisticsSlice = createSlice({
    name: "statistics",
    initialState: INITIAL_STATE,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        loadPending: (state) => {
            state.loading = true;
            state.list = [];
            state.error = "";
        },
        loadSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload.list;
            state.error = "";
        },
        loadFailed: (state, action) => {
            state.loading = false;
            state.list = [];
            state.error = action.payload.message;
        },
    },
});

export default statisticsSlice;