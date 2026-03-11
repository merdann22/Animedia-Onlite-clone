import React, { useState, useEffect } from 'react';
import './style/animeList.css';
import AnimeCard from '../home/AnimeCard.js';
import { getCurrentSeasonAnime } from '../../jikanClient';

const AnimeList = () => {
    // ===== ФУНКЦИЯ 1: УПРАВЛЕНИЕ СОСТОЯНИЕМ (useState) =====
    // Хранит все данные компонента и обновляет их
    const [animeList, setAnimeList] = useState([]);     // Массив аниме для отображения
    const [page, setPage] = useState(1);                // Текущая страница (1-5)
    const [loading, setLoading] = useState(false);       // Показывает процесс загрузки
    const [lastPage, setLastPage] = useState(1);         // Последняя доступная страница из API
    const [initialLoad, setInitialLoad] = useState(true); // Отличает первую загрузку от последующих

    // ===== ФУНКЦИЯ 2: ЗАГРУЗКА НАЧАЛЬНЫХ ДАННЫХ (useEffect) =====
    // Выполняется один раз при монтировании компонента
    // Загружает первую страницу аниме при открытии страницы
    useEffect(() => {
        setInitialLoad(true); // Показываем, что идет первая загрузка

        // Запрос к API для получения текущего сезона аниме (страница 1, 10 элементов)
        getCurrentSeasonAnime(1, 10)
            .then(result => {
                // Успешная загрузка: сохраняем данные и информацию о пагинации
                setAnimeList(result.data);
                setLastPage(result.pagination.last_visible_page);
            })
            .catch(() => setAnimeList([])) // Ошибка: очищаем список
            .finally(() => setInitialLoad(false)); // Первая загрузка завершена
    }, []); // Пустой массив = эффект сработает только при монтировании

    // ===== ФУНКЦИЯ 3: ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ (changePage) =====
    // Вызывается при клике на кнопки пагинации
    // Загружает данные для выбранной страницы
    const changePage = async (newPage) => {
        setLoading(true); // Показываем индикатор загрузки

        // Искусственная задержка для демонстрации состояния загрузки
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // Запрос к API для получения данных новой страницы
            const result = await getCurrentSeasonAnime(newPage, 10);

            // Обновляем список аниме и текущую страницу
            setAnimeList(result.data);
            setPage(newPage);
        } catch (error) {
            // Логируем ошибку, но не прерываем работу
            console.error('Error:', error);
        } finally {
            setLoading(false); // Скрываем индикатор загрузки
        }
    };

    // ===== ФУНКЦИЯ 4: УСЛОВНЫЙ РЕНДЕРИНГ =====
    // Проверяет, нужно ли показывать сообщение "Нет данных"
    // Срабатывает только после завершения первой загрузки и при пустом списке
    if (!animeList.length && !loading && !initialLoad) return <div>Нет данных</div>;

    // ===== ФУНКЦИЯ 5: ОСНОВНОЙ РЕНДЕРИНГ =====
    // Отображает заголовок, карточки аниме и кнопки пагинации
    return (
        <div className="anime-list">
            {/* Заголовок секции */}
            <h2 style={{marginBottom: '15px'}}>НОВЫЕ СЕРИИ АНИМЕ</h2>

            {/* Скрытый индикатор загрузки (технически нужен для состояния) */}
            {loading && <div style={{display: 'none'}}>Загрузка...</div>}

            {/* ===== ФУНКЦИЯ 6: РЕНДЕРИНГ КАРТОЧЕК ===== */}
            {/* Трансформирует массив данных в массив компонентов AnimeCard */}
            <div className="anime-container">
                {animeList.map((anime, index) => (
                    <AnimeCard
                        // Уникальный ключ для каждого элемента (нужен React для оптимизации)
                        // Комбинация ID, страницы и индекса гарантирует уникальность
                        key={`${anime.mal_id}-${page}-${index}`}
                        anime={anime} // Передаем данные в дочерний компонент
                    />
                ))}
            </div>

            {/* ===== ФУНКЦИЯ 7: РЕНДЕРИНГ ПАГИНАЦИИ ===== */}
            {/* Создает кнопки для навигации по страницам */}
            <div className="anime-list-button">
                {[1,2,3,4,5].map(num => (
                    <button
                        key={num} // Простой ключ для кнопок
                        onClick={() => changePage(num)} // При клике загружаем выбранную страницу
                        disabled={loading} // Блокируем кнопки во время загрузки
                        // Динамический класс: 'active' для текущей страницы
                        className={`button-active ${page === num ? 'active' : ''}`}
                    >
                        {num} {/* Номер страницы */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AnimeList;