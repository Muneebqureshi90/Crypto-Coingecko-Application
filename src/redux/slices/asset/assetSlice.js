import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '@/config/apiConfig.js';

// Define initial state
const initialState = {
    assets: [],
    asset: null,
    assetDetails: null, // Detailed asset information
    status: 'idle',
    error: null,
};

// Async thunks for API calls
export const fetchAssetById = createAsyncThunk(
    'asset/fetchAssetById',
    async ({assetId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/asset/${assetId}`, {
                headers: {Authorization: `Bearer ${jwt}`},
            });
            console.log('Fetched asset:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching asset:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchUserAssetByCoinId = createAsyncThunk(
    'asset/fetchUserAssetByCoinId',
    async ({coinId, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/asset/coin/${coinId}/user`, {
                headers: {Authorization: `Bearer ${jwt}`},
            });
            console.log('Fetched user asset by coin ID:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching user asset by coin ID:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAllAssets = createAsyncThunk(
    'asset/fetchAllAssets',
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/api/asset', {
                headers: {Authorization: `Bearer ${jwt}`},
            });
            console.log('Fetched all assets:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching all assets:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create the slice
const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssetById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssetById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.asset = action.payload; // General asset information
                state.assetDetails = action.payload.details; // Assuming `details` contains detailed information
            })
            .addCase(fetchAssetById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchUserAssetByCoinId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserAssetByCoinId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.asset = action.payload; // General asset information
                state.assetDetails = action.payload.details; // Assuming `details` contains detailed information
            })
            .addCase(fetchUserAssetByCoinId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchAllAssets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllAssets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assets = action.payload;
            })
            .addCase(fetchAllAssets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default assetSlice.reducer;
