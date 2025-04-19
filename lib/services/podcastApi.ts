import axios from 'axios';

const BASE_URL = 'https://api.wokpa.app/api/listeners';

export const podcastApi = {
    getTopPodcasts: async (page = 1, perPage = 15) => {
        const response = await axios.get(`${BASE_URL}/top-podcasts`, {
            params: { page, per_page: perPage }
        });
        return response.data;
    },

    getTopCategories: async () => {
        const response = await axios.get(`${BASE_URL}/top-categories`);
        return response.data;
    },

    getPopularPodcast: async (page = 1, perPage = 15) => {
        const response = await axios.get(`${BASE_URL}/popular-and-trending-podcasts`, {
            params: { page, per_page: perPage }
        });
        return response.data;
    },

    searchPodcasts: async (query: string, page = 1, perPage = 15) => {
        const response = await axios.get(`${BASE_URL}/podcast-search`, {
            params: { q: query, page, per_page: perPage }
        });
        return response.data;
    },

    getPodcastById: async (podcastId: number) => {
        const response = await axios.get(`${BASE_URL}/podcasts/${podcastId}`);
        return response.data;
    },

    getPodcastEpisodes: async (podcastId: number, page = 1, perPage = 15) => {
        const response = await axios.get(`${BASE_URL}/podcasts/${podcastId}/episodes`, {
            params: { page, per_page: perPage }
        });
        return response.data;
    },

    getEpisodeById: async (episodeId: number) => {
        const response = await axios.get(`${BASE_URL}/episodes/${episodeId}`);
        return response.data;
    },

    getTrendingEpisodes: async (page = 1, perPage = 15) => {
        const response = await axios.get(`${BASE_URL}/episodes/latest`, {
            params: { page, per_page: perPage }
        });
        return response.data;
    }
};