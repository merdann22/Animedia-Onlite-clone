import React, { useState, useEffect } from 'react';
import './style/animeList.css';
import AnimeCard from '../home/AnimeCard.js';
import { getCurrentSeasonAnime } from '../../jikanClient';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [lastPage, setLastPage] = useState(1);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        setInitialLoad(true);

        getCurrentSeasonAnime(1, 10)
            .then(result => {
                setAnimeList(result.data);
                setLastPage(result.pagination.last_visible_page);
            })
            .catch(() => setAnimeList([]))
            .finally(() => setInitialLoad(false));
    }, []);

    const changePage = async (newPage) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const result = await getCurrentSeasonAnime(newPage, 10);
            setAnimeList(result.data);
            setPage(newPage);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // ===== ИСПРАВЛЕННЫЙ УСЛОВНЫЙ РЕНДЕРИНГ =====
    // 1. Показываем загрузку если идет загрузка или первая загрузка
    if (loading || initialLoad) return <div>Загрузка...</div>;

    // 2. Если данные пустые после загрузки
    if (!animeList.length) return <div>Нет данных</div>;

    // 3. Основной рендеринг
    return (
        <div className="anime-list">
            <h2 style={{marginBottom: '15px'}}>НОВЫЕ СЕРИИ АНИМЕ</h2>

            <div className="anime-container">
                {animeList.map((anime, index) => (
                    <AnimeCard
                        key={`${anime.mal_id}-${page}-${index}`}
                        anime={anime}
                    />
                ))}
            </div>

            <div className="anime-list-button">
                {[1,2,3,4,5].map(num => (
                    <button
                        key={num}
                        onClick={() => changePage(num)}
                        disabled={loading}
                        className={`button-active ${page === num ? 'active' : ''}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AnimeList;