interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       onPageChange,
                                   }: PaginationProps) {

    if (totalPages <= 1) return null;

    const pages = Array.from(
        { length: totalPages },
        (_, i) => i
    );

    return (
        <div className="pagination">
            <button
                className="page-button"
                disabled={currentPage === 0}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                ← Trang trước
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    className={
                        p === currentPage
                            ? 'page-number active-page'
                            : 'page-number'
                    }
                    onClick={() => onPageChange(p)}
                >
                    {p + 1}
                </button>
            ))}

            <button
                className="page-button"
                disabled={
                    currentPage >= totalPages - 1
                }
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                Trang sau →
            </button>
        </div>
    );
}