import Image from "next/image"
import { Play, FileText, Share2, Download } from "lucide-react"
import type { Episode } from "@/lib/types"
import Link from "next/link"

interface EpisodeCardProps {
    episode: Episode
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 border-b pb-[25px]">
            {/* Episode thumbnail */}
            <div className="w-full md:w-32 h-32 flex-shrink-0">
                <img
                    src={episode.image || "/placeholder.svg"}
                    alt={episode.title}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Episode details */}
            <div className="flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>{episode.date}</span>
                    <span>•</span>
                    <span>{episode.duration}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{episode.description}</p>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                    <Link href="/episode" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition">
                        <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                            <Play className="w-5 h-5 ml-0.5" fill="white"/>
                        </button>
                    </Link>

                    <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                        <FileText className="w-4 h-4" />
                    </button>

                    <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>

                    <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
