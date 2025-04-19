import Link from "next/link"
import { Heart, MessageSquare, Share2 } from "lucide-react"

export interface ContentItem {
  id?: string;
  name: string;
  image_url: string;
  category?: string;
  likes?: number;
  comments?: number;
  url?: string;
  featured?: boolean;
  bgColor?: string;
}

interface ContentCardProps {
  item: ContentItem
  size?: "small" | "medium" | "large"
}

export default function ContentCard({ item, size = "medium" }: ContentCardProps) {
  const {
    name,
    image_url,
    category = name,
    likes,
    comments,
    url = `/category/${name.toLowerCase().replace(/\s+/g, '-')}`,
    bgColor = "bg-white"
  } = item;

  const sizeClasses = {
    small: "h-40",
    medium: "h-48",
    large: "h-64",
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${bgColor}`}>
      <Link href={url}>
        <div className={`relative w-full ${sizeClasses[size]}`}>
          <img src={image_url || "/placeholder.svg"} alt={name} className="object-cover" />
          {category && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">{category}</div>
          )}
        </div>
      </Link>
      <div className="p-3">
        <Link href={url}>
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">{name}</h3>
        </Link>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <button className="flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1" />
              <span>{likes || 0}</span>
            </button>
            <button className="flex items-center">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span>{comments || 0}</span>
            </button>
          </div>
          <button className="flex items-center">
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
