import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { podcastApi } from '@/lib/services/podcastApi';
import { Episode } from '@/lib/types';

interface PaginationParams {
    page?: number;
    perPage?: number;
}

interface SearchParams extends PaginationParams {
    query: string;
}

export const fetchTopPodcasts = createAsyncThunk(
    'podcasts/fetchTopPodcasts',
    async ({ page = 1, perPage = 15 }: PaginationParams) => {
        const response = await podcastApi.getTopPodcasts(page, perPage);
        return response.data;
    }
);

export const fetchTrendingEpisodes = createAsyncThunk(
    'podcasts/fetchTrendingEpisodes',
    async ({ page = 1, perPage = 15 }: PaginationParams) => {
        const response = await podcastApi.getTrendingEpisodes(page, perPage);
        return response.data;
    }
);

export const searchPodcasts = createAsyncThunk(
    'podcasts/searchPodcasts',
    async ({ query, page = 1, perPage = 15 }: SearchParams) => {
        const response = await podcastApi.searchPodcasts(query, page, perPage);
        return response.data;
    }
);

export const fetchPodcastEpisodes = createAsyncThunk(
    'podcasts/fetchPodcastEpisodes',
    async ({ podcastId, page = 1, perPage = 15 }: { podcastId: number } & PaginationParams) => {
        const response = await podcastApi.getPodcastEpisodes(podcastId, page, perPage);
        return response.data;
    }
);

export const fetchEpisodeById = createAsyncThunk(
    'podcasts/fetchEpisodeById',
    async (episodeId: number) => {
        const response = await podcastApi.getEpisodeById(episodeId);
        return response.data;
    }
);

const podcastSlice = createSlice({
    name: 'podcasts',
    initialState: {
        topPodcasts: [],
        trendingEpisodes: [],
        searchResults: [],
        podcastEpisodes: [] as Episode[],
        loading: false,
        error: null as string | null,
        selectedPodcastId: null as number | null,
        currentEpisode: null as any,
        episodeLoading: false,
        episodeError: null as string | null,
    },
    reducers: {
        selectPodcast: (state, action) => {
            state.selectedPodcastId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopPodcasts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTopPodcasts.fulfilled, (state, action) => {
                state.loading = false;
                state.topPodcasts = action.payload;
            })
            .addCase(fetchTopPodcasts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch top podcasts';
            })
            .addCase(fetchPodcastEpisodes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPodcastEpisodes.fulfilled, (state, action) => {
                state.loading = false;
                state.podcastEpisodes = action.payload;
            })
            .addCase(fetchPodcastEpisodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch podcast episodes';
            })
            .addCase(fetchTrendingEpisodes.fulfilled, (state, action) => {
                state.trendingEpisodes = action.payload;
            })
            .addCase(searchPodcasts.fulfilled, (state, action) => {
                state.searchResults = action.payload;
            })
            .addCase(fetchEpisodeById.pending, (state) => {
                state.episodeLoading = true;
                state.episodeError = null;
            })
            .addCase(fetchEpisodeById.fulfilled, (state, action) => {
                state.currentEpisode = action.payload;
                state.episodeLoading = false;
            })
            .addCase(fetchEpisodeById.rejected, (state, action) => {
                state.episodeLoading = false;
                state.episodeError = action.error.message || 'Failed to fetch episode';
            });
    }
});

export const { selectPodcast } = podcastSlice.actions;
export default podcastSlice.reducer;