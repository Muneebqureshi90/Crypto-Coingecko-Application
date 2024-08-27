import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiConfig} from '@/config/apiConfig'; // Adjust the path if necessary

// Base URL
const baseURL = `${apiConfig.baseURL}/auth`;

// Async Thunks

// Register a new user
export const signup = createAsyncThunk('auth/signup', async (user, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseURL}/signup`, user);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Login a user
export const login = createAsyncThunk('auth/login', async (user, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseURL}/signin`, user);
        // console.log("responce" + response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Verify OTP for two-factor authentication
export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({otp, id}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseURL}/two-factor/otp/${otp}?id=${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Send OTP for forgetting password
export const sendForgetPasswordOtp = createAsyncThunk('auth/sendForgetPasswordOtp', async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseURL}/reset-password/send-otp`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Reset password with OTP
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({id, password, otp}, {rejectWithValue}) => {
    try {
        const response = await axios.patch(`${baseURL}/reset-password/verify-otp`, {
            id,
            password,
            otp
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        jwt: null,
        loading: false,
        error: null,
        otpSessionId: null, // Add this if you want to track the OTP session
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.jwt = action.payload;
            localStorage.setItem('jwt', action.payload);

        },
        logout: (state) => {
            state.user = null;
            state.jwt = null;
            state.otpSessionId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.jwt = action.payload.jwt;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                // console.log("Login response payload:", action.payload); // Check this structure

                state.loading = false;
                state.user = action.payload.user;
                // console.log("Login response payload:", action.payload.user); // Check this structure

                state.jwt = action.payload.jwt;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendForgetPasswordOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendForgetPasswordOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSessionId = action.payload.session;
            })
            .addCase(sendForgetPasswordOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setAuthToken} = authSlice.actions;
export default authSlice.reducer;
