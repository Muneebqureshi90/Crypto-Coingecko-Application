import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/config/apiConfig.js';

// Async thunk for adding payment details
export const addPaymentDetails = createAsyncThunk(
    'payment/addPaymentDetails',
    async ({ paymentDetails, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/payment-details', paymentDetails, {
                headers: { Authorization: `Bearer ${jwt}` }, // Make sure 'Bearer' is included if required by the backend
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting user payment details
export const getUserPaymentDetails = createAsyncThunk(
    'payment/getUserPaymentDetails',
    async ({jwt}, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/payment-details', {
                headers: { Authorization: `Bearer ${jwt}` }, // Make sure 'Bearer' is included if required by the backend
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentDetails: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPaymentDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addPaymentDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.paymentDetails = action.payload;
            })
            .addCase(addPaymentDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getUserPaymentDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserPaymentDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.paymentDetails = action.payload;
            })
            .addCase(getUserPaymentDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default paymentSlice.reducer;
