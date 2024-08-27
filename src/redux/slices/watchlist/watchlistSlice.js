import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/config/apiConfig.js';

// Initial state
const initialState = {
    watchlist: { coins: [] }, // Initialize as an object with an empty coins array
    status: 'idle',
    error: null,
};

// Async thunk to fetch the user's watchlist
export const fetchUserWatchlist = createAsyncThunk(
    'watchlist/fetchUserWatchlist',
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/watchlist/user', {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log('Fetched user watchlist:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching user watchlist:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk to create a new watchlist
export const createWatchlist = createAsyncThunk(
    'watchlist/createWatchlist',
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/watchlist/create', {}, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log('Created watchlist:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating watchlist:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk to add a coin to the user's watchlist
export const addCoinToWatchlist = createAsyncThunk(
    'watchlist/addCoinToWatchlist',
    async ({ coinId, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/api/watchlist/add/coin/${coinId}`, {}, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log('Added coin to watchlist:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding coin to watchlist:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk to fetch a watchlist by its ID
export const fetchWatchlistById = createAsyncThunk(
    'watchlist/fetchWatchlistById',
    async ({ watchlistId, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/watchlist/${watchlistId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log('Fetched watchlist by ID:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching watchlist by ID:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create the slice
const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        clearWatchlist(state) {
            state.watchlist = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserWatchlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserWatchlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchlist = action.payload;
            })
            .addCase(fetchUserWatchlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createWatchlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createWatchlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchlist = action.payload;
            })
            .addCase(createWatchlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addCoinToWatchlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCoinToWatchlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.watchlist) {
                    state.watchlist.coins.push(action.payload);
                }
            })
            .addCase(addCoinToWatchlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchWatchlistById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWatchlistById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchlist = action.payload;
            })
            .addCase(fetchWatchlistById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
