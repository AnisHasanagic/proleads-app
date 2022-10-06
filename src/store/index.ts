import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import companySlice from './company/company.slice';

import userSlice from './user/user.slice';
import usersSlice from './users/users.slice';

const reducer = combineReducers({
  user: userSlice.reducer,
  users: usersSlice.reducer,
  company: companySlice.reducer,
})

const store = configureStore({
  reducer,
})

export default store;