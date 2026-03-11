import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style/searchPage.css';
import { searchAnime } from '../../jikanClient';
import SearchCard from "./SearchCard";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    const pageParam = queryParams.get('page') || '1';

    // Состояние для поискового инпута на странице
    const [searchInput, setSearchInput] = useState(query);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(parseInt(pageParam) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [pendingPage, setPendingPage] = useState(null); // Новая страница в ожидании

    const itemsPerPage = 12;

    useEffect(() => {
        if (query) {
            fetchResults(currentPage);
            setSearchInput(query);
        } else {
            setLoading(false);
        }
    }, [query, currentPage]);

    const fetchResults = async (pageNum) => {
        setLoading(true);
        try {
            const result = await searchAnime(query, pageNum, itemsPerPage);

            setResults(result.data || []);

            // Рассчитываем общее количество страниц
            const totalItems = result.pagination.items?.total || 0;
            setTotalResults(totalItems);
            setTotalPages(Math.ceil(totalItems / itemsPerPage));

            // Обновляем URL с текущей страницей
            const newUrl = `/search?q=${encodeURIComponent(query)}&page=${pageNum}`;
            window.history.replaceState({}, '', newUrl);

            // Если есть отложенная страница, переходим на нее после загрузки
            if (pendingPage !== null && pendingPage !== pageNum) {
                const nextPage = pendingPage;
                setPendingPage(null);
                setTimeout(() => {
                    handlePageChange(nextPage);
                }, 100);
            }

        } catch (error) {
            console.error('Error fetching style results:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            // Если идет загрузка, ставим страницу в ожидание
            if (loading) {
                setPendingPage(newPage);
                return;
            }

            // Меняем страницу сразу, но данные загрузятся в useEffect
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Функция-обертка для обработки кликов с проверкой загрузки
    const handlePageClick = (newPage) => {
        if (loading) {
            return; // Игнорируем клик если идет загрузка
        }
        handlePageChange(newPage);
    };

    const handleAnimeClick = (animeId) => {
        navigate(`/anime/${animeId}`);
    };

    // Функция для отображения номеров страниц с эллипсисом
    const renderPaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        // Всегда показываем первую страницу
        pages.push(
            <button
                key={1}
                onClick={() => handlePageClick(1)}
                className={`pagination-page ${currentPage === 1 ? 'active' : ''}`}
                disabled={loading}
            >
                1
                {currentPage === 1 && loading && <span className="page-loading-dots">...</span>}
            </button>
        );

        // Показываем эллипсис если текущая страница далеко от начала
        if (currentPage > 3) {
            pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
        }

        // Показываем страницы вокруг текущей
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        className={`pagination-page ${currentPage === i ? 'active' : ''}`}
                        disabled={loading}
                    >
                        {i}
                        {currentPage === i && loading && <span className="page-loading-dots">...</span>}
                    </button>
                );
            }
        }

        // Показываем эллипсис если текущая страница далеко от конца
        if (currentPage < totalPages - 2) {
            pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
        }

        // Показываем последнюю страницу если она не первая
        if (totalPages > 1) {
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={`pagination-page ${currentPage === totalPages ? 'active' : ''}`}
                    disabled={loading}
                >
                    {totalPages}
                    {currentPage === totalPages && loading && <span className="page-loading-dots">...</span>}
                </button>
            );
        }

        return pages;
    };

    // Простой рендер для небольшого количества страниц
    const renderSimplePagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`pagination-page ${currentPage === i ? 'active' : ''}`}
                    disabled={loading}
                >
                    {i}
                    {currentPage === i && loading && <span className="page-loading-dots">...</span>}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="container">
            <div className="start-search">
                <h2 style={{fontSize:'24px'}}>Поиск по сайту</h2>

                {/* Форма для поиска на странице результатов */}
                <form
                    className="search-page-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (searchInput.trim()) {
                            navigate(`/search?q=${encodeURIComponent(searchInput)}`);
                            setCurrentPage(1); // Сбрасываем на первую страницу
                        }
                    }}
                >
                    <div className="search-page-input">
                        <input
                            type="text"
                            placeholder="Поиск аниме..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="search-page-input-text"
                            autoFocus
                        />
                        <button className="add_bookmarks" disabled={loading}>
                            {loading ? 'Поиск...' : 'Начать поиск'}
                        </button>
                    </div>
                </form>

                {totalResults > 0 && (
                    <p className="search-results-count">
                        По Вашему запросу найдено {totalResults} ответов
                        {totalPages > 1 && ` • Страница ${currentPage} из ${totalPages}`}
                        {loading && ' • Загрузка...'}
                    </p>
                )}
            </div>

            {loading && results.length === 0 ? (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    Загрузка...
                </div>
            ) : results.length > 0 ? (
                <>
                    <div className="anime-grid">
                        {results.map((anime) => (
                            <SearchCard
                                key={anime.mal_id}
                                anime={anime}
                                onClick={() => handleAnimeClick(anime.mal_id)}
                            />
                        ))}
                    </div>

                    {/* Пагинация */}
                    {totalPages > 1 && (
                        <div className="load-more-container">
                            <button
                                onClick={() => handlePageClick(currentPage - 1)}
                                disabled={currentPage === 1 || loading}
                                className="pagination-btn prev"
                            >
                                ←
                                {pendingPage === currentPage - 1 && loading && <span className="btn-loading"></span>}
                            </button>

                            {/* Номера страниц */}
                            {totalPages <= 7 ? renderSimplePagination() : renderPaginationNumbers()}

                            <button
                                onClick={() => handlePageClick(currentPage + 1)}
                                disabled={currentPage === totalPages || loading}
                                className="pagination-btn next"
                            >
                                →
                                {pendingPage === currentPage + 1 && loading && <span className="btn-loading"></span>}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                !loading && query && <div className="no-results">Ничего не найдено по запросу "{query}"</div>
            )}
        </div>
    );
};

export default SearchPage;