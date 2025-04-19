"use client"

import { useState, useEffect } from "react"
import type { Podcast, CategoryOption } from "@/lib/podcast"
import PodcastCard from "./all-podcast-card"
import Pagination from "./all-podcast-pagination"

interface PodcastGridProps {
    podcasts?: Podcast[] | null
    itemsPerPage?: number
}

export default function PodcastGrid({ podcasts = [], itemsPerPage = 10 }: PodcastGridProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [paginatedPodcasts, setPaginatedPodcasts] = useState<Podcast[]>([])

    const safePodcasts = Array.isArray(podcasts) ? podcasts : []

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedPodcasts(safePodcasts.slice(startIndex, endIndex))

        if (currentPage > Math.ceil(safePodcasts.length / itemsPerPage)) {
            setCurrentPage(1)
        }
    }, [safePodcasts, currentPage, itemsPerPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (safePodcasts.length === 0) {
        return <div className="text-center text-gray-500 py-10">No podcasts available</div>
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {paginatedPodcasts.map((podcast) => (
                    <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
            </div>

            <Pagination
                totalItems={safePodcasts.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
