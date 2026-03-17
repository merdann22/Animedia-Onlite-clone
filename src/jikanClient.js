// src/clients/jikanClient.js
const API_BASE_URL = 'https://api.jikan.moe/v4';

// ОСНОВНАЯ ФУНКЦИЯ: Поиск аниме по названию
export const searchAnime = async (query, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.data || [],
            pagination: data.pagination || {}
        };
    } catch (error) {
        console.error('Error searching anime:', error);
        throw new Error('Failed to fetch anime data');
    }
};

// ФУНКЦИЯ: Получение детальной информации об аниме по ID
export const getAnimeById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/${id}/full`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching anime by ID:', error);
        throw new Error('Failed to fetch anime details');
    }
};

// ФУНКЦИЯ: Получение топа популярных аниме
export const getTopAnime = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/top/anime?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.data || [],
            pagination: data.pagination || {}
        };
    } catch (error) {
        console.error('Error fetching top anime:', error);
        throw new Error('Failed to fetch top anime');
    }
};

// ФУНКЦИЯ: Получение аниме по ID жанра
export const getAnimeByGenre = async (genreId, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/anime?genres=${genreId}&page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.data || [],
            pagination: data.pagination || {}
        };
    } catch (error) {
        console.error('Error fetching anime by genre:', error);
        throw new Error('Failed to fetch anime by genre');
    }
};

// ФУНКЦИЯ: Получение аниме текущего сезона
export const getCurrentSeasonAnime = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/seasons/now?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.data || [],
            pagination: data.pagination || {}
        };
    } catch (error) {
        console.error('Error fetching current season anime:', error);
        throw new Error('Failed to fetch current season anime');
    }
};

// ФУНКЦИЯ: Получение аниме по году и сезону (зима, весна, лето, осень)
export const getAnimeBySeason = async (year, season, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/seasons/${year}/${season}?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.data || [],
            pagination: data.pagination || {}
        };
    } catch (error) {
        console.error('Error fetching anime by season:', error);
        throw new Error('Failed to fetch anime by season');
    }
};

// ФУНКЦИЯ: Получение расписания аниме по дню недели
export const getAnimeSchedule = async (day = 'monday', limit = 6) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/schedules?filter=${day}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.data || [],
            pagination: data.pagination || {}
        };
    } catch (error) {
        console.error('Error fetching anime schedule:', error);
        throw new Error('Failed to fetch anime schedule');
    }
};

// ========== НОВЫЕ ФУНКЦИИ ДЛЯ ВИДЕО И ЭПИЗОДОВ ==========

/**
 * ФУНКЦИЯ: Получение видео (промо/трейлеров) для конкретного аниме
 * @param {number} id - ID аниме
 * @returns {Promise<Array>} - Массив видео с YouTube ID, названием и превью
 */

export const getAnimeVideos = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/${id}/videos`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Форматируем данные для удобства использования
        return {
            promo: data.data?.promo || [], // Промо-видео/трейлеры
            episodes: data.data?.episodes || [] // Видео эпизодов (если доступны)
        };
    } catch (error) {
        console.error('Error fetching anime videos:', error);
        throw new Error('Failed to fetch anime videos');
    }
};

/**
 * ФУНКЦИЯ: Получение списка эпизодов аниме
 * Jikan предоставляет только мета-информацию об эпизодах (названия, даты выхода),
 * но не ссылки для просмотра
 * @param {number} id - ID аниме
 * @param {number} page - Номер страницы
 * @returns {Promise<Object>} - Объект с массивом эпизодов и пагинацией
 */

export const getAnimeEpisodes = async (id, page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/anime/${id}/episodes?page=${page}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.data || [],
            pagination: data.pagination || {}
        };
    } catch (error) {
        console.error('Error fetching anime episodes:', error);
        throw new Error('Failed to fetch anime episodes');
    }
};

/**
 * ФУНКЦИЯ: Получение информации о конкретном эпизоде
 * @param {number} animeId - ID аниме
 * @param {number} episodeId - ID эпизода
 * @returns {Promise<Object>} - Детальная информация об эпизоде
 */

export const getAnimeEpisodeById = async (animeId, episodeId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/anime/${animeId}/episodes/${episodeId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching episode details:', error);
        throw new Error('Failed to fetch episode details');
    }
};

/**
 * ФУНКЦИЯ: Получение всех внешних ссылок (включая стриминговые сервисы)
 * Здесь могут быть ссылки на Crunchyroll, Funimation и другие платформы
 * @param {number} id - ID аниме
 * @returns {Promise<Array>} - Массив внешних ссылок
 */

export const getAnimeExternalLinks = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/${id}/external`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching external links:', error);
        throw new Error('Failed to fetch external links');
    }
};

/**
 * ФУНКЦИЯ: Получение статистики аниме (включая количество просмотров, рейтинг и т.д.)
 * @param {number} id - ID аниме
 * @returns {Promise<Object>} - Статистика аниме
 */

export const getAnimeStatistics = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/${id}/statistics`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || {};
    } catch (error) {
        console.error('Error fetching anime statistics:', error);
        throw new Error('Failed to fetch anime statistics');
    }
};

/**
 * ФУНКЦИЯ: Получение рекомендаций на основе аниме
 * @param {number} id - ID аниме
 * @returns {Promise<Array>} - Массив рекомендаций
 */

export const getAnimeRecommendations = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/${id}/recommendations`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching anime recommendations:', error);
        throw new Error('Failed to fetch anime recommendations');
    }
};

// Обновленный клиент со всеми функциями
export const JikanClient = {
    // Основные функции
    searchAnime,
    getAnimeById,
    getTopAnime,
    getAnimeByGenre,
    getCurrentSeasonAnime,
    getAnimeBySeason,
    getAnimeSchedule,

    // Новые функции для видео и эпизодов
    getAnimeVideos,
    getAnimeEpisodes,
    getAnimeEpisodeById,
    getAnimeExternalLinks,
    getAnimeStatistics,
    getAnimeRecommendations,
};

export default JikanClient;