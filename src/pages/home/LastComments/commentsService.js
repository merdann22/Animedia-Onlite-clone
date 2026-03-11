// Сервис для загрузки рецензий
export const fetchAllComments = async () => {
    const allAnimeIds = await fetchAnimeIds();
    const allComments = await fetchCommentsForAnime(allAnimeIds);
    return sortCommentsByDate(allComments);
};

const fetchAnimeIds = async () => {
    const allAnimeIds = [];

    for (let currentPage = 1; currentPage <= 3; currentPage++) {
        try {
            const response = await fetch(
                `https://api.jikan.moe/v4/top/anime?page=${currentPage}&limit=10`
            );

            if (response.ok) {
                const data = await response.json();
                const animeIds = data.data.map(anime => anime.mal_id);
                allAnimeIds.push(...animeIds);
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
            console.error(`Ошибка загрузки страницы ${currentPage}:`, err);
        }
    }

    return allAnimeIds;
};

const fetchCommentsForAnime = async (animeIds) => {
    let allComments = [];

    for (let i = 0; i < animeIds.length; i++) {
        const animeId = animeIds[i];

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const response = await fetch(
                `https://api.jikan.moe/v4/anime/${animeId}/reviews?page=1`
            );

            if (!response.ok) continue;

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                const formattedReviews = data.data.slice(0, 10).map(formatReview);
                allComments = [...allComments, ...formattedReviews];
            }
        } catch (err) {
            console.error(`Ошибка для аниме ${animeId}:`, err.message);
        }
    }

    return allComments;
};

const formatReview = (review) => ({
    id: review.mal_id,
    message: review.review || '',
    owner: {
        firstName: review.user?.username || 'Аноним',
        lastName: '',
        picture: review.user?.images?.jpg?.image_url ||
            `https://i.pravatar.cc/40?u=${review.user?.username || 'anon'}`
    },
    publishDate: review.date || new Date().toISOString(),
    likes: review.votes || 0,
    scores: review.scores ? {
        overall: review.scores.overall || 0
    } : null,
    isSpoiler: review.is_spoiler || false,
    isPreliminary: review.is_preliminary || false,
    animeId: review.animeId
});

const sortCommentsByDate = (comments) => {
    return comments.sort((a, b) =>
        new Date(b.publishDate) - new Date(a.publishDate)
    );
};

// Экспортируем вспомогательные функции если нужны
export { fetchAnimeIds, fetchCommentsForAnime, formatReview, sortCommentsByDate };