export interface Podcast {
    picture_url: string
    id: string
    title: string
    category: string
    date: string
    duration: string
    featured: boolean
}

export type SortOption = "popular" | "newest" | "oldest"

export type CategoryOption = "all" | "fitness" | "education" | "lifestyle" | "business" | "technology"
