import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, position = 'top' }) => {
    const MAX_PAGES = 16; // Максимум 16 страниц

    // Ограничиваем общее количество страниц
    const limitedTotalPages = Math.min(totalPages, MAX_PAGES);
    const goToPrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };
    const goToNextPage = () => {
        if (currentPage < limitedTotalPages) onPageChange(currentPage + 1);
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        if (limitedTotalPages <= 0) return buttons;

        // Всегда показываем первую страницу
        buttons.push(
            <button
                key={1}
                onClick={() => onPageChange(1)}
                className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
            >
                1
            </button>
        );

        // Определяем диапазон страниц для показа
        let startPage = Math.max(2, currentPage - 2);
        let endPage = Math.min(limitedTotalPages - 1, currentPage + 2);

        // Если между 1 и startPage больше 1 страницы, добавляем "..."
        if (startPage > 2) {
            buttons.push(<span key="dots1" className="pagination-dots">...</span>);
        }

        // Показываем страницы вокруг текущей
        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== limitedTotalPages) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </button>
                );
            }
        }

        // Если между endPage и последней страницей больше 1 страницы, добавляем "..."
        if (endPage < limitedTotalPages - 1) {
            buttons.push(<span key="dots2" className="pagination-dots">...</span>);
        }

        // Показываем последнюю страницу, если она не первая
        if (limitedTotalPages > 1) {
            buttons.push(
                <button
                    key={limitedTotalPages}
                    onClick={() => onPageChange(limitedTotalPages)}
                    className={`pagination-btn ${currentPage === limitedTotalPages ? 'active' : ''}`}
                >
                    {limitedTotalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className={`pagination-container ${position === 'bottom' ? 'bottom-pagination' : ''}`}>
            <button
                className="pagination-arrow"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
            >
                ‹
            </button>

            <div className="pagination-buttons">
                {renderPaginationButtons()}
            </div>

            <button
                className="pagination-arrow"
                onClick={goToNextPage}
                disabled={currentPage === limitedTotalPages}
            >
                ›
            </button>
        </div>
    );
};

export default Pagination;