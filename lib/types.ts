export interface Episode {
    id: number
    title: string
    description: string
    created_at: string
    duration: number
    image: string
    date: string
}

export interface PlatformLink {
    name: string
    icon: string
    url: string
    color: string
}
