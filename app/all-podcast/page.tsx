"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PodcastGrid from "@/components/all-podcast-grid"
import PodcastFilters from "@/components/all-podcast-filter"
import CategorySection from "@/components/category-section"
import { RootState, AppDispatch } from '@/lib/redux/store'
import { fetchTopPodcasts } from '@/lib/redux/slices/podcastSlice'
import { fetchTopCategories } from '@/lib/redux/slices/categorySlice'
import { Podcast } from "@/lib/podcast"

export default function PodcastsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        topPodcasts,
        loading: podcastLoading,
        error: podcastError
    } = useSelector((state: RootState) => state.podcasts);

    const {
        topCategories,
        loading: categoryLoading,
        error: categoryError
    } = useSelector((state: RootState) => state.categories);

    // Fetch top podcasts on component mount
    useEffect(() => {
        dispatch(fetchTopPodcasts({ page: 2, perPage: 15 }));
        dispatch(fetchTopCategories());
    }, [dispatch]);

    // Handle loading and error states
    if (podcastLoading || categoryLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (podcastError || categoryError) {
        return (
            <div className="text-center text-red-500 py-10">
                <p>Error loading content:</p>
                {podcastError && <p>Podcasts: {podcastError}</p>}
                {categoryError && <p>Categories: {categoryError}</p>}
            </div>
        );
    }

    // Extract the actual podcast data from the API response
    const podcastList: Podcast[] = (topPodcasts as { data?: Podcast[] })?.data || [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">ALL PODCASTS</h1>

            <PodcastFilters />

            <PodcastGrid
                podcasts={podcastList}
                itemsPerPage={10}
            />

            <section className="mt-16">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Explore Podcast Categories</h2>
                <CategorySection
                    title="Podcast Categories"
                    items={topCategories}
                />
            </section>
        </div>
    )
}
