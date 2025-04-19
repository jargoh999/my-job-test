"use client"

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/redux/store'
import {
    fetchTopPodcasts,
    fetchTrendingEpisodes
} from '@/lib/redux/slices/podcastSlice'
import PodcastHeader from "@/components/podcast-header"
import EpisodesList from "@/components/episode-list"
import AdSidebar from "@/components/ad-sidebar"
import { Episode } from '@/lib/types'

export default function PodcastPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { trendingEpisodes, topPodcasts, loading, error } = useSelector((state: RootState) => state.podcasts);

    // Fetch episodes and top podcasts on component mount
    useEffect(() => {
        // Dispatch both actions in parallel
        Promise.all([
            dispatch(fetchTrendingEpisodes({ page: 1, perPage: 8 })),
            dispatch(fetchTopPodcasts({ page: 1, perPage: 2 }))
        ]);
    }, [dispatch]);

    // Transform API episodes to match the expected interface
    const episodes: Episode[] = (
        Array.isArray(trendingEpisodes)
            ? trendingEpisodes
            : (trendingEpisodes as any)?.data || []
    ).map((episode: any) => {
        console.log('Individual Episode:', episode);
        return {
            id: episode.id || Math.random(),
            title: episode.title || "Untitled Episode",
            description: episode.description || "No description available",
            date: episode.created_at
                ? new Date(episode.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                }).toUpperCase()
                : "Unknown Date",
            duration: episode.duration ? `${episode.duration} MINS` : "45 MINS",
            image: episode.picture_url || episode.image || "/placeholder.svg?height=200&width=200",
        }
    }).slice(0, 8);

    // Log the transformed episodes
    console.log('Transformed Episodes:', episodes);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl font-semibold">Loading podcast episodes...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <div className="text-xl font-semibold">
                    Error loading episodes: {error}
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 space-y-[]">
            <PodcastHeader />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        {episodes.length > 0 ? (
                            <EpisodesList
                                episodes={episodes}
                                episodesPerPage={4}
                            />
                        ) : (
                            <div className="text-center text-gray-500 text-xl">
                                No episodes available for this podcast.
                            </div>
                        )}
                    </div>
                    <div className="lg:w-1/3">
                        <AdSidebar />
                    </div>
                </div>
            </div>
        </main>
    )
}
