import Image from "next/image"
import { Play } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/redux/store';
import { useEffect } from 'react';
import { fetchTrendingEpisodes } from '@/lib/redux/slices/podcastSlice';
import Link from "next/link";
import { Episode } from "@/types/podcast";

interface PodcastCardProps {
    title: string
    date: string
    duration: string
    imageUrl: string
    logoUrl?: string
    alt?: string
}

export function PodcastCard({
    title,
    date,
    duration,
    imageUrl,

    alt = "Podcast thumbnail",
}: PodcastCardProps) {
    return (
        <div className="w-[280px] h-[350px] bg-gray-200 rounded-lg overflow-visible shadow-md relative group">
            {/* Main Image */}
            <div className="relative h-[230px] w-full">
                <img src={imageUrl || "/placeholder.svg"} alt={alt} className="object-cover" />


            </div>

            {/* Content Section */}
            <div className="bg-white p-4 pt-6 h-[120px] relative overflow-visible">
                {/* Play Button - positioned to overlap */}
                <div className="absolute top-6 left-[-20px] z-10 group-hover:scale-105 transition-transform">
                    <Link href="/episode">

                        <button className="bg-red-600 rounded-full p-2 shadow-md hover:bg-red-700 transition-colors">
                            <Play className="h-8 w-8 text-white" fill="white" />
                        </button>
                    </Link>
                </div>

                {/* Text Content - with left padding to accommodate the play button */}
                <div className="pl-16">
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2">{title}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                        {date} | {duration}
                    </p>
                </div>
            </div>
        </div>
    )
}

const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Usage
// Output: "February 23, 2024"

export default function EditorsPicksSection() {
    const dispatch = useDispatch<AppDispatch>();
    const { trendingEpisodes, loading } = useSelector((state: RootState) => state.podcasts);

    useEffect(() => {
        dispatch(fetchTrendingEpisodes({ page: 1, perPage: 5 }));
    }, [dispatch]);
    //@ts-ignore
    const episodesToRender = trendingEpisodes?.data?.length >= 3
        //@ts-ignore
        ? trendingEpisodes.data.slice(2, 4)
        : [
            {
                title: "The Future of Work: Embracing Remote and Hybrid Workforces",
                date: "Sept 7, 2023",
                duration: "35 mins",
                imageUrl: "/assets/adcover.png",
                logoUrl: "/placeholder.svg?height=40&width=40",
                alt: "Woman in black turtleneck"
            },
            {
                title: "The Future of Work: Embracing Remote and Hybrid Workforces",
                date: "Sept 7, 2023",
                duration: "35 mins",
                imageUrl: "/assets/adcover.png",
                logoUrl: "/placeholder.svg?height=40&width=40",
                alt: "Woman in black turtleneck"
            }
        ];

    // Large featured image (first episode or default)
    const featuredEpisode = (trendingEpisodes as unknown as { data: Episode[] })?.data?.[1] || {
        title: "Bridging the Financing Gap in Nigeria's off-grid sector",
        imageUrl: "/assets/adcover.png"
    };

    return (
        <section className="w-full bg-white p-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">EDITOR'S PICKS</h2>
                    <div className="flex items-center">
                        <div className="h-5 w-1 bg-red-600 mr-2"></div>
                        <p className="text-gray-700">Featured Episodes</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Large Featured Card on Left - Takes up roughly half the width */}
                    <div className="md:w-1/2 relative overflow-hidden rounded-none">
                        <div className="relative h-[500px]">
                            <img
                                //@ts-ignore
                                src={featuredEpisode?.picture_url}
                                alt={featuredEpisode?.title || "Featured Episode"}
                                width={400}
                                height={200}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/30 text-white">
                                <div className="flex items-center mb-2">
                                    <button className="bg-red-600 rounded-full p-2 mr-3">
                                        <Play className="h-6 w-6 text-white" fill="white" />
                                    </button>
                                    <h3 className="text-2xl font-bold">
                                        {featuredEpisode.title || "Bridging the Financing Gap in Nigeria's off-grid sector"}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column with Three Divs (2 side by side + 1 advertisement below) */}
                    <div className="md:w-1/2 flex flex-col gap-4 ">
                        {/* Top Row with Two Cards Side by Side */}
                        <div className="flex flex-col md:flex-row gap-[100px] h-[350px] pl-[50px] ">
                            {episodesToRender.map((episode, index) => (
                                <PodcastCard
                                    key={index}
                                    title={episode.title || "The Future of Work: Embracing Remote and Hybrid Workforces"}
                                    date={formatDate(episode.created_at) || "Sept 7, 2023"}
                                    duration={episode.duration || "35 mins"}
                                    imageUrl={episode.picture_url}
                                    logoUrl={episode.logoUrl}
                                    alt={episode.alt}
                                />
                            ))}
                        </div>

                        {/* Advertisement Banner Below */}
                        <div className="h-[130px] w-[100px]bg-gray-300 rounded-none overflow-hidden">
                            <div className="p-1 text-right text-xs text-gray-400 bg-sticky">ADVERTISEMENT</div>
                            <div className="h-full flex items-center justify-center p-4">
                                <Image src="/assets/adcover.png" alt="Advertisement" width={400} height={200} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
