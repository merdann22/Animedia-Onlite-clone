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
        const response = await fetch(`${API_BASE_URL}/anime/${id}`);

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

// Утилиты для работы с API
export const JikanClient = {
    searchAnime,
    getAnimeById,
    getTopAnime,
    getAnimeByGenre,
    getCurrentSeasonAnime,
    getAnimeBySeason,
    getAnimeSchedule,
};

export default JikanClient;