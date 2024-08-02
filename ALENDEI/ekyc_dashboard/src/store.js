import { configureStore } from '@reduxjs/toolkit';
import formReducer from './features/form/formSlice';
import userReducer from './features/Users/usersSlice';
import approveReducer from './features/UserThings/approvalSlice';
const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
    approve: approveReducer,
  },
});

export default store;
