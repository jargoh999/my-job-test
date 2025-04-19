"use client";
import { Share2 } from "lucide-react"
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

export default function PodcastHeader() {
    const { topPodcasts, loading } = useSelector((state: RootState) => state.podcasts);

    // If loading or no podcasts, return default or loading state
    if (loading || !topPodcasts || topPodcasts.length === 0) {
        return (
            <div className="relative container mx-auto h-[380px] bg-gray-900">
                <div className="container mx-auto px-4 h-full relative z-10 flex items-center justify-center">
                    <p className="text-white">Loading podcasts...</p>
                </div>
            </div>
        );
    }
    //@ts-ignore

    // Use the first podcast from the fetched list
    const podcast = topPodcasts?.data[1];

    return (
        <div className="relative container mx-auto h-[380px] bg-black">
            {/* Background image with overlay */}


            <div className="container mx-auto px-4 h-full relative z-10">
                <div className="flex justify-end pt-4">
                    <button className="text-white p-2 rounded-full hover:bg-gray-800/50 transition-colors">
                        <Share2 className="w-5 h-5" fill="white" />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6 pt-4">
                    {/* Podcast cover image */}
                    <div className="w-64 h-64 flex-shrink-0">
                        <img
                            src={podcast.picture_url || "/assets/ppleandmp.png"}
                            alt={podcast.title}
                            width={256}
                            height={256}
                            className="object-cover"
                        />
                    </div>

                    {/* Podcast info */}
                    <div className="text-white pt-4">
                        <div className="uppercase text-sm tracking-wider text-gray-300 mb-2">PODCAST</div>
                        <h1 className="text-3xl font-bold mb-3">{podcast.title}</h1>
                        <p className="text-gray-300 max-w-2xl mb-6">
                            {podcast.description
                                ? podcast.description
                                    .slice(0, 116)
                                : "No description available."}
                        </p>

                        <div className="space-y-2">
                            <div className="text-sm text-gray-400">Available on</div>
                            <div className="flex items-center gap-4">
                                {/* Platform icons */}
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <img src="/assets/spot.png" alt="Spotify" width={50} height={50} />
                                    </div>
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <div className=" w-8 h-8 rounded-full flex items-center justify-center">
                                        <img src="/assets/pod.png" alt="Apple Podcasts" width={50} height={50} />
                                    </div>
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <img src="/assets/babe.png" alt="Google Podcasts" width={50} height={50} />
                                    </div>
                                </a>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    <div className="w-9 h-9 flex items-center justify-center">
                                        <img src="/assets/WokpaLogo.png" alt="Widgets" width={80} height={80} className="object-cover" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
