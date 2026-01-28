import React, { useState } from "react";

/**
 * Reusable Paginated List Component
 * Displays items in pages with elegant navigation
 */
export default function PaginatedList({
    items,
    renderItem,
    itemsPerPage = 5,
    gap = "15px"
}) {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap }}>
                {currentItems.map((item, index) => renderItem(item, startIndex + index))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "25px"
                }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="itim-font"
                        style={{
                            background: currentPage === 0 ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.9)",
                            border: "2px solid #FFFFFF",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            color: currentPage === 0 ? "rgba(255, 255, 255, 0.5)" : "#131CC3",
                            fontSize: "24px",
                            cursor: currentPage === 0 ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            opacity: currentPage === 0 ? 0.5 : 1,
                        }}
                    >
                        ←
                    </button>
                    <span className="itim-font" style={{ color: "#FFFFFF", fontSize: "20px" }}>
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={currentPage === totalPages - 1}
                        className="itim-font"
                        style={{
                            background: currentPage === totalPages - 1 ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.9)",
                            border: "2px solid #FFFFFF",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            color: currentPage === totalPages - 1 ? "rgba(255, 255, 255, 0.5)" : "#131CC3",
                            fontSize: "24px",
                            cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                        }}
                    >
                        →
                    </button>
                </div>
            )}
        </>
    );
}
