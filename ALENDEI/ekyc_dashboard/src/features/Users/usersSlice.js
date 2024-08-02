// src/features/form/formSlice.js
import { createSlice, createAsyncThunk, isFulfilled } from '@reduxjs/toolkit';
import axios from 'axios';
const url = 'http://localhost:5003';
const initialState = {
  DashboardState: {
    isPending: true,
    isLoaded: false,
    isError: false,
    error: null,
  },
  users: [],
  totalUsers: 0,
  view: 'ALL_USERS',
  selectedUserId: '',

  PANDetails: {
    isPanLoading: true,
    isPanLoaded: false,
    isPanError: false,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PANNumber: '',
    UserPanImage: '',
    DOB: '',
  },
  AadharDetails: {
    isAadharLoading: true,
    isAadharLoaded: false,
    isAadharError: false,
    Street1: '',
    Street2: '',
    City: '',
    Pincode: '',
    AadharImage: '',
    AadharNumber: '',
    AadharName: '',
  },
  SelfieDetails: {
    isSelfieLoading: true,
    isSelfieLoaded: false,
    isSelfieError: false,
    UserOTP: '',
    SelfieImage: '',
  },
  tabViews: {},
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (params, thunkAPI) => {
    try {
      const userList = await axios.get(
        'http://localhost:5003/api/v1/admin/allUsers',
        { withCredentials: true }
      );
      //   console.log(userList);
      return userList.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const VerifiedUsers = createAsyncThunk(
  'user/VerifiedUsers',
  async (params, thunkAPI) => {
    try {
      const userList = await axios.get(
        'http://localhost:5003/api/v1/admin/verifiedUsers',
        { withCredentials: true }
      );
      return userList.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const PendingUsers = createAsyncThunk(
  'user/PendingUsers',
  async (params, thunkAPI) => {
    try {
      const userList = await axios.get(
        'http://localhost:5003/api/v1/admin/verificationPending',
        { withCredentials: true }
      );
      return userList.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const failedVerification = createAsyncThunk(
  'user/failedVerification',
  async (params, thunkAPI) => {
    try {
      const userList = await axios.get(
        'http://localhost:5003/api/v1/admin/RejectedUsers',
        { withCredentials: true }
      );
      return userList.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const fetchSingleUserPAN = createAsyncThunk(
  'user/fetchSingleUserPAN',
  async (params, thunkAPI) => {
    try {
      const PANDetails = await axios.post(
        'http://localhost:5003/api/v1/admin/getPAN',
        { userId: params.userId },
        { withCredentials: true }
      );
      //   console.log(params);
      return PANDetails.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const fetchSingleUserAadhar = createAsyncThunk(
  'user/fetchSingleUserAadhar',
  async (params, thunkAPI) => {
    try {
      //   console.log(params.userId);
      const AadharDetails = await axios.post(
        'http://localhost:5003/api/v1/admin/getAadhar',
        { userId: params.userId },
        { withCredentials: true }
      );
      return AadharDetails.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const fetchSingleUserSelfie = createAsyncThunk(
  'user/fetchSingleUserSelfie',
  async (params, thunkAPI) => {
    try {
      const AadharDetails = await axios.post(
        'http://localhost:5003/api/v1/admin/getSelfie',
        { userId: params.userId },
        { withCredentials: true }
      );
      //   console.log(AadharDetails);
      return AadharDetails.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (store) => initialState,
    changeView: (store, action) => {
      store.view = action.payload;
    },
    setSelectedUserId: (store, action) => {
      store.selectedUserId = action.payload;
    },
    setTabViewed: (state, action) => {
      const { userId, tab } = action.payload;
      if (!state.tabViews[userId]) {
        state.tabViews[userId] = { tab1: false, tab2: false, tab3: false };
      }
      state.tabViews[userId][tab] = true;
    },
    updateUserList: (state, action) => {
      console.log(action.payload);
      const userId = action.payload;
      state.users = state.users.filter((user) => user._id !== userId);
    },
  },
  extraReducers: (builder) => {
    //FETCH USERS
    builder.addCase(fetchUsers.pending, (store) => {
      store.isPending = true;
      store.isFulfilled = false;
      store.isError = false;
    });
    builder.addCase(fetchUsers.fulfilled, (store, { payload }) => {
      store.isPending = false;
      store.isLoaded = true;
      store.users = payload.filteredUsers;
      store.totalUsers = payload.totalUsers;
    });
    builder.addCase(fetchUsers.rejected, (store, { payload }) => {
      //   console.log(payload.data.Message);
      store.isPending = false;
      store.isError = true;
      store.isFulfilled = false;
    });
    //VERIFIED USERS
    builder.addCase(VerifiedUsers.pending, (store) => {
      store.isPending = true;
      store.isFulfilled = false;
      store.isError = false;
    });
    builder.addCase(VerifiedUsers.fulfilled, (store, { payload }) => {
      store.isPending = false;
      store.isLoaded = true;
      store.users = payload.filteredUsers;
      store.totalUsers = payload.totalUsers;
      //   console.log(store.users);
    });
    builder.addCase(VerifiedUsers.rejected, (store, { payload }) => {
      store.isPending = false;
      store.isError = true;
      store.isFulfilled = false;
    });
    //PENDING USER
    builder.addCase(PendingUsers.pending, (store) => {
      store.isPending = true;
      store.isFulfilled = false;
      store.isError = false;
    });
    builder.addCase(PendingUsers.fulfilled, (store, { payload }) => {
      store.isPending = false;
      store.isLoaded = true;
      store.users = payload.filteredUsers;
      store.totalUsers = payload.totalUsers;
      //   console.log(store.users);
    });
    builder.addCase(PendingUsers.rejected, (store, { payload }) => {
      store.isPending = false;
      store.isError = true;
      store.isFulfilled = false;
    });
    //FAILED VERIFICATION USER
    builder.addCase(failedVerification.pending, (store) => {
      store.isPending = true;
      store.isFulfilled = false;
      store.isError = false;
    });
    builder.addCase(failedVerification.fulfilled, (store, { payload }) => {
      store.isPending = false;
      store.isLoaded = true;
      store.users = payload.filteredUsers;
      store.totalUsers = payload.totalUsers;
      //   console.log(store.users);
    });
    builder.addCase(failedVerification.rejected, (store, { payload }) => {
      store.isPending = false;
      store.isError = true;
      store.isFulfilled = false;
    });
    //SINGLE USER PAN DETAILS
    builder.addCase(fetchSingleUserPAN.pending, (store) => {
      store.PANDetails.isPanLoading = true;
      store.PANDetails.isPanLoaded = false;
      store.PANDetails.isPanError = false;
    });
    builder.addCase(fetchSingleUserPAN.fulfilled, (store, { payload }) => {
      store.PANDetails.isPanLoading = false;
      store.PANDetails.isPanLoaded = true;
      store.PANDetails.isPanError = false;
      const { FirstName, MiddleName, LastName, PANNumber, DOB, UserPanImage } =
        payload;
      store.PANDetails.FirstName = FirstName;
      store.PANDetails.LastName = LastName;
      store.PANDetails.MiddleName = MiddleName;
      store.PANDetails.PANNumber = PANNumber;
      store.PANDetails.DOB = DOB;
      store.PANDetails.UserPanImage = UserPanImage;
    });
    builder.addCase(fetchSingleUserPAN.rejected, (store, { payload }) => {
      store.PANDetails.isPanLoading = false;
      store.PANDetails.isPanLoaded = false;
      store.PANDetails.isPanError = true;
    });
    //SINGLE USER AADHAR CARD DETAILS
    builder.addCase(fetchSingleUserAadhar.pending, (store) => {
      store.AadharDetails.isAadharLoading = true;
      store.AadharDetails.isAadharLoaded = false;
      store.AadharDetails.isAadharError = false;
    });
    builder.addCase(fetchSingleUserAadhar.fulfilled, (store, { payload }) => {
      store.AadharDetails.isAadharLoading = false;
      store.AadharDetails.isAadharLoaded = true;
      store.AadharDetails.isAadharError = false;
      const {
        Street1,
        Street2,
        Pincode,
        City,
        UserAadharImage,
        AadharNumber,
        AadharName,
      } = payload;
      store.AadharDetails.Street1 = Street1;
      store.AadharDetails.Street2 = Street2;
      store.AadharDetails.City = City;
      store.AadharDetails.Pincode = Pincode;
      store.AadharDetails.AadharImage = UserAadharImage;
      store.AadharDetails.AadharNumber = AadharNumber;
      store.AadharDetails.AadharName = AadharName;
    });
    builder.addCase(fetchSingleUserAadhar.rejected, (store, { payload }) => {
      store.AadharDetails.isAadharLoading = false;
      store.AadharDetails.isAadharLoaded = false;
      store.AadharDetails.isAadharError = true;
    });
    //SINGLE USER SELFIE DETAILS
    builder.addCase(fetchSingleUserSelfie.pending, (store) => {
      store.SelfieDetails.isSelfieLoading = true;
      store.SelfieDetails.isSelfieLoaded = false;
      store.SelfieDetails.isSelfieError = false;
    });
    builder.addCase(fetchSingleUserSelfie.fulfilled, (store, { payload }) => {
      store.SelfieDetails.isSelfieLoading = false;
      store.SelfieDetails.isSelfieLoaded = true;
      store.SelfieDetails.isSelfieError = false;
      const { OTPS, UserOTPImage } = payload;
      store.SelfieDetails.UserOTP = OTPS;
      store.SelfieDetails.SelfieImage = UserOTPImage;
    });
    builder.addCase(fetchSingleUserSelfie.rejected, (store, { payload }) => {
      store.SelfieDetails.isSelfieLoading = false;
      store.SelfieDetails.isSelfieLoaded = false;
      store.SelfieDetails.isSelfieError = true;
    });
  },
});

export const {
  resetState,
  changeView,
  setSelectedUserId,
  setTabViewed,
  updateUserList,
} = userSlice.actions;

export default userSlice.reducer;
