import AssignmentInd from '@material-ui/icons/AssignmentInd';
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import assignSlice from './assignedUsers/assignedUsers.slice';
import callSlice from './call/call.slice';
import companySlice from './company/company.slice';
import detailSlice from './detail/detail.slice';
import statisticsSlice from './statistics/statistics.slice';
import unAssignedSlice from './unassignedUsers/unassignedUsers.slice';

import userSlice from './user/user.slice';
import usersSlice from './users/users.slice';

const reducer = combineReducers({
  user: userSlice.reducer,
  users: usersSlice.reducer,
  company: companySlice.reducer,
  call: callSlice.reducer,
  detail : detailSlice.reducer,
  statistic : statisticsSlice.reducer,
  unAssigned : unAssignedSlice.reducer,
  assigned: assignSlice.reducer
})

const store = configureStore({
  reducer,
})

export default store;