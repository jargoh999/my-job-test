"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { SortOption, CategoryOption } from "@/lib/podcast"

export default function PodcastFilters() {
    const [sortBy, setSortBy] = useState<SortOption>("popular")
    const [category, setCategory] = useState<CategoryOption>("all")

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <div className="relative">
                    <button className="flex items-center text-sm font-medium">
                        {sortBy === "popular" ? "Popular" : sortBy === "newest" ? "Newest" : "Oldest"}
                        <ChevronDown size={16} className="ml-1" />
                    </button>
                    {/* Dropdown would go here in a real implementation */}
                </div>
            </div>

            <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by category:</span>
                <div className="relative">
                    <button className="flex items-center text-sm font-medium">
                        {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                        <ChevronDown size={16} className="ml-1" />
                    </button>
                    {/* Dropdown would go here in a real implementation */}
                </div>
            </div>
        </div>
    )
}
