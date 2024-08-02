// src/features/form/formSlice.js
import { createSlice, createAsyncThunk, isFulfilled } from '@reduxjs/toolkit';
import axios from 'axios';
const url = 'http://localhost:5003';
const initialState = {
  fullName: '',
  password: '',
  continues: false,
  nameError: false,
  passwordError: false,
  Login: {
    isLoading: false,
    isError: false,
    isFulfilled: !!localStorage.getItem('isAuthenticated'),
  },
  role: localStorage.getItem('role') || '',
  UserName: localStorage.getItem('userName') || '',
};

export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (params, thunkAPI) => {
    try {
      const { fullName, password } = thunkAPI.getState().form;
      const loginBody = {
        phonenumber: fullName,
        Password: password,
      };
      const response = await axios.post(
        `${url}/api/v1/admin/login`,
        loginBody,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const CheckForm = createAsyncThunk(
  'form/CheckForm',
  async (params, thunkAPI) => {
    try {
      const validity = await axios.get(
        'http://localhost:5003/api/v1/admin/VerifyToken',
        { withCredentials: true }
      );
      return validity.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFullName: (store, action) => {
      store.fullName = action.payload;
    },
    setPassword: (store, action) => {
      store.password = action.payload;
    },
    setNameError: (store, action) => {
      store.nameError = action.payload;
    },
    setPasswordError: (store, action) => {
      store.passwordError = action.payload;
    },
    setContinues: (store, action) => {
      store.continues = action.payload;
    },
    setRole: (store, { payload }) => {
      store.role = payload;
    },
    clearAuth: (store) => {
      store.role = '';
      store.Login.isFulfilled = false;
      localStorage.removeItem('role');
      localStorage.removeItem('isAuthenticated');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.pending, (store) => {
      store.Login.isLoading = true;
    });
    builder.addCase(submitForm.fulfilled, (store, { payload }) => {
      store.Login.isLoading = false;
      store.Login.isFulfilled = true;
      store.role = payload.role;
      store.UserName = payload.UserName;
      localStorage.setItem('userName', payload.UserName);
      localStorage.setItem('role', payload.role);
      localStorage.setItem('isAuthenticated', 'true');
      store.Login.isError = false;
    });
    builder.addCase(submitForm.rejected, (store, { payload }) => {
      store.Login.isLoading = false;
      store.Login.isError = true;
      console.log(`${payload.data.Message}`);
    });
    //VERIFY TOKEN
    builder.addCase(CheckForm.pending, (store) => {
      // console.log('Loading');
    });
    builder.addCase(CheckForm.fulfilled, (store, { payload }) => {
      // console.log('verified');
    });
    //CHECK HERE FOR DOUBLE LOAD
    builder.addCase(CheckForm.rejected, (store, { payload }) => {
      // store.dispatch(Navigate('/login'));
      console.log(`${payload.data.Message}`);
      localStorage.removeItem('role');
      localStorage.removeItem('isAuthenticated');
      store.role = '';
      store.Login.isFulfilled = false;
      window.location.href = '/';
    });
  },
});

export const {
  setFullName,
  setNameError,
  setPasswordError,
  setPassword,
  setContinues,
} = formSlice.actions;

export default formSlice.reducer;
