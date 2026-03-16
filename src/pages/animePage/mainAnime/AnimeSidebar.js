import React, { useState, useEffect } from 'react';
import AnimeSidebarItem from "./animePlay/AnimeSidebarItem";
import '../styles/main-anime/anime-sidebar.css'
import { getCurrentSeasonAnime } from '../../../jikanClient';

const AnimeSidebar = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        setInitialLoad(true);

        getCurrentSeasonAnime(1, 5) // Загружаем 5 аниме для сайдбара
            .then(result => {
                setAnimeList(result.data);
            })
            .catch(() => setAnimeList([]))
            .finally(() => setInitialLoad(false));
    }, []);

    // ===== УСЛОВНЫЙ РЕНДЕРИНГ =====
    // 1. Показываем загрузку если идет загрузка или первая загрузка
    if (loading || initialLoad) return (
        <div className="anime-sidebar">
            <h2>Новые серии</h2>
            <p>Загрузка...</p>
        </div>
    );

    // 2. Если данные пустые после загрузки
    if (!animeList.length) return (
        <div className="anime-sidebar">
            <h2>Новые серии</h2>
            <p>Нет данных</p>
        </div>
    );

    // 3. Основной рендеринг
    return (
        <div className="anime-sidebar">
            <h2>Новые серии</h2>
            <div className="anime-sidebar-container">
                {animeList.map((anime, index) => (
                    <AnimeSidebarItem
                        key={`${anime.mal_id}-${index}`}
                        anime={anime}
                    />
                ))}
            </div>
        </div>
    );
};

export default AnimeSidebar;