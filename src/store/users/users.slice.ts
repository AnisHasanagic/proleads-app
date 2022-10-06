import { createSlice } from "@reduxjs/toolkit";

type UsersSlice = {
    loading: boolean,
    list: User[],
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
}

type User = {
    id: string,
    role: string,
    username: string,
    first_name: string,
    last_name: string,
    created_at: Date,
    updated_at: Date
}
const INITIAL_STATE :UsersSlice = {
    list: [],
    loading: false,
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

const usersSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        loadSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload.list;
            state.error = "";
        },
        loadFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.list = [];
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
        createAccountSuccess: (state:any) => {
            state.loading = false;
          },
          createAccountError: (state:any, action:any) => {
            state.message = action.payload.message;
            state.errors = action.payload.errors;
            state.userChecked = true;
            state.loading = false;
          },
    },
});

export default usersSlice;