"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronRight, Share2, Download, GiftIcon } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/redux/store';
import { fetchTrendingEpisodes } from '@/lib/redux/slices/podcastSlice';
import Link from 'next/link';

interface Episode {
    id: number
    title: string
    date: string
    duration: string
    thumbnail: string
    isPart2?: boolean
    showLogo?: string
}

export default function EpisodeList() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const dispatch = useDispatch<AppDispatch>();
    const { trendingEpisodes, loading } = useSelector((state: RootState) => state.podcasts);

    // Fetch episodes on component mount
    useEffect(() => {
        dispatch(fetchTrendingEpisodes({ page: 1, perPage: 15 }));
    }, [dispatch]);
    //@ts-ignore
    // Transform API episodes to match the expected interface
    const episodes: Episode[] = trendingEpisodes?.data?.map(episode => ({
        id: episode.id,
        title: episode.title,
        date: new Date(episode.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).toUpperCase(),
        duration: episode.duration ? `${episode.duration} MINS` : "45 MINS",
        thumbnail: episode.picture_url || "/placeholder.svg?height=200&width=200",
        isPart2: false, // Add logic if needed
    })).slice(1) || [];
    // Check if can scroll right
    const checkScrollability = () => {
        if (scrollRef.current) {
            const { scrollWidth, scrollLeft, clientWidth } = scrollRef.current
            setCanScrollRight(scrollWidth > scrollLeft + clientWidth)
        }
    }

    // Scroll animation to indicate scrollability
    useEffect(() => {
        if (showScrollIndicator && scrollRef.current && canScrollRight) {
            const timer = setTimeout(() => {
                scrollRef.current?.scrollBy({
                    left: 60,
                    behavior: "smooth",
                })

                setTimeout(() => {
                    scrollRef.current?.scrollBy({
                        left: -60,
                        behavior: "smooth",
                    })
                }, 700)
            }, 1500)

            return () => clearTimeout(timer)
        }
    }, [showScrollIndicator, canScrollRight])

    // Add scroll event listener
    useEffect(() => {
        const scrollContainer = scrollRef.current

        const handleScroll = () => {
            setShowScrollIndicator(false)
            checkScrollability()
        }

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll)
            checkScrollability()
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll)
            }
        }
    }, [])

    // Handle manual scroll with button
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            })
            setShowScrollIndicator(false)
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="w-full container mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Newly added episodes</h2>
                <p>Loading episodes...</p>
            </div>
        );
    }

    // Empty state
    if (!episodes.length) {
        return (
            <div className="w-full container mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Newly added episodes</h2>
                <p>No episodes available.</p>
            </div>
        );
    }

    return (
        <div className="w-full container mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Newly added episodes</h2>

            <div className="relative">
                {/* Scrollable container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-5 pb-6 hide-scrollbar"
                    style={{ scrollbarWidth: "none" }}
                >
                    {episodes.map((episode) => (
                        
                        <Link key={episode.id} href={`/episode`}>
                            <div className="flex-shrink-0 w-[220px] group cursor-pointer">
                                {/* Episode Card */}
                                <div className="bg-sticky rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                    {/* Thumbnail */}
                                    <div className="relative h-[124px] bg-gray-100 flex items-center justify-center">
                                        <img
                                            src={episode.thumbnail || "/placeholder.svg"}
                                            alt={episode.title}
                                            className="w-full max-h-full object-cover"
                                        />

                                        {/* Part 2 Badge */}
                                        {episode.isPart2 && (
                                            <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                                                PART 2
                                            </div>
                                        )}
                                    </div>

                                    {/* Episode Info */}
                                    <div className="p-3 bg-sticky">
                                        <div className="flex items-center text-xs text-gray-500 mb-2">
                                            <span>{episode.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{episode.duration}</span>
                                        </div>

                                        <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">{episode.title}</h3>

                                        <div className="flex items-center justify-between">
                                            <button className="text-xs text-gray-600 hover:text-gray-900">More Episodes</button>

                                            <div className="flex space-x-2">
                                                <button className="text-gray-400 hover:text-gray-700 ">
                                                    <Share2 size={16} />
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-700">
                                                    <GiftIcon size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Scroll button */}
                {canScrollRight && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                )}
            </div>
        </div>
    )
}
