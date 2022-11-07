import { createSlice } from '@reduxjs/toolkit'


type StatisticSlice = {
    loading:boolean,
    list: Statistics[],
    errors:string
}

type Statistics = {
    day:string,
    count:number

};

const INITIAL_STATE: StatisticSlice= {
    list: [],
    loading: false,
    errors: "",
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
            state.list=[];
            state.errors = "";
        },
        loadSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload.numberOfDay;
            state.errors = "";
        },
        loadFailed: (state, action) => {
            state.loading = false;
            state.list = [];
            state.errors = action.payload.message;
        },
    },
});

export default statisticsSlice;