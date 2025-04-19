"use client"

import { ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    // Show ellipsis if there are more than 6 pages
    const showEllipsis = totalPages > 6

    // Determine which page numbers to show
    let pagesToShow = pageNumbers
    if (showEllipsis) {
        if (currentPage <= 3) {
            // Show first 5 pages + ellipsis + last page
            pagesToShow = [...pageNumbers.slice(0, 5), -1, totalPages]
        } else if (currentPage >= totalPages - 2) {
            // Show first page + ellipsis + last 5 pages
            pagesToShow = [1, -1, ...pageNumbers.slice(totalPages - 5)]
        } else {
            // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
            pagesToShow = [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
        }
    }

    return (
        <div className="flex items-center justify-center gap-1">
            {pagesToShow.map((page, index) =>
                page === -1 ? (
                    <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${currentPage === page ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                    >
                        {page}
                    </button>
                ),
            )}

            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}
