import "./Pagination.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <nav className="pagination-container" aria-label="Pagination Navigation">
            <div className="pagination-info">
                Showing <strong>{startItem}</strong> - <strong>{endItem}</strong> of <strong>{totalItems}</strong> products
            </div>

            <div className="pagination-controls">
                <button
                    type="button"
                    className="pagination-btn pagination-btn--nav"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    aria-label="Go to previous page"
                >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                </button>

                <div className="pagination-numbers">
                    {getPageNumbers().map((page, index) => {
                        if (page === "...") {
                            return (
                                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                                    ...
                                </span>
                            );
                        }
                        const isCurrent = page === currentPage;
                        return (
                            <button
                                key={`page-${page}`}
                                type="button"
                                className={`pagination-btn ${isCurrent ? "pagination-btn--active" : ""}`}
                                onClick={() => onPageChange(page as number)}
                                aria-current={isCurrent ? "page" : undefined}
                                aria-label={`Page ${page}`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className="pagination-btn pagination-btn--nav"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    aria-label="Go to next page"
                >
                    <span>Next</span>
                    <ChevronRight size={16} />
                </button>
            </div>
        </nav>
    );
}

export default Pagination;
