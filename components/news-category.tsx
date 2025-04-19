import { Share, Bookmark, Share2, GiftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/redux/store';
import { fetchTopCategories } from '@/lib/redux/slices/categorySlice';
import { useEffect } from 'react';

function PodcastCard({
    title = "Fitness Focus",
    image = "/placeholder.svg?height=500&width=500&text=The Bookings Africa Podcast"
}) {
    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Main podcast image */}
                <div className="relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full aspect-square object-cover"
                    />
                </div>

                {/* Title section */}
                <div className="px-6 py-4">
                    <h3 className="text-[20px] font-bold text-gray-800">{title}</h3>
                </div>

                {/* Action buttons */}
                <div className="px-6 pb-6">
                    <div className="flex items-center space-x-3">
                        <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                            <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                            <GiftIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Bottom border */}
                <div className="h-2 bg-gray-200 w-full"></div>
            </div>
        </div>
    )
}


export default function NewsCards() {
    const dispatch = useDispatch<AppDispatch>();
    const { topCategories, loading } = useSelector((state: RootState) => state.categories);

    // Fetch categories on component mount
    useEffect(() => {
        dispatch(fetchTopCategories());
    }, [dispatch]);

    // Transform API categories to match the expected interface
    const cards = topCategories?.map(category => ({
        id: category?.id,
        title: category?.name,
        image: category?.image_url || "/assets/adcover.png"
    })) || [];

    // Loading state
    if (loading) {
        return (
            <div className="w-full container mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center">
                        <span className="w-1 h-6 bg-red-500 mr-2"></span>
                        News & Storytelling
                    </h2>
                </div>
                <p>Loading categories...</p>
            </div>
        );
    }

    // Empty state
    if (!cards.length) {
        return (
            <div className="w-full container mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center">
                        <span className="w-1 h-6 bg-red-500 mr-2"></span>
                        News & Storytelling
                    </h2>
                </div>
                <p>No categories available.</p>
            </div>
        );
    }

    return (
        <div className="w-full container mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                    <span className="w-1 h-6 bg-red-500 mr-2"></span>
                    News & Storytelling
                </h2>
                <Button className="text-purple-600 flex items-center text-sm font-medium border border-purple-600 bg-white rounded-full" variant={"outline"} size={"lg"}>
                    View all
                    <ArrowRightIcon />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cards.map((card) => (
                    <PodcastCard
                        key={card.id}
                        title={card.title}
                        image={card.image}
                    />
                ))}
            </div>
        </div>
    )
}
