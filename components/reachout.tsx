"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"

export default function Reachout() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter subscription
        console.log("Subscribing email:", email)
    }

    return (
        <div className="w-full bg-[#f9f0f0]">
        <div className="w-full container mx-auto flex items-center justify-between">
            <div className="max-w-md m-5">
                <h2 className="text-4xl font-bold text-[#333333] mb-2">Never stop listening!</h2>
                <p className="text-xl text-[#333333] mb-6">Every episodes is a journey you don&apos;t wanna miss out on.</p>
                <p className="text-sm text-[#333333] mb-6">
                    Get the latest headlines and unique ABR stories, sent every weekday.
                </p>

                <form onSubmit={handleSubmit} className="flex items-center">
                    <div className="relative flex-1">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full py-3 px-4 bg-[#e8e8e8] rounded-none text-gray-700 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#e02020] hover:bg-[#c51818] text-white font-medium py-3 px-6 rounded-none transition-colors"
                    >
                        Get me in
                    </button>
                    <div className="ml-2 text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-info"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                    </div>
                </form>
            </div>

            <div className="relative h-130 w-130 m-5">
                {/* Main circular container */}
                <div className="absolute top-20 right-20 h-80 w-80 rounded-full overflow-hidden border-4 border-white">
                    <Image
                        src="/assets/ppleandmp.png"
                        alt="Person with headphones"
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Bottom-left overlapping circle */}
                <div className="absolute bottom-21 left-15 h-50 w-50 rounded-full overflow-hidden border-4 border-white z-10">
                    <Image
                        src="/assets/personandlappy.png"
                        alt="Person with laptop"
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Colorful audio icon in top-right */}
                <div className="absolute top-0 right-0 z-20">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="16" height="16" rx="8" fill="#f8d568" />
                        <path d="M12 6V18" stroke="#ff6b9d" strokeWidth="2" strokeLinecap="round" />
                        <path d="M8 8V16" stroke="#ff6b9d" strokeWidth="2" strokeLinecap="round" />
                        <path d="M16 10V14" stroke="#ff6b9d" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
            </div>
            </div>
    )
}
