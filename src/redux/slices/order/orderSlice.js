import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/config/apiConfig.js';

// Async thunk to process order payment
export const payOrder = createAsyncThunk(
    'order/payOrder',
    async ({ jwt, orderData }, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/order/pay', orderData, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            console.log('Order Payment Data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Order Payment Error:', error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to get order by ID
export const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async ({ jwt, orderId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/order/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            console.log('Order Data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Get Order Error:', error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to get all orders for the user
export const getAllOrdersForUser = createAsyncThunk(
    'order/getAllOrdersForUser',
    async ({ jwt, orderType, assetSymbol }, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/order', {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
                params: {
                    orderType,
                    assetSymbol,
                },
            });
            console.log('All Orders Data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Get All Orders Error:', error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle payOrder
            .addCase(payOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle getOrderById
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle getAllOrdersForUser
            .addCase(getAllOrdersForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrdersForUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrdersForUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
