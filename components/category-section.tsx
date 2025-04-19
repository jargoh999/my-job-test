import ContentCard, { type ContentItem } from "@/components/content-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface CategorySectionProps {
  title: string
  items?: ContentItem[]
  showViewAll?: boolean
}

export default function CategorySection({ title, items = [], showViewAll = false }: CategorySectionProps) {
  // Transform items to ensure they match ContentItem interface
  const transformedItems: ContentItem[] = items.map((item: any) => ({
    name: item.name,
    image_url: item.image_url,
    url: `/all-podcast`,
    id: item.name // Use name as fallback id
  }));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 uppercase">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" className="text-xs text-gray-600 hover:text-orange-600 flex items-center">
            View All <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {transformedItems.map((item) => (
          <ContentCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}
