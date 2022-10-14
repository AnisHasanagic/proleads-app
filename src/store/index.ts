import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import callSlice from './call/call.slice';
import companySlice from './company/company.slice';
import detailSlice from './detail/detail.slice';

import userSlice from './user/user.slice';
import usersSlice from './users/users.slice';

const reducer = combineReducers({
  user: userSlice.reducer,
  users: usersSlice.reducer,
  company: companySlice.reducer,
  call: callSlice.reducer,
  detail : detailSlice.reducer
})

const store = configureStore({
  reducer,
})

export default store;