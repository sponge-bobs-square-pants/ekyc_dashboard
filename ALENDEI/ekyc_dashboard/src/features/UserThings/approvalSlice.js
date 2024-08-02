import { createSlice, createAsyncThunk, isFulfilled } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateUserList } from '../Users/usersSlice';
import { toast } from 'react-toastify';
const url = 'http://localhost:5003';
const initialState = {
  ApproveStatus: false,
  RejectStatus: false,
};

export const approveUser = createAsyncThunk(
  'approve/approveUser',
  async (params, thunkAPI) => {
    try {
      const approveStatus = await axios.post(
        `${url}/api/v1/admin/statusUpdate`,
        { next: 'APPROVE', userId: params.userId },
        { withCredentials: true }
      );
      thunkAPI.dispatch(updateUserList(params.userId));
      return approveStatus.data;
    } catch (error) {
      const errorMessage = error.response?.data?.Message || 'An error occurred';
      return thunkAPI.rejectWithValue({ Message: errorMessage });
    }
  }
);
export const RejectUser = createAsyncThunk(
  'approve/RejectUser',
  async (params, thunkAPI) => {
    try {
      const rejectStatus = await axios.post(
        `${url}/api/v1/admin/statusUpdate`,
        { next: 'REJECT', userId: params.userId, reason: params.reason },
        { withCredentials: true }
      );
      thunkAPI.dispatch(updateUserList(params.userId));
      return rejectStatus.data;
    } catch (error) {
      const errorMessage = error.response?.data?.Message || 'An error occurred';
      return thunkAPI.rejectWithValue({ Message: errorMessage });
    }
  }
);

const approvalSlice = createSlice({
  name: 'approve',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //APPROVE USER
    builder.addCase(approveUser.pending, (store) => {});
    builder.addCase(approveUser.fulfilled, (store, { payload }) => {
      store.ApproveStatus = true;
      toast.success('User Approved');
    });
    builder.addCase(approveUser.rejected, (store, { payload }) => {
      toast.error(payload.Message);
      //   console.log(`${payload.data.Message}`);
    });
    //REJECT USER
    builder.addCase(RejectUser.pending, (store) => {});
    builder.addCase(RejectUser.fulfilled, (store, { payload }) => {
      store.RejectStatus = true;
      toast.success('User Rejected');
    });
    builder.addCase(RejectUser.rejected, (store, { payload }) => {
      toast.error(payload.Message);
      //   console.log(`${payload.data.Message}`);
    });
  },
});

export const {} = approvalSlice.actions;

export default approvalSlice.reducer;
