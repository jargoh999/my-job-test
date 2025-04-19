// c:\Users\DELL\Desktop\keystem\keystem\types\podcast.ts

export interface Category {
    id: number | string;
    name: string;
}

export interface Podcast {
    id: number | string;
    title: string;
    picture_url?: string;
    category_name: string;
    author: string;
}

export interface Episode {
    id: number | string;
    title: string;
    picture_url?: string;
    author: string;
    category_name: string;
}