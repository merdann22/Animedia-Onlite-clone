import { useState, useEffect } from 'react';
import '../assets/styles/slider.css';
import {Link} from "react-router-dom";
import {getTopAnime} from "../jikanClient";

const Slider = () => {
    // useState([]) = пустой массив. animeList = текущее значение, setAnimeList = функция для изменения этого значения
    const [animeList, setAnimeList] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    //useEffect - "Поручение" выполнить при загрузке (Как в жизни: "Сразу после открытия страницы, сделай вот это...")
    useEffect(() => {
        // Функция для загрузки данных
        const fetchData = async () => {
            try {
                // Прошу: "Дай мне топ-14 самых популярных аниме" и жду ответа (await)
                // Используем getTopAnime из JikanClient с параметрами (страница 1, лимит 14)
                const result = await getTopAnime(1, 14);
                await new Promise(resolve => setTimeout(resolve, 3000));
                // Беру данные (result.data) и кладу их в состояние animeList
                // Теперь animeList содержит массив из 14 аниме
                setAnimeList(result.data);

                // "На всякий случай" - обработка ошибок (catch)
            } catch (err) {
                console.error('Error:', err);
            }
        };

        // Вызываем функцию загрузки
        fetchData();
    }, []); // Пустой массив = выполняется только при монтировании компонента


    // next прибавляет к индексу 1, а prev отнимает от индекса 1. setStartIndex - это "команда изменения" для переменной startIndex
    const next = () => setStartIndex(startIndex + 1);
    const prev = () => setStartIndex(startIndex - 1);

    const getAnimeToShow = () => {
        // Шаг 1: Создаем пустой массив. "Готовим пустую корзину для 7 аниме"
        const animeToShow = [];
        // Шаг 2: Цикл for - повторяем 7 раз."Сделай вот это 7 раз (для 7 ячеек слайдера)"
        for (let i = 0; i < 7; i++) {
            // Вычисляем индекс: animeList.length = 14, startIndex = 0
            let index = (startIndex + i) % animeList.length;
            if (index < 0) index += animeList.length;
            animeToShow.push(animeList[index]);
        }
        return animeToShow;
    };

    const animeToShow = getAnimeToShow();

    if (animeList.length === 0) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="slider-container">
            <div className="simple-slider">
                <button onClick={prev}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </button>
                <div className="colors">
                    {animeToShow.map(anime => (
                        <div key={anime.mal_id} className="anime-slider-card">
                            <Link to={`/anime/${anime.mal_id}`} className="image-container">
                                <div className="color-box"
                                    style={{
                                        backgroundImage: `url(${anime.images.jpg.image_url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />

                            </Link>
                            <span className="color-name">{anime.title}</span>
                        </div>
                    ))}
                </div>
                <button onClick={next}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                         className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path
                            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Slider;