import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/auth/authSlice.js';
import userReducer from '@/redux/slices/user/userSlice.js';
import coinReducer from '@/redux/slices/coins/coinSlice.js';
import walletReducer from '@/redux/slices/wallet/walletSlice.js';
import withdrawalReducer from '@/redux/slices/withdrawal/withdrawalSlice';  // Import the reducer
import paymentReducer from '@/redux/slices/payment/paymentSlice.js';  // Import the reducer
import orderReducer from '@/redux/slices/order/orderSlice.js';  // Import the reducer
import assetReducer from '@/redux/slices/asset/assetSlice.js'; // Import the asset reducer
import watchlistReducer from '@/redux/slices/watchlist/watchlistSlice.js'; // Import the watchlist reducer

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        coin: coinReducer,
        wallet: walletReducer,
        withdrawal: withdrawalReducer,
        payment: paymentReducer,
        order: orderReducer,
        asset: assetReducer,
        watchlist: watchlistReducer,

    },
});

export default store;
