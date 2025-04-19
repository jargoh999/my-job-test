import Image from "next/image"
import Link from "next/link"

export default function CategorySection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryCard title="News & Storytelling" image="/placeholder.svg?height=200&width=300" href="/category/news" />
            <CategoryCard
                title="Entertainment & Lifestyle"
                image="/placeholder.svg?height=200&width=300"
                href="/category/entertainment"
            />
            <CategoryCard
                title="Tech, Sport & Business"
                image="/placeholder.svg?height=200&width=300"
                href="/category/tech"
            />
            <CategoryCard title="Other podcasts" image="/placeholder.svg?height=200&width=300" href="/category/other" />
        </div>
    )
}

interface CategoryCardProps {
    title: string
    image: string
    href: string
}

function CategoryCard({ title, image, href }: CategoryCardProps) {
    return (
        <Link href={href} className="group">
            <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3]">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white font-medium">{title}</h3>
                    </div>
                </div>
            </div>
        </Link>
    )
}
