import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/config/apiConfig.js';

// Async thunk for requesting a withdrawal
export const requestWithdrawal = createAsyncThunk(
    'withdrawal/requestWithdrawal',
    async ({ amount, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/withdrawal/${amount}`, null, {
                headers: { Authorization: `Bearer ${jwt}` }, // Make sure 'Bearer' is included if required by the backend
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for proceeding with a withdrawal
export const proceedWithdrawal = createAsyncThunk(
    'withdrawal/proceedWithdrawal',
    async ({ id, accept, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/admin/withdrawal/${id}/proceed/${accept}`, null, {
                headers: { Authorization: `Bearer ${jwt}` }, // Make sure 'Bearer' is included if required by the backend
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting withdrawal history
export const getWithdrawalsHistory = createAsyncThunk(
    'withdrawal/getWithdrawalsHistory',
    async ({jwt}, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/withdrawal', {
                headers: { Authorization: `Bearer ${jwt}` }, // Make sure 'Bearer' is included if required by the backend
            });
            console.log("withdrawal data"+response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting all withdrawal requests (admin)
export const getAllWithdrawalRequests = createAsyncThunk(
    'withdrawal/getAllWithdrawalRequests',
    async ({jwt}, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/admin/withdrawal', {
                headers: { Authorization: `Bearer ${jwt}` }, // Make sure 'Bearer' is included if required by the backend
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const withdrawalSlice = createSlice({
    name: 'withdrawal',
    initialState: {
        withdrawals: [],
        withdrawal: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestWithdrawal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(requestWithdrawal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionally, add the new withdrawal to the list
                state.withdrawal = action.payload;
            })
            .addCase(requestWithdrawal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(proceedWithdrawal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(proceedWithdrawal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionally, update the list of withdrawals
            })
            .addCase(proceedWithdrawal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getWithdrawalsHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWithdrawalsHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.withdrawals = action.payload;
            })
            .addCase(getWithdrawalsHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getAllWithdrawalRequests.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllWithdrawalRequests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Update the state with all withdrawal requests
            })
            .addCase(getAllWithdrawalRequests.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default withdrawalSlice.reducer;
