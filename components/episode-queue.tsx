"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/redux/store'
import { fetchPodcastEpisodes } from '@/lib/redux/slices/podcastSlice'
import { Play } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function EpisodeQueue() {
    const dispatch = useDispatch<AppDispatch>()
    const { podcastEpisodes, loading, error } = useSelector((state: RootState) => state.podcasts)
    const [currentPage, setCurrentPage] = useState(1)
    const episodesPerPage = 4

    // Fetch latest episodes on component mount
    useEffect(() => {
        const randomPodcastId = Math.floor(Math.random() * 100) + 1
        dispatch(fetchPodcastEpisodes({ podcastId: randomPodcastId, page: 1, perPage: 12 }))
    }, [dispatch])

    // If episodes are not loaded yet
    if (loading) {
        return (
            <div className="text-white text-center py-8">
                Loading episodes...
            </div>
        )
    }

    // If there was an error
    if (error) {
        return (
            <div className="text-red-500 text-center py-8">
                Error loading episodes: {error}
            </div>
        )
    }

    // If no episodes
    if (!podcastEpisodes || podcastEpisodes.length === 0) {
        return (
            <div className="text-white text-center py-8">
                No episodes available
            </div>
        )
    }
    //@ts-ignore
    // Ensure podcastEpisodes is an array
    const episodesArray = Array.isArray(podcastEpisodes?.data) ? podcastEpisodes.data : []

    const indexOfLastEpisode = currentPage * episodesPerPage
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage
    const currentEpisodes = episodesArray.slice(indexOfFirstEpisode, indexOfLastEpisode)
    const totalPages = Math.ceil(episodesArray.length / episodesPerPage)

    return (
        <div>
            <h2 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                Latest Episodes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentEpisodes.map((episode) => (
                    <EpisodeCard
                        key={episode.id}
                        episode={{
                            id: episode.id,
                            title: episode.title,
                            date: episode.published_at,
                            duration: episode.duration,
                            picture_url: episode.picture_url
                        }}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                    >
                        Previous
                    </Button>

                    {Array.from({ length: totalPages }).map((_, index) => (
                        <Button
                            key={index}
                            variant={currentPage === index + 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(index + 1)}
                            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                        >
                            {index + 1}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}

interface EpisodeCardProps {
    episode: {
        id: number
        title: string
        date: string
        duration: number
        picture_url?: string
    }
}

export function EpisodeCard({
    episode: {
        title,
        date,
        duration,
        picture_url,
    },
}: EpisodeCardProps) {
    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    return (
        <div className="w-[280px] h-[350px] bg-gray-200 rounded-lg overflow-visible shadow-md relative group">
            {/* Main Image */}
            <div className="relative h-[230px] w-full">
                <img
                    src={picture_url || "/placeholder.svg"}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Content Section */}
            <div className="bg-white p-4 pt-6 h-[120px] relative overflow-visible">
                {/* Play Button - positioned to overlap */}
                <div className="absolute top-6 left-[-20px] z-10 group-hover:scale-105 transition-transform">
                    <button className="bg-red-600 rounded-full p-2 shadow-md hover:bg-red-700 transition-colors">
                        <Play className="h-8 w-8 text-white" fill="white" />
                    </button>
                </div>

                {/* Text Content - with left padding to accommodate the play button */}
                <div className="pl-16">
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2">{title}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                        {formattedDate} | {duration} MINS
                    </p>
                </div>
            </div>
        </div>
    )
}
