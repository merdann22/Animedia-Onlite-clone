import React, { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard.js';
import './style/animeToday.css';
import {getAnimeSchedule} from '../../jikanClient';

const AnimeToday = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setLoading(true);

                // Получаем текущий день недели
                const today = new Date();
                const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                const todayName = daysOfWeek[today.getDay()];

                console.log(`Сегодня ${todayName}, загружаем расписание...`);

                // Используем функцию из JikanClient
                const result = await getAnimeSchedule(todayName, 6);

                setAnimeList(result.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, []); // Пустой массив = выполняется один раз при загрузке

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="anime-today">
            <h2 style={{marginBottom: '15px'}}>СЕГОДНЯ ВЫЙДЕТ</h2>
            <div className="anime-container">
                {animeList.map(anime => (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
        </div>
    );
};

export default AnimeToday;