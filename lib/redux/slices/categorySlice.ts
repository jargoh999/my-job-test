import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { podcastApi } from '@/lib/services/podcastApi';

export const fetchTopCategories = createAsyncThunk(
    'categories/fetchTopCategories',
    async () => {
        const response = await podcastApi.getTopCategories();
        return response.data;
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        topCategories: [],
        loading: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTopCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.topCategories = action.payload;
            })
            .addCase(fetchTopCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch top categories';
            });
    }
});

export default categorySlice.reducer;