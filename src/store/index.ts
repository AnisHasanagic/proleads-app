import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import userSlice from './user/user.slice';

const reducer = combineReducers({
  user: userSlice.reducer,
})

const store = configureStore({
  reducer,
})

export default store;