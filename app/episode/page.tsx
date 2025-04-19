"use client"

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/redux/store'
import { fetchEpisodeById } from '@/lib/redux/slices/podcastSlice'
import PodcastPlayer from "@/components/podcast-player"
import EpisodeQueue from "@/components/episode-queue"
import Reachout from "@/components/reachout"

export default function EpisodePage() {
    const dispatch = useDispatch<AppDispatch>()
    const { currentEpisode, episodeLoading, episodeError } = useSelector((state: RootState) => state.podcasts)

    // Fetch episode on component mount (using a hardcoded ID for now)
    useEffect(() => {
        dispatch(fetchEpisodeById(1)); // Replace with dynamic ID later
    }, [dispatch])

    // Handle loading and error states
    if (episodeLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading episode...</p>
            </div>
        )
    }

    if (episodeError) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <p>Error loading episode: {episodeError}</p>
            </div>
        )
    }

    // If no episode is loaded, show a placeholder
    if (!currentEpisode) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>No episode found.</p>
            </div>
        )
    }

    // Transform the episode data to match PodcastPlayer's expected format
    const episode = {
        id: currentEpisode.id.toString(),
        title: currentEpisode.title,
        date: new Date(currentEpisode.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).toUpperCase(),
        duration: `${currentEpisode.duration || 28} MINS`,
        description: currentEpisode.description,
        thumbnail: currentEpisode.picture_url || "/images/podcast-thumbnail.png",
        audioSrc: currentEpisode.audio_url || "/audio/podcast-episode.mp3",
        currentTime: 0,
        totalDuration: currentEpisode.duration ? currentEpisode.duration * 60 : 1684
    }

    return (
        <main className="w-full container mx-auto bg-white">
            <div className="mx-auto px-4 py-6 space-y-5">
                <PodcastPlayer episode={episode} />
                <EpisodeQueue />
                <Reachout />
            </div>
        </main>
    )
}
