import { Play, Share2, Bookmark } from "lucide-react"
import type { Podcast } from "@/lib/podcast"

interface PodcastCardProps {
    podcast: Podcast
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
    return (
        <div className="group relative">
            {podcast.featured && (
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                    <span>F</span>
                </div>
            )}
            <div className="overflow-hidden rounded-lg">
                <div className="relative aspect-square overflow-hidden">
                    <img
                        src={podcast.picture_url || "/placeholder.svg?height=400&width=400"}
                        alt={podcast.title}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="mt-3">
                    <div className="text-sm font-medium text-green-600">{podcast.category}</div>
                    <h3 className="text-sm font-medium mt-1 line-clamp-2">{podcast.title}</h3>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                        <span>{podcast.date}</span>
                        <span className="font-medium">{podcast.duration}</span>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <button className="w-7 h-7 flex items-center justify-center bg-red-500 rounded-full text-white">
                            <Play size={14} className="ml-0.5" />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full">
                            <Share2 size={14} />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full">
                            <Bookmark size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
