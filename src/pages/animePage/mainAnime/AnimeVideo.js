import AnimeSeries from "./animePlay/AnimeSeries";
import AnimePlay from "./animePlay/AnimePlay";
import '../styles/main-anime/anime-video.css';
import { useState, useEffect } from "react";
import { getAnimeVideos, getAnimeEpisodes, getAnimeExternalLinks } from "../../../jikanClient";

const AnimeVideo = ({ anime }) => {
    const [videos, setVideos] = useState({ promo: [], episodes: [] });
    const [episodes, setEpisodes] = useState([]);
    const [streamingLinks, setStreamingLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Состояние для текущего видео/серии
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [nextEpisode, setNextEpisode] = useState(null);

    useEffect(() => {
        const fetchAnimeVideoData = async () => {
            if (!anime?.mal_id) return;

            setLoading(true);
            setError(null);

            try {
                // Загружаем видео, эпизоды и внешние ссылки параллельно
                const [videosData, episodesData, externalLinksData] = await Promise.all([
                    getAnimeVideos(anime.mal_id),
                    getAnimeEpisodes(anime.mal_id, 1),
                    getAnimeExternalLinks(anime.mal_id)
                ]);

                setVideos(videosData);
                setEpisodes(episodesData.data || []);
                setStreamingLinks(externalLinksData);

                // Устанавливаем первый эпизод как текущий (если есть эпизоды)
                if (episodesData.data && episodesData.data.length > 0) {
                    setCurrentEpisode(episodesData.data[0]);

                    // Устанавливаем следующий эпизод (если есть)
                    if (episodesData.data.length > 1) {
                        setNextEpisode(episodesData.data[1]);
                    }
                } else {
                    // Если нет эпизодов, используем промо-видео как текущее
                    if (videosData.promo && videosData.promo.length > 0) {
                        setCurrentEpisode({
                            title: videosData.promo[0].title || 'Промо-видео',
                            video_url: `https://www.youtube.com/watch?v=${videosData.promo[0].trailer?.youtube_id}`,
                            type: 'promo'
                        });
                    }
                }

            } catch (err) {
                console.error('Error loading video data:', err);
                setError('Не удалось загрузить видео данные');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeVideoData();
    }, [anime?.mal_id]);

    // Функция для смены текущей серии
    const handleEpisodeChange = (episode) => {
        setCurrentEpisode(episode);

        // Находим следующий эпизод
        const currentIndex = episodes.findIndex(ep => ep.mal_id === episode.mal_id);
        if (currentIndex !== -1 && currentIndex < episodes.length - 1) {
            setNextEpisode(episodes[currentIndex + 1]);
        } else {
            setNextEpisode(null);
        }
    };

    // Функция для перехода к следующей серии
    const handleNextEpisode = () => {
        if (nextEpisode) {
            handleEpisodeChange(nextEpisode);
        }
    };

    // Получаем видео для плеера
    const getVideoSource = () => {
        if (currentEpisode) {
            // Если у эпизода есть ссылка на видео (например, с YouTube)
            if (currentEpisode.video_url) {
                return currentEpisode.video_url;
            }

            // Ищем промо-видео для этого эпизода
            const promoVideo = videos.promo?.find(p =>
                p.title?.includes(`Episode ${currentEpisode.episode_id}`) ||
                p.title?.includes(currentEpisode.title)
            );

            if (promoVideo?.trailer?.youtube_id) {
                return `https://www.youtube.com/watch?v=${promoVideo.trailer.youtube_id}`;
            }
        }

        // Если ничего не найдено, возвращаем первое промо-видео
        if (videos.promo && videos.promo.length > 0) {
            return `https://www.youtube.com/watch?v=${videos.promo[0].trailer?.youtube_id}`;
        }

        return null;
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px'
            }}>
                <h2>Загрузка видео...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                color: 'red'
            }}>
                <h2>Ошибка: {error}</h2>
            </div>
        );
    }

    return (
        <div className="anime-video">
            <h2> Смотреть онлайн аниме «{anime.title}» </h2>

            {streamingLinks.length > 0 && (
                <div>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        {streamingLinks
                            .filter(link => link.type === 'streaming')
                            .map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                >
                                    {link.name || 'Смотреть'}
                                </a>
                            ))
                        }
                    </div>
                </div>
            )}

            <div>
                {/* Блок с плеером */}
                <div>
                    <AnimePlay
                        anime={anime}
                        episodes={episodes}
                        videoUrl={getVideoSource()}
                        currentEpisode={currentEpisode}
                        onNextEpisode={handleNextEpisode}
                        hasNextEpisode={!!nextEpisode}
                    />
                </div>

                {/* Блок с сериями */}
                <div>
                    <AnimeSeries
                        episodes={episodes}
                        currentEpisode={currentEpisode}
                        onEpisodeSelect={handleEpisodeChange}
                        nextEpisode={nextEpisode}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnimeVideo;