"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Play, Pause, RotateCcw, RotateCw, Share2, Download, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PodcastEpisode {
    id: string
    title: string
    date: string
    duration: string
    description: string
    thumbnail: string
    audioSrc: string
    currentTime: number
    totalDuration: number
}

interface PodcastPlayerProps {
    episode: PodcastEpisode
}

export default function PodcastPlayer({ episode }: PodcastPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(episode.currentTime)
    const [isExpanded, setIsExpanded] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime
        }
    }, [])

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && audioRef.current) {
            const rect = progressRef.current.getBoundingClientRect()
            const percent = (e.clientX - rect.left) / rect.width
            const newTime = percent * episode.totalDuration
            setCurrentTime(newTime)
            audioRef.current.currentTime = newTime
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const skipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15)
        }
    }

    const skipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(episode.totalDuration, audioRef.current.currentTime + 15)
        }
    }

    return (
        <div className="bg-gradient-to-r from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm rounded-none overflow-hidden mb-8">
            <audio
                ref={audioRef}
                src={episode.audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
            />

            <div className="p-4 md:p-6">
                <Link href="/podcast" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition">
                    <span className="mr-1">←</span> Back to podcast
                </Link>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src={episode.thumbnail || "/images/podcast-thumbnail.png"}
                            alt={episode.title}
                            width={120}
                            height={120}
                            className="rounded-md"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-gray-400 text-sm mb-1">
                            <span>{episode.date}</span>
                            <span className="hidden md:inline">•</span>
                            <span>{episode.duration}</span>
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{episode.title}</h1>

                        <div className="text-gray-300 text-sm md:text-base">
                            <p className={cn("line-clamp-3", isExpanded && "line-clamp-none")}>{episode.description}</p>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-green-500 hover:text-green-400 font-medium mt-1 transition"
                            >
                                {isExpanded ? "READ LESS" : "READ MORE"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 pb-4 md:px-6 md:pb-6">
                <div
                    ref={progressRef}
                    className="relative h-1 bg-gray-700 rounded-full mb-4 cursor-pointer"
                    onClick={handleProgressClick}
                >
                    <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                        style={{ width: `${(currentTime / episode.totalDuration) * 100}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transform translate-x-1/2"></div>
                    </div>
                </div>

                <div className="flex justify-between text-xs text-gray-400 mb-4">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(episode.totalDuration)}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={skipBackward}
                            className="w-10 h-10 flex items-center justify-center text-white hover:text-green-500 transition"
                        >
                            <RotateCcw size={20} />
                        </button>

                        <button
                            onClick={togglePlayPause}
                            className="w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-full text-white transition"
                        >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1"  fill="white"/>}
                        </button>

                        <button
                            onClick={skipForward}
                            className="w-10 h-10 flex items-center justify-center text-white hover:text-green-500 transition"
                        >
                            <RotateCw size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 flex items-center justify-center text-white hover:text-green-500 transition">
                            <Share2 size={20} />
                        </button>

                        <button className="w-10 h-10 flex items-center justify-center text-white hover:text-green-500 transition">
                            <Download size={20} />
                        </button>

                        <button className="w-10 h-10 hidden md:flex items-center justify-center text-white hover:text-green-500 transition">
                            <Volume2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
