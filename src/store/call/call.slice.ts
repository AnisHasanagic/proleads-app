import { createSlice } from '@reduxjs/toolkit'

type CallSlice = {
    loading: boolean,
    list:Call[],
    error: string,
    add: {
        loading: boolean;
        errors: any[];
        message: string;
    };
};

type Call = {
    id: string;
    company_id: string;
    user_id:string,
    price_per_call: number,
    price_per_connect: number,
    initial_time: number,
    price_per_minutes_overdue: number,
    overdue_time: number,
    call_fields: string,
    created_at: Date,
    updated_at: Date,
    full_name:string,
    gender:string,
    email:string,
    phone:string,
    start_timer: number,
    end_timer: number
};

const INITIAL_STATE: CallSlice = {
    list: [],
    loading:false,
    error: "",
    add: {
        loading: false,
        errors: [],
        message: "",
    },
};

const callSlice = createSlice({
    name: "calls",
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
        addLoading: (state) => {
            state.add.loading = true;
            state.add.errors = [];
            state.add.message = "";
        },
        addSuccess: (state) => {
            state.add.loading = false;
            state.add.errors = [];
            state.add.message = "";
        },
        addError: (state, action) => {
            state.add.loading = false;
            state.add.message = action.payload.message;
            state.add.errors = action.payload.errors;
        },
    },
});

export default callSlice;
