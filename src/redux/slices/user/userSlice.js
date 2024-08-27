import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {apiConfig} from '@/config/apiConfig.js'; // Adjust the path if necessary

// Base URL for User API
const baseURL = `${apiConfig.baseURL}/api/users`;

// Async Thunks

// Get User Profile by JWT
export const getUserProfile = createAsyncThunk('user/getUserProfile', async (jwt, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/profile`, {
            headers: {
                Authorization: `BEARER ${jwt}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get User by Email
export const getUserByEmail = createAsyncThunk('user/getUserByEmail', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/${email}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Send Verification OTP
export const sendVerificationOtp = createAsyncThunk('user/sendVerificationOtp', async ({ jwt, verificationType }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}/verification/${verificationType}/send-otp`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Enable Two-Factor Authentication
export const enableTwoFactorAuth = createAsyncThunk('user/enableTwoFactorAuth', async ({ otp, jwt }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${baseURL}/enable-two-factor/verify-otp/${otp}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update Password
export const updatePassword = createAsyncThunk('user/updatePassword', async ({ userId, newPassword }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseURL}/${userId}/update-password`, null, {
            params: { newPassword },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getUserDetailsById = createAsyncThunk('user/getUserDetailsById', async ({ userId, jwt }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/${userId}/details`, {
            headers: {
                Authorization: `Bearer ${jwt}`, // Include JWT in headers
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// User Slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        // Additional synchronous actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserByEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendVerificationOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendVerificationOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendVerificationOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(enableTwoFactorAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enableTwoFactorAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(enableTwoFactorAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserDetailsById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getUserDetailsById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetailsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
