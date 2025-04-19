"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/redux/store';
import { fetchTopPodcasts } from '@/lib/redux/slices/podcastSlice';
import Link from 'next/link';

interface Podcast {
    id: number
    title: string
    episodes: number
    image: string
    subtitle?: string
}

export default function PodcastCarousel() {
    const dispatch = useDispatch<AppDispatch>();
    const { topPodcasts, loading } = useSelector((state: RootState) => state.podcasts);

    // Fetch podcasts on component mount
    useEffect(() => {
        dispatch(fetchTopPodcasts({ page: 1, perPage: 15 }));
    }, [dispatch]);
    //@ts-ignore
    // Transform API podcasts to match the expected interface
    const podcasts: Podcast[] = topPodcasts?.data?.map(podcast => ({
        id: podcast.id,
        title: podcast.title,
        episodes: podcast.subscriber_count+"" || "0",
        image: podcast.picture_url || "/placeholder.svg?height=400&width=300",
        subtitle: podcast.author
    })) || [];

    const carouselRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScrollButtons = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const carousel = carouselRef.current
        if (carousel) {
            carousel.addEventListener("scroll", checkScrollButtons)
            checkScrollButtons()
            return () => carousel.removeEventListener("scroll", checkScrollButtons)
        }
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const { clientWidth } = carouselRef.current
            const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="w-full container mx-auto">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Trending this week</h2>
                </div>
                <p>Loading podcasts...</p>
            </div>
        );
    }

    // Empty state
    if (!podcasts.length) {
        return (
            <div className="w-full container mx-auto">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Trending this week</h2>
                </div>
                <p>No podcasts available.</p>
            </div>
        );
    }

    return (
        <div className="w-full container mx-auto">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Trending this week</h2>
                <div className="flex items-center">
                    <div className="h-5 w-1 bg-red-600 mr-2"></div>
                    <p className="text-gray-700">Featured Podcasts</p>
                </div>
            </div>

            <div className="relative">
                {/* Left Navigation Button */}
                <AnimatePresence>
                    {canScrollLeft && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 -ml-4"
                            onClick={() => scroll("left")}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-700" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Carousel */}
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory scrollbar-hide"
                    style={{
                        msOverflowStyle: 'none',  // IE and Edge
                        scrollbarWidth: 'none',   // Firefox
                    }}
                    onScroll={checkScrollButtons}
                >
                    {podcasts.map((podcast, index) => (
                        <Link key={podcast.id} href={`/podcast`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="min-w-[260px] h-[360px] relative rounded-sm overflow-hidden shadow-md snap-start cursor-pointer"
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80 z-10" />
                                <img
                                    src={podcast.image || "/placeholder.svg"}
                                    alt={podcast.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                                    <div className="text-sm font-medium mb-2">{podcast?.episodes} Subscribers</div>
                                    <h3 className="text-xl font-bold leading-tight mb-1">{podcast.title}</h3>
                                    {podcast.subtitle && <p className="text-xs text-gray-200">{podcast.subtitle}</p>}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Right Navigation Button */}
                <AnimatePresence>
                    {canScrollRight && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 -mr-4"
                            onClick={() => scroll("right")}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-700" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
