import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '@/config/apiConfig.js';
import {useNavigate} from "react-router-dom"; // Import the Axios instance

// Thunks for each API call
// Get User Wallet
export const getUserWallet = createAsyncThunk(
    'wallet/getUserWallet',
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/api/wallet/', {
                headers: {Authorization: `Bearer ${jwt}`},
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Wallet to Wallet Transfer
export const walletToWalletTransfer = createAsyncThunk(
    'wallet/walletToWalletTransfer',
    async ({jwt, walletId, walletTransaction}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/wallet/transfer/${walletId}/transfer`, walletTransaction, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                // Request was made but no response was received
                return rejectWithValue({ message: "No response received from the server" });
            } else {
                // Something happened in setting up the request that triggered an Error
                return rejectWithValue({ message: error.message });
            }
        }
    }
);

// Pay Order Payment
export const payOrderPayment = createAsyncThunk(
    'wallet/payOrderPayment',
    async ({jwt, orderId}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/api/wallet/order/${orderId}/pay`, null, {
                headers: {Authorization: `Bearer ${jwt}`},
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Add Balance to Wallet
export const addBalanceToWallet = createAsyncThunk(
    'wallet/addBalanceToWallet',
    async ({jwt, orderId, paymentId}, {rejectWithValue}) => {
        console.log("orderId and PaymentId" + orderId + paymentId)
        try {
            const response = await api.put(`/api/wallet/deposit`, null, {
                headers: {Authorization: `Bearer ${jwt}`},
                params: { order_id: orderId, session_id: paymentId },
            });


            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// from TransationController
// New Thunk: Get User Transactions
export const getUserTransactions = createAsyncThunk(
    'wallet/getUserTransactions',
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/api/transactions', {
                headers: {Authorization: `Bearer ${jwt}`},
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// from PaymentOrderController
// Initiate Payment Order
export const initiatePaymentOrder = createAsyncThunk(
    'wallet/initiatePaymentOrder',
    async ({jwt, paymentMethod, amount}, {rejectWithValue}) => {
        try {
            const response = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`, null, {
                headers: {Authorization: `Bearer ${jwt}`},
            });

            // Check if the payment URL is present in the response
            if (response.data && response.data.payment_url) {
                window.location.href = response.data.payment_url; // Redirect to the payment URL
            } else {
                throw new Error('Payment URL is missing in the response.');
            }

            return response.data;
        } catch (error) {
            // Handle any errors that occur during the API call
            return rejectWithValue(error.response ? error.response.data : {message: error.message});
        }
    }
);
// Create the slice
const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        wallet: null,
        transactions: [],  // Initialize transactions state
        paymentOrder: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get User Wallet
            .addCase(getUserWallet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.wallet = action.payload;
            })
            .addCase(getUserWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Wallet to Wallet Transfer
            .addCase(walletToWalletTransfer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(walletToWalletTransfer.fulfilled, (state, action) => {
                state.loading = false;
                state.wallet = action.payload;
            })
            .addCase(walletToWalletTransfer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Pay Order Payment
            .addCase(payOrderPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(payOrderPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.wallet = action.payload;
            })
            .addCase(payOrderPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Balance to Wallet
            .addCase(addBalanceToWallet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBalanceToWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.wallet = action.payload;
            })
            .addCase(addBalanceToWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get User Transactions
            .addCase(getUserTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getUserTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Initiate Payment Order
            .addCase(initiatePaymentOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initiatePaymentOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentOrder = action.payload;
            })
            .addCase(initiatePaymentOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default walletSlice.reducer;
