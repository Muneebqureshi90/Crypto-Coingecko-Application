import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api, {apiConfig} from '../../../config/apiConfig';

// Base URL
const baseURL = `${apiConfig.baseURL}/auth`;

// Async Thunks

// Register a new user
export const signup = createAsyncThunk('auth/signup', async (user, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseURL}/signup`, user);
        return response.data;
    } catch (error) {
        console.log("Error details:", error);

        if (error.response) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({message: "Network Error", details: error.message});
        }
    }
});

// Login a user
export const login = createAsyncThunk('auth/login', async (user, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseURL}/signin`, user);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
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

// Upload User Image
export const uploadUserImage = createAsyncThunk(
    'auth/uploadUserImage',
    async ({userId, imageFile}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append('file', imageFile);

            const response = await axios.post(
                `${baseURL}/user/${userId}/upload-image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data; // Ensure this has the expected structure
        } catch (error) {
            // Log the error for debugging
            console.error('Upload error:', error);

            // Provide a fallback for error.response
            const errorMessage = error.response?.data?.message || error.message || "Image upload failed!";

            return rejectWithValue({message: errorMessage});
        }
    }
);


// Get User Image
export const getUserImage = createAsyncThunk(
    'auth/getUserImage',
    async ({userId}, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${apiConfig.baseUrl}/user/${userId}/image`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        jwt: null,
        loading: false,
        error: null,
        otpSessionId: null, // Track the OTP session
        userImage: null, // Add this to track the user image
        uploadStatus: 'idle',
        fetchStatus: 'idle',
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
            state.userImage = null; // Reset user image on logout
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
                state.loading = false;
                state.user = action.payload.user;
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
            })
            // Handle upload user image
            .addCase(uploadUserImage.pending, (state) => {
                state.uploadStatus = 'loading';
            })
            .addCase(uploadUserImage.fulfilled, (state, action) => {
                state.uploadStatus = 'succeeded';
                state.userImage = action.payload;
            })
            .addCase(uploadUserImage.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.payload;
            })
            // Handle get user image
            .addCase(getUserImage.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(getUserImage.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.userImage = action.payload;
            })
            .addCase(getUserImage.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const {logout, setAuthToken} = authSlice.actions;
export default authSlice.reducer;
