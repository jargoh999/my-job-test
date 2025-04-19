"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // Don't render pagination if there's only one page
    if (totalPages <= 1) return null

    // Create an array of page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = []

        // Always show first page
        pageNumbers.push(1)

        // Calculate range around current page
        const startPage = Math.max(2, currentPage - 1)
        const endPage = Math.min(totalPages - 1, currentPage + 1)

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pageNumbers.push("...")
        }

        // Add pages in range
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pageNumbers.push("...")
        }

        // Always show last page if more than one page
        if (totalPages > 1) {
            pageNumbers.push(totalPages)
        }

        return pageNumbers
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="flex justify-center mt-10">
            <nav className="flex items-center space-x-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                </Button>

                {pageNumbers.map((page, index) =>
                    typeof page === "number" ? (
                        <Button
                            key={index}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    ) : (
                        <span key={index} className="px-2">
                            {page}
                        </span>
                    ),
                )}

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                </Button>
            </nav>
        </div>
    )
}
