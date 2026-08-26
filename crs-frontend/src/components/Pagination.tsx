interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       onPageChange
                                   }: PaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from(
        { length: totalPages },
        (_, i) => i
    );

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7px',
                marginTop: '24px'
            }}
        >

            <button
                disabled={currentPage === 0}

                onClick={() =>
                    onPageChange(currentPage - 1)
                }

                style={{
                    padding: '9px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: '#ffffff',
                    color: '#374151',
                    cursor:
                        currentPage === 0
                            ? 'not-allowed'
                            : 'pointer',
                    opacity:
                        currentPage === 0
                            ? 0.5
                            : 1
                }}
            >
                ‹
            </button>

            {pages.map((p) => (

                <button
                    key={p}

                    onClick={() =>
                        onPageChange(p)
                    }

                    style={{
                        width: '38px',
                        height: '38px',

                        border:
                            p === currentPage
                                ? '1px solid #4f46e5'
                                : '1px solid #d1d5db',

                        borderRadius: '8px',

                        background:
                            p === currentPage
                                ? '#4f46e5'
                                : '#ffffff',

                        color:
                            p === currentPage
                                ? '#ffffff'
                                : '#374151',

                        fontWeight:
                            p === currentPage
                                ? '700'
                                : '500',

                        cursor: 'pointer'
                    }}
                >
                    {p + 1}
                </button>

            ))}

            <button
                disabled={
                    currentPage >= totalPages - 1
                }

                onClick={() =>
                    onPageChange(currentPage + 1)
                }

                style={{
                    padding: '9px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: '#ffffff',
                    color: '#374151',
                    cursor:
                        currentPage >= totalPages - 1
                            ? 'not-allowed'
                            : 'pointer',
                    opacity:
                        currentPage >= totalPages - 1
                            ? 0.5
                            : 1
                }}
            >
                ›
            </button>

        </div>
    );
}