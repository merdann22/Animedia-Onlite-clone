import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnimeInfo from './headerAnime/AnimeInfo';
import { getAnimeById } from '../../jikanClient';
import CommentsAnime from "./comments";
import ScoreList from "./headerAnime/ScoreList";
import DescriptionAnime from "./headerAnime/DescriptionAnime";
import AnimePlayVideo from "./mainAnime";

const AnimePage = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setLoading(true);

                // Задержка 3 секунды
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Используем исправленный API клиент
                const animeData = await getAnimeById(id);

                setAnime(animeData);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                // Jikan API возвращает 429 при превышении лимита запросов
                if (error.message.includes('429')) {
                    setError('Слишком много запросов. Подождите 30 секунд.');
                } else {
                    setError('Не удалось загрузить данные.');
                }
                setLoading(false);
            }
        };

        fetchAnime();
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    if (!anime) return <div>Аниме не найдено</div>;

    return <div>
        <AnimeInfo anime={anime}/>
        <ScoreList anime={anime}/>
        <DescriptionAnime anime={anime}/>
        <AnimePlayVideo anime={anime}/>
        <CommentsAnime animeId={anime.mal_id}/>

    </div>
};

export default AnimePage;