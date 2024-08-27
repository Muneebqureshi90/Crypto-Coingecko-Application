import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '@/config/apiConfig.js'; // Import the Axios instance

// Define the initial state
const initialState = {
    coins: [],
    coinDetail: null,
    chartData: null,
    searchResults: null,
    top50Coins: null,
    trendingCoins: null,
    detailedCoin: null, // New state property for detailed coin info
    status: 'idle',
    error: null,
};

// Create async thunks for each API call
export const fetchCoinList = createAsyncThunk('coins/fetchCoinList', async (page = 1, {rejectWithValue}) => {
    try {
        const response = await api.get(`/coins?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching coin details:", error);
        if (error.response && error.response.status === 429) {
            alert("Too many requests. Please try again later.");
        } else {
            alert("An error occurred while fetching coin details.");
        }
        return rejectWithValue(error.response.data);
    }
});

// Create an async thunk for fetching coin details
export const fetchCoinDetails = createAsyncThunk('coins/fetchCoinDetails', async ({coinId, jwt}, {rejectWithValue}) => {
    try {
        // Make the API request with the JWT token in the header
        const response = await api.get(`/coins/details/${coinId}`, {
            headers: {Authorization: `Bearer ${jwt}`},
        });
        // console.log("reponcse data of coins" + response.data);
        // Return the data if the request is successful
        return response.data;
    } catch (error) {
        console.error("Error fetching coin details:", error);

        // Handle specific status codes
        if (error.response) {
            const {status} = error.response;

            if (status === 429) {
                alert("Too many requests. Please try again later.");
            } else {
                alert("An error occurred while fetching coin details.");
            }

            // Return a rejection with the response data
            return rejectWithValue(error.response.data);
        } else {
            // Handle cases where there is no response (e.g., network errors)
            alert("A network error occurred. Please check your connection.");
            return rejectWithValue({message: "Network error"});
        }
    }
});


export const fetchMarketChart = createAsyncThunk(
    'coin/fetchMarketChart',
    async ({ coinId, days }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/coins/${coinId}/chart`, {
                params: { days },
                // headers: { Authorization: `Bearer ${jwt}`}
            });
            // console.log("Market Chart Data:", response.data); // Add this for debugging
            return response.data;
        } catch (error) {
            console.error("Error fetching market chart data:", error);
            if (error.response) {
                const { status } = error.response;
                if (status === 429) {
                    alert("Too many requests. Please try again later.");
                } else {
                    alert("An error occurred while fetching market chart data.");
                }
                return rejectWithValue(error.response.data);
            } else {
                alert("A network error occurred. Please check your connection.");
                return rejectWithValue({ message: "Network error" });
            }
        }
    }
);

export const searchCoin = createAsyncThunk('coins/searchCoin', async (keyword) => {
    try {
        const response = await api.get(`/coins/search?keyword=${keyword}`); // Use the Axios instance
        return response.data;
    } catch (error) {
        console.error("Error fetching coin details:", error);
        if (error.response && error.response.status === 429) {
            alert("Too many requests. Please try again later.");
        } else {
            alert("An error occurred while fetching coin details.");
        }
        return rejectWithValue(error.response.data);
    }
});

export const fetchTop50CoinsByMarketCapRank = createAsyncThunk('coins/fetchTop50CoinsByMarketCapRank', async ({jwt}, {rejectWithValue}) => {
    try {
        const response = await api.get(`/coins/top50`, {
            headers: {Authorization: `Bearer ${jwt}`},
        });
        console.log("API Response Data:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error("Error fetching coin details:", error);
        if (error.response && error.response.status === 429) {
            alert("Too many requests. Please try again later.");
        } else {
            alert("An error occurred while fetching coin details.");
        }
        return rejectWithValue(error.response.data);
    }
});


export const fetchTrendingCoins = createAsyncThunk('coins/fetchTrendingCoins', async ({jwt}, {rejectWithValue}) => {
    try {

        const response = await api.get(`/coins/trending`, {
            headers: {Authorization: `Bearer ${jwt}`},
        });
        console.log("API Response Data:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error("Error fetching coin details:", error);
        if (error.response && error.response.status === 429) {
            alert("Too many requests. Please try again later.");
        } else {
            alert("An error occurred while fetching coin details.");
        }
        return rejectWithValue(error.response.data);
    }
});

export const fetchDetailedCoin = createAsyncThunk('coins/fetchDetailedCoin', async (coinId) => {
    const response = await api.get(`/coins/details/${coinId}`); // Use the Axios instance
    return response.data;
});

// Create the slice
const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.coins = action.payload;
            })
            .addCase(fetchCoinList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCoinDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.coinDetails = action.payload;
            })
            .addCase(fetchCoinDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchMarketChart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMarketChart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.chartData = action.payload;
            })
            .addCase(fetchMarketChart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(searchCoin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchCoin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchResults = action.payload;
            })
            .addCase(searchCoin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTop50CoinsByMarketCapRank.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTop50CoinsByMarketCapRank.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.top50Coins = action.payload;
            })
            .addCase(fetchTop50CoinsByMarketCapRank.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTrendingCoins.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trendingCoins = action.payload;
            })
            .addCase(fetchTrendingCoins.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchDetailedCoin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDetailedCoin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.detailedCoin = action.payload;
            })
            .addCase(fetchDetailedCoin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export default coinSlice.reducer;
