import { createSlice } from "@reduxjs/toolkit";

type CompanySlice = {
    loading: boolean;
    list:   Company[];
    error: string;
    update: {
        loading: boolean;
        errors: any[];
        message: string;
    };
    add: {
        loading: boolean;
        errors: any[];
        message: string;
    };
};

type Company = {
    id: string;
    name: string;
    address: string;
    description: string,
    company_info: string,
    price_per_call: number,
    initial_time: number,
    price_per_minutes_overdue: number,
    overdue_time: number,
    company_fields: string,
    is_active:boolean,
    created_at: Date;
    udated_at: Date;
};

const INITIAL_STATE: CompanySlice = {
    loading: false,
    list: [],
    error: "",
    update: {
        loading: false,
        errors: [],
        message: "",
    },
    add: {
        loading: false,
        errors: [],
        message: "",
    },
};

const CompanySlice = createSlice({
    name: "company",
    initialState: INITIAL_STATE,
    reducers: {
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
        updateLoading: (state) => {
            state.update.loading = true;
            state.update.errors = [];
            state.update.message = "";
        },
        updateSuccess: (state) => {
            state.update.loading = false;
            state.update.errors = [];
            state.update.message = "";
        },
        updateError: (state, action) => {
            state.update.loading = false;
            state.update.message = action.payload.message;
            state.update.errors = action.payload.errors;
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

export default CompanySlice;