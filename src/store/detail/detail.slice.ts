import { createSlice } from '@reduxjs/toolkit'

type Company = {
    id: string;
    name: string;
    address: string;
    email: string;
    description: string,
    company_info: string,
    price_per_call: number,
    initial_time: number,
    price_per_minutes_overdue: number,
    overdue_time: number,
    company_fields: string,
    message: string,
    errors: any,
    loading:boolean
};

const INITIAL_STATE: Company = {
    id: "",
    name: "",
    address:"",
    email: "",
    description:"",
    company_info:"",
    price_per_call:0,
    initial_time:0,
    price_per_minutes_overdue:0,
    overdue_time:0,
    company_fields:"",
    message: "",
    errors: null,
    loading:false
};

const detailSlice = createSlice({
        name: 'company',
        initialState: INITIAL_STATE,
        reducers: {
          loading: (state) => {
            state.loading = true;
          },
          loadPending: (state) => {
            state.loading = true;
            state.errors = "";
        },
          loadSuccess: (state, action) => {
            state.id=action.payload.company.id
            state.name = action.payload.company.name;
            state.address = action.payload.company.address;
            state.email = action.payload.company.email;
            state.description = action.payload.company.description;
            state.company_info = action.payload.company.company_info;
            state.price_per_call = action.payload.company.price_per_call;
            state.initial_time = action.payload.company.initial_time;
            state.price_per_minutes_overdue = action.payload.company.price_per_minutes_overdue;
            state.overdue_time = action.payload.company.overdue_time;
            state.company_fields = action.payload.company.company_fields;
            state.message = '';
            state.errors = null;
            state.loading = false;
          },
          loadError: (state, action) => {
            state.message = action.payload.message;
            state.errors = action.payload.errors;
            state.loading = false;
          }
        }
});

export default detailSlice;