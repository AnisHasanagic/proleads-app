import { createSlice } from '@reduxjs/toolkit'

type User = {
  token: string | null;
  userChecked: boolean;
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  subscribed_until: Date | null;
  message: string;
  errors: any;
  loading: boolean;
  update: {
    loading: boolean;
    errors: any[];
    message: string;
  };
}

const INITIAL_STATE: User = {
  token: null,
  userChecked: false,
  role: '',
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  address: '',
  country: '',
  city: '',
  state: '',
  zip: '',
  subscribed_until: null,
  message: '',
  errors: null,
  loading: false,
  update: {
    loading: false,
    errors: [],
    message: "",
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userChecked = true;
      state.role = action.payload.user.role;
      state.email = action.payload.user.email;
      state.first_name = action.payload.user.first_name;
      state.last_name = action.payload.user.last_name;
      state.phone = action.payload.user.phone;
      state.address = action.payload.user.address;
      state.country = action.payload.user.country;
      state.city = action.payload.user.city;
      state.state = action.payload.user.state;
      state.zip = action.payload.user.zip;
      state.subscribed_until = action.payload.user.subscribed_until;
      state.message = '';
      state.errors = null;
      state.loading = false;
    },
    loginError: (state, action) => {
      state.message = action.payload.message;
      state.errors = action.payload.errors;
      state.userChecked = true;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.role = '';
      state.email = '';
      state.subscribed_until = null;
      state.message = '';
      state.errors = null;
      state.userChecked = true;
      state.loading = false;
    },
    createAccountSuccess: (state) => {
      state.loading = false;
    },
    createAccountError: (state, action) => {
      state.message = action.payload.message;
      state.errors = action.payload.errors;
      state.userChecked = true;
      state.loading = false;
    },
    checkUserAuthenticated: (state) => {
      state.userChecked = false;
    },
    checkUserAuthenticatedError: (state) => {
      state.userChecked = true;
    },
  },
});

export default userSlice;
