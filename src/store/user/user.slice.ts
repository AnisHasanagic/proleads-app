import { createSlice } from "@reduxjs/toolkit";

type User = {
    id: string;
    onlineUsers: [];
    calls: any[];
    token: string | null;
    userChecked: boolean;
    role: string;
    username: string;
    full_name: string;
    message: string;
    errors: any;
    loading: boolean;
    update: {
        loading: boolean;
        errors: any[];
        message: string;
    };
};

const INITIAL_STATE: User = {
    id: "",
    token: null,
    calls: [],
    onlineUsers: [],
    userChecked: false,
    role: "",
    username: "",
    full_name: "",
    message: "",
    errors: null,
    loading: false,
    update: {
        loading: false,
        errors: [],
        message: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        loading: (state: any) => {
            state.loading = true;
        },
        loginSuccess: (state: any, action: any) => {
            state.id = action.payload.user.id;
            state.token = action.payload.token;
            state.calls = action.payload.user.calls;
            state.onlineUsers = action.payload.users;
            state.userChecked = true;
            state.role = action.payload.user.role;
            state.username = action.payload.user.username;
            state.full_name = action.payload.user.full_name;
            state.message = "";
            state.errors = null;
            state.loading = false;
        },
        loginError: (state: any, action: any) => {
            state.message = action.payload.message;
            state.errors = action.payload.errors;
            state.userChecked = true;
            state.loading = false;
        },
        logoutSuccess: (state: any) => {
            state.id = "";
            state.token = null;
            state.role = "";
            state.username = "";
            state.message = "";
            state.errors = null;
            state.userChecked = true;
            state.loading = false;
        },
        createAccountSuccess: (state: any) => {
            state.loading = false;
        },
        createAccountError: (state: any, action: any) => {
            state.message = action.payload.message;
            state.errors = action.payload.errors;
            state.userChecked = true;
            state.loading = false;
        },
        checkUserAuthenticated: (state: any) => {
            state.userChecked = false;
        },
        checkUserAuthenticatedError: (state: any) => {
            state.userChecked = true;
        },
    },
});

export default userSlice;
