"use client"

import { useState } from "react"
import Pagination from "./pagination"
import EpisodeCard from "./episode-card"
import { Episode } from "@/lib/types"

interface EpisodesListProps {
    episodes: Episode[]
    episodesPerPage: number
}

export default function EpisodesList({ episodes, episodesPerPage }: EpisodesListProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(episodes.length / episodesPerPage)
    const indexOfLastEpisode = currentPage * episodesPerPage
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage
    const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode)

    return (
        <div>
            <div className="border-b pb-3 mb-6 space-y-5 ">
                <h2 className="text-sm font-medium text-gray-500">
                    ALL EPISODES <span className="text-gray-400">({episodes.length} AVAILABLE)</span>
                </h2>
            </div>

            <div className="space-y-[200px]">
                {currentEpisodes.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            )}
        </div>
    )
}
