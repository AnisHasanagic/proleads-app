import { createSlice } from '@reduxjs/toolkit'

type CompanySlice = {
    loading: boolean,
    list:Company[],
    error: string,
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
    assigned_users: {
        loading: boolean;
        list: [],
        error: string;
    },
    unassigned_users: {
        loading: boolean;
        list: [],
        error: string;
    },
};

type Company = {
    id: string;
    name: string;
    address: string;
    description: string,
    company_info: string,
    price_per_call: number,
    price_per_connect: number,
    initial_time: number,
    price_per_minutes_overdue: number,
    overdue_time: number,
    company_fields: string,
    is_active:boolean,
    created_at: Date,
    updated_at: Date,
};

const INITIAL_STATE: CompanySlice = {
    list: [],
    loading:false,
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
    assigned_users: {
        loading: false,
        list: [],
        error: "",
    },
    unassigned_users: {
        loading: false,
        list: [],
        error: "",
    },
};

const companySlice = createSlice({
    name: "companies",
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
        loadOneSucces:(state,action)=>{
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
        loadingAssignedUsers: (state) => {
            state.assigned_users.loading = true;
            state.assigned_users.list = [];
            state.assigned_users.error = "";
        },
        loadSuccessAssignedUsers: (state, action) => {
            state.assigned_users.loading = false;
            state.assigned_users.list = action.payload.list;
            state.assigned_users.error = "";
        },
        loadFailedAssignedUsers: (state, action) => {
            state.assigned_users.loading = false;
            state.assigned_users.list = [];
            state.assigned_users.error = action.payload.message;
        },
        loadingUnassignedUsers: (state) => {
            state.unassigned_users.loading = true;
            state.unassigned_users.list = [];
            state.unassigned_users.error = "";
        },
        loadSuccessUnassignedUsers: (state, action) => {
            state.unassigned_users.loading = false;
            state.unassigned_users.list = action.payload.list;
            state.unassigned_users.error = "";
        },
        loadFailedUnassignedUsers: (state, action) => {
            state.unassigned_users.loading = false;
            state.unassigned_users.list = [];
            state.unassigned_users.error = action.payload.message;
        },
    },
});

export default companySlice;
